import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
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
    this.loginFormGroup = this.createForm();
    this.ifTokenExists();
    // window.localStorage.clear();
  }

  createForm(): FormGroup {
    return this.fb.group({
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ifTokenExists(): void {
    if (this._authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      this._notificationService.openSimpleSnackBar({
        title: 'Inicio de sesión',
        type: 'info',
        message: 'Todos los campos son obligatorios',
      });
      this.isLoading = false;
    } else {
      this._authService
        .login(this.loginFormGroup.value)
        .then((res) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          this.isLoading = false;
        });
    }
  }
}
