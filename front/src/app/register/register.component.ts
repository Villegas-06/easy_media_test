import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  isFormValid() {
    return this.registerForm.valid;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirm_password = formGroup.get('confirm_password')?.value;
    return password === confirm_password ? null : { passwordMismatch: true };
  }

  showSuccessAlertAndRedirect(message: string) {
    Swal.fire({
      title: 'Registro exitoso',
      text: message,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      this.router.navigate(['/login']);
    });
  }

  showErrorAlert(message: string) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {});
  }

  onSubmit() {
    const formData = this.registerForm.value;
    this.authService.register(formData).subscribe(
      (response: any) => {
        this.showSuccessAlertAndRedirect(response.message);
      },
      (error) => {
        this.showErrorAlert(error.message);
      }
    );
  }
}
