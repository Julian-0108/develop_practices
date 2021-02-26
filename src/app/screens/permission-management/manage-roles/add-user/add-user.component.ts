import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { NotificationService } from '../../../../shared/components/notification/services/notification.service';
import { ManageRolesService } from '../services/manage-roles.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  form!: FormGroup;
  options: string[] = [];
  users: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private notificationService: NotificationService,
    private rolesService: ManageRolesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.form = this.createForm();
    this.filteredOptions = this.form.controls.correo.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.notificationService.openSimpleSnackBar({type: 'error', title: 'Error en el formulario', message: 'Revisa la información del formulario'});
      this.form.markAllAsTouched();
      return;
    }

    const validateEmail = this.options.some(correo => correo === this.form.get('correo')?.value);
    if (!validateEmail) {
      this.notificationService.openSimpleSnackBar({type: 'error', title: 'Error en el formulario', message: 'El correo electronico no se encuentra registrado'});
      this.form.markAllAsTouched();
      return;
    }

    const isRegistered = this.data.dataSourceUsers.some((user: any) => user.correo === this.form.get('correo')?.value);
    if (isRegistered) {
      this.notificationService.openSimpleSnackBar({type: 'error', title: 'Error en el formulario', message: 'El correo ya se encuentra registrado en el rol'});
      this.form.markAllAsTouched();
      return;
    }


    const user: any = this.users.find((user: any) => user.correo === this.form.get('correo')?.value);
    user.roles.push(this.data.rolSelected._id);

    this.rolesService.updateUserRoles(user.correo, user.roles)
    .then(() => {
      this.notificationService.openSimpleSnackBar({type: 'success', title: 'Operación exitosa', message: 'Rol agregado al usuario correctamente'});
      this.dialogRef.close({ success: true });
    })
    .catch()
  }

  getUsers() {
    this.rolesService.getUsers()
    .then(response => {
      this.options = response.payload.map((user: any) => user.correo);
      this.users = response.payload;
    })
    .catch();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => {
      if (option !== undefined) {
        return option.indexOf(filterValue) === 0
      }
    });
  }

}
