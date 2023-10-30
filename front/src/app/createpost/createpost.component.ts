import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css'],
})
export class CreatepostComponent {
  createPostForm: FormGroup;
  userInfo: any;
  currentDateTime: string;
  user: string;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.currentDateTime = format(new Date(), 'h:mm a dd/MM/yy');

    this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');

    this.user = this.userInfo.username;
    this.userId = this.userInfo.id;

    this.createPostForm = this.formBuilder.group({
      userId: this.userId,
      postTitle: ['', [Validators.required]],
      postMessage: ['', [Validators.required]],
      datetime: new Date(),
      username: this.user,
    });
  }

  isFormValid() {
    return this.createPostForm.valid;
  }

  showSuccesAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: true,
      confirmButtonColor:
        'linear-gradient(270deg, #C645A9 17.66%, #58BBDB 89.57%)',
      confirmButtonText: 'Ok',
      iconColor: 'lightblue',
    });
  }

  showErrorAlert(message: string) {
    Swal.fire({
      title: message,
      icon: 'error',
      confirmButtonColor:
        'linear-gradient(270deg, #C645A9 17.66%, #58BBDB 89.57%)',
      confirmButtonText: 'Ok',
      showConfirmButton: false,
      iconColor: 'lighred',
    });
  }

  onSubmit() {
    const formData = this.createPostForm.value;
    this.authService.create_post(formData).subscribe(
      (response: any) => {
        this.showSuccesAlert(response.message);
      },
      (error) => {
        this.showErrorAlert(error.message);
      }
    );
  }
}
