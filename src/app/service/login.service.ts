import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://127.0.0.1:8000/api/login/';
  private refresTokens = 'http://127.0.0.1:8000/api/token/refresh/'

  //observables para el manejo de  el estado de la autenticacion

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      tap(response => {
        this.setTokens(response.access, response.refresh)
        this.loggedIn.next(true);
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refresh = this.getRefreshToken();
    return this.http.post<LoginResponse>(this.refresTokens, { refresh }).pipe(
      tap(response => {
        this.setAccessToken(response.access);
      })
    );

  }
  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
  logout(): void {
    this.clearTokens();
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  // Obtener el token de acceso
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Establecer tokens en el almacenamiento local
  private setTokens(access: string, refresh: string): void {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  // Establecer nuevo token de acceso
  private setAccessToken(access: string): void {
    localStorage.setItem('access_token', access);
  }

  // Limpiar tokens del almacenamiento local
  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
