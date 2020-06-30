import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/screens/login/services/auth/auth.service';
import Swal from 'sweetalert2';
 
const TOAST = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  showCloseButton: true,
  onOpen: (TOAST) => {
    TOAST.addEventListener('mouseenter', Swal.stopTimer)
    TOAST.addEventListener('mouseleave', Swal.resumeTimer)
  }
});
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  hide = true;
  isLoading: boolean = false;
  submitted = false;
  returnUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let loginFormControls = this.loginFormGroup.controls;

    this.isLoading = true;
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      TOAST.fire({
        icon: "info",
        title: "Todos los campos son obligatorios"
      })
      this.isLoading = false;
    } else {
      this._authService.login(
        loginFormControls.username.value,
        loginFormControls.password.value
      ).subscribe(() => {
        this.router.navigate(['/home']);
        TOAST.close();
      }, (error) => {
        if (error.error instanceof ErrorEvent) {
          TOAST.fire({
            icon: 'error',
            title: `error: ${error.error.message}`
          });
          this.isLoading = false;
        } else {
          if (error.status == 401 || 400) {
            TOAST.fire({
              icon: 'error',
              title: "Credenciales inválidas"
            });
            this.isLoading = false;
          } else {
            TOAST.fire({
              icon: 'error',
              title: `Error Code: ${error.status},\nMessage: ${error.message}`
            });
            this.isLoading = false;
          }
        }
      });
    }
  }

}

