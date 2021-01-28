import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/screens/login/services/auth/auth.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup!: FormGroup;

  hide = true;
  isLoading: boolean = false;
  submitted = false;
  returnUrl: string = '';

  subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _notificationService: NotificationService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.ifTokenExists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Temporary fix when there's an existing token
  ifTokenExists() {
    if ('authData' in localStorage) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    let loginFormControls = this.loginFormGroup.controls;

    this.isLoading = true;
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      this._notificationService.openSimpleSnackBar({ title: 'Inicio de sesión', type: 'info', message: 'Todos los campos son obligatorios' });
      this.isLoading = false;
    } else {
      this.subscription = this._authService
        .login(loginFormControls.username.value, loginFormControls.password.value)
        .subscribe(
          () => {
            this.router.navigate(['/home']);
          },
          (error) => {
            if (error.error instanceof ErrorEvent) {
              this._notificationService.openSimpleSnackBar({ title: 'Inicio de sesión', type: 'error', message: error.error.message });
              this.isLoading = false;
            } else {
              if (error.status == 401 || 400) {
                this._notificationService.openSimpleSnackBar({ title: 'Inicio de sesión', type: 'error', message: 'Credenciales inválidas' });
                this.isLoading = false;
              }
            }
          }
        );
    }
  }
}
