import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/screens/login/services/auth/auth.service';
import Swal from 'sweetalert2';

const TOAST = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  showCloseButton: true,

  onOpen: (Toast) => {
    Toast.addEventListener('mouseenter', Swal.stopTimer)
    Toast.addEventListener('mouseleave', Swal.resumeTimer)
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
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  get emailInput() { return this.loginFormGroup.get('username'); }
  get passwordInput() { return this.loginFormGroup.get('password'); }

  onSubmit() {
    let loginFormControls = this.loginFormGroup.controls;

    this.isLoading = true;
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      TOAST.fire({
        icon: "error",
        title: "Todos los campos son obligatorios"
      })
      this.isLoading = false;
    } else {
      this.authService.login(loginFormControls.username.value, loginFormControls.password.value).pipe(first()).subscribe(() => {
        this.router.navigate(['/home']);
        TOAST.close();
      }, (error: { error: { message: any; }; status: number; message: any; }) => {
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

