import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../service/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-in',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})

export class SingInComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private authservice: LoginService, private router: Router){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  onSubmit(): void {
    if(this.loginForm.valid){
      this.authservice.login({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }).subscribe({
        next: () => {
          this.router.navigate(['/home'])
        },
        error: err => {
          if (err.status === 400 && err.error) {
            // Mostrar mensaje de error específico si existe
            this.errorMessage = err.error.non_field_errors || 'Credenciales incorrectas. Por favor, intenta de nuevo.';
          } else {
            this.errorMessage = 'Error en la conexión. Por favor, inténtalo de nuevo más tarde.';
          }
          console.error('Error en el login:', err);
        }
      });
    }
  }

}
