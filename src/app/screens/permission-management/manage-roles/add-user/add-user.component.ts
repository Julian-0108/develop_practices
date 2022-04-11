import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator, FormArray } from '@angular/forms';
import { NotificationService } from '../../../../shared/components/notification/services/notification.service';
import { ManageRolesService } from '../services/manage-roles.service';
import { AddResumeService } from '../../../profiles/profile-manage-resumes/add-resume/service/add-resume.service';
import { AddUserService } from './services/add-user.service';
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
  dataInfo = new FormControl();

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private rolesService: ManageRolesService,
    private addResumeService: AddResumeService,
    private addUserService: AddUserService,
    private dialogref: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getPersonal();
    this.form = this.createForm();
    this.filteredOptions = this.dataInfo.valueChanges.pipe(
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
      roles: ['']
    });
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option:any) => option.name.toLowerCase().includes(filterValue));
  }

// obtener personal
  async getPersonal(){
  await this.addResumeService.getDataUsers()
  .then((reg:any) => this.options = reg
  )
  }

  getValue(value?:any){
    return value?value.name:undefined;
  }

  alert(type:string,message?:string){
    switch(type){
      case 'success':
        this.notificationService.openSimpleSnackBar(
          {title: 'Usuario añadido', message: `${message}`, type: 'success'}
        );
        break;
      case 'error':
        this.notificationService.openSimpleSnackBar(
          {title: 'Usuario no añadido', message: `${message}`, type: 'error'}
        );
        break;
      case 'info':
        this.notificationService.openSimpleSnackBar(
          {title: 'Rol existente', message: 'el usuario ya posee el tipo de rol', type: 'info'}
        );
        break;
    }
  }


  async saveInfo(){
      this.form.patchValue(this.dataInfo.value);
      if(this.form.valid){
        await this.addUserService.getUser(+this.form.get('dni')?.value)
        .then((resp:any) => {
          if(resp.length > 0){
            const roles = resp[0].roles.includes(this.data.rolSelected._id)
            if(!roles){
              resp[0].roles.push(this.data.rolSelected._id);
              this.rolesService.updateUserRoles(resp[0].email,resp[0])
              .then(() => {
                this.alert('success','Rol asignado correctamente');
                this.dialogref.close(true);
              })
            }else{
              this.alert('info');
            }
          }else{
            this.form.get('roles')?.setValue([this.data.rolSelected._id]);

            this.addUserService.postUser(this.form.value).then((val:any) => {
              if(val.successful === true && val.payload !== []){
                this.alert('success',val.message);
              }else{
                this.alert('error',val.message);
              }
              this.dialogref.close(true);
            }
            )
          }
        }
        )
  }}
}
