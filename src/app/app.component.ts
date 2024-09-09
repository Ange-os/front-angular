import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HaderNavLogoComponent } from "./hader-nav-logo/hader-nav-logo.component";
import { HomeComponent } from './home/home.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HaderNavLogoComponent,
    HomeComponent,
    SingInComponent,
    SingUpComponent,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrige styleUrl a styleUrls
})
export class AppComponent {
}
