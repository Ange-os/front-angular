import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { LoginService } from "../service/login.service";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutoGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        if(!isLoggedIn){
          this.router.navigate(['/login'])
        }
      })
    )
  }
}
