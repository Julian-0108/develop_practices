import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator, FormArray } from '@angular/forms';
import { NotificationService } from '../../../../shared/components/notification/services/notification.service';
import { ManageRolesService } from '../services/manage-roles.service';
import { AddResumeService } from '../../../profiles/profile-manage-resumes/add-resume/service/add-resume.service';
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
    private addResumeService: AddResumeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // this.getUsers();
    this.getPersonal();
    this.form = this.createForm();
    // this.filteredOptions = this.form.controls.name.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );

    this.filteredOptions = this.form.controls.name.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['',Validators.required],
      area: ['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      dni:['',Validators.required],
      roles: new FormArray([])
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
    console.log('🚀 ~ file: add-user.component.ts ~ line 90 ~ AddUserComponent ~ _filter ~ value', value)
    const filterValue = value.toLowerCase();
    return this.options.filter((option:any) => {
      if (option.name !== undefined) {
        return option.name.indexOf(filterValue) === 0
      }
    });
  }

// obtener personal
  async getPersonal(){
  await this.addResumeService.getDataUsers()
  .then((reg:any) => this.options = reg
  )
  console.log('🚀 ~ file: add-user.component.ts ~ line 108 ~ AddUserComponent ~ getPersonal ~ this.options', this.options);
  }


  console(){
    console.log('🚀 ~ file: add-user.component.ts ~ line 39 ~ AddUserComponent ~ ngOnInit ~ this.filteredOptions', this.filteredOptions)
  }
}
