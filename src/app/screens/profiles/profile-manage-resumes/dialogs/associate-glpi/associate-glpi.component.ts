import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AssociateGlpiService } from './service/associate-glpi.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';

@Component({
  selector: 'app-associate-glpi',
  templateUrl: './associate-glpi.component.html',
  styleUrls: ['./associate-glpi.component.scss']
})
export class AssociateGLPIComponent implements OnInit {

  number_cases: any;

  associated_cases:any[] = [];

  info_case:any = '';

  constructor(private service: AssociateGlpiService,private fb: FormBuilder,private notificationService: NotificationService) { }

  case = this.fb.group({
    number: ['',Validators.required]
  })


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
    }).catch((error:any) => {
      console.log('error',error);
    });
  }

  addCase(){
    if(this.case.valid){
      this.associated_cases.push(this.info_case[0]);
      this.case.reset();
      this.info_case = '';
      console.log(this.associated_cases);
    }
  }

}
