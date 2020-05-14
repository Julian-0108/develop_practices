import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
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

   value = '';
   loading: boolean = false;
   submitted = false;
   returnUrl: string = '';

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService,
      // public loading: boolean,
      // public submitted: boolean = false,
      // public returnUrl: string = '',
      // public value: string = ''

   ) { }

   form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   });

   ngOnInit() {

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/projects';

   }

   // convenience getter for easy access to form fields
   get f() {
      return this.form.controls
   };

   onSubmit() {
      this.loading = true;
      this.submitted = true;
      if (this.form.invalid) {
         TOAST.fire({
            icon: "error",
            title: "Todos los campos son obligatorios"
         })
         this.loading = false;
      } else {
         this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
            this.router.navigate([this.returnUrl]);
            TOAST.close();
         }, error => {
            if (error.error instanceof ErrorEvent) {
               TOAST.fire({
                  icon: 'error',
                  title: `error: ${error.error.message}`
               });
               this.loading = false;
            } else {
               if (error.status == 401 || 400) {
                  TOAST.fire({
                     icon: 'error',
                     title: "Credenciales inválidas"
                  });
                  this.loading = false;
               } else {
                  TOAST.fire({
                     icon: 'error',
                     title: `Error Code: ${error.status},\nMessage: ${error.message}`
                  });
                  this.loading = false;
               }
            }
         });
      }
   }

}

