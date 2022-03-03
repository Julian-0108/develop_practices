import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder,Validators } from '@angular/forms';
import { AssociateGlpiService } from './service/associate-glpi.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-associate-glpi',
  templateUrl: './associate-glpi.component.html',
  styleUrls: ['./associate-glpi.component.scss']
})
export class AssociateGLPIComponent implements OnInit {

  number_cases: any;

  info_case:any = '';

  constructor(private service: AssociateGlpiService,private fb: FormBuilder,private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data:{id:string},public dialog: MatDialog) { }

  case = this.fb.group({
    number: ['',Validators.required]
  });

  send = this.fb.group({
    requisitions: new FormArray([],[Validators.required]),
    idLifeStory: [this.data.id,Validators.required]
  });

  formAddCase(data: {id:number,firstName:string,realName:string}){
    return this.fb.group({
      numbercase: [data.id],
      applicant: [data.firstName.concat(' ',data.realName)]
    })
  }


  ngOnInit() :void {
    this.getCases();
  }

  getCases(){
    this.service.getCasesGlpi()
      .then((numbers: { id:number; }[]) => {
        this.number_cases = numbers;
      }).catch((error: any) => {
        console.log('error',error);
      });
  }

  getInfoCase(){
    this.service.getInfoCasesGlpi(this.case.value.number)
    .then((info: {firstName:string; realName:string; createDate:string; endDate:string; content:string; charge:string}) => {
      this.info_case = info;
      this.notificationService.openSimpleSnackBar(
        {title: 'Caso encontrado', message: 'Número de caso Glpi encontrado', type: 'success'}
      );
    }).catch((error:any) => {
      console.log('error',error);
    });
  }

  get getCaseArray(): FormArray{
    return this.send.get('requisitions') as FormArray;
  }

  addCase(){
    if(this.case.valid){
      this.getCaseArray.push(this.formAddCase(this.info_case[0]));
      this.case.reset();
      this.info_case = '';
      console.log(this.send.value);
    }else{
      this.notificationService.openSimpleSnackBar(
        {title: 'Caso no seleccionado', message: 'Por favor seleccionar un número de caso para añadirlo', type: 'info'}
      );
    }
  }

  deleteCase(index:number){
    this.getCaseArray.removeAt(index);
    console.log(this.getCaseArray);
  }


  saveRegister(){
    console.log(this.send.value);
    if(this.send.valid){
      this.service.saveCase(this.send.value)
      .then(value => {
        this.dialog.closeAll();
        console.log(value);
        this.notificationService.openSimpleSnackBar(
          {title: 'Usuario asociado', message: 'El usuario a sido asociado correctamente', type: 'success'}
        );
      }).catch(error => console.log(error));
    }else{
      if(this.getCaseArray.value.length === 0){
        this.notificationService.openSimpleSnackBar(
          {title: 'Caso glpi no encontrado', message: 'Por favor seleccionar un caso para asociar', type: 'info'}
        );
      }else{
        this.notificationService.openSimpleSnackBar(
          {title: 'Usuario no asociado', message: 'Ocurrió un problema al asociar el usuario', type: 'info'}
        );
      }
    }
  }
}
