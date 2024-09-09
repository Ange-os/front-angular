import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../service/register.service';  // Corrige el nombre aquí

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']  // Corrige styleUrl a styleUrls
})
export class SingUpComponent {
  registerForm: FormGroup;

  constructor(private registerService: RegisterService) {  // Corrige el nombre aquí
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.registerForm.reset()
        },
        error => {
          console.error('Error en el registro:', error);
        }
      );
    }
  }
}
