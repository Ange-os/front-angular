import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {  // Corrige el nombre aquí
  private registerUrl = 'http://127.0.0.1:8000/api/users/';

  constructor(private http: HttpClient) {}

  register(userData: { username: string, email: string, password: string }): Observable<any> {  // Corrige el tipo de userData
    return this.http.post(this.registerUrl, userData);  // Corrige también el nombre de la variable userData
  }
}
