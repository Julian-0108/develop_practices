import { Component, OnInit } from '@angular/core';
import { Search } from './interfaces/manege-resumes.interface';
import { AddResumeComponent } from './add-resume/add-resume.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileManageResumesService } from './services/profile-manage-resumes.service';
import { ToolsComponent } from './dialogs/tools/tools.component';
import { AssociateGLPIComponent } from './dialogs/associate-glpi/associate-glpi.component';
import { SeeResumeComponent } from './dialogs/see-resume/see-resume.component';

@Component({
  selector: 'app-profile-manage-resumes',
  templateUrl: './profile-manage-resumes.component.html',
  styleUrls: ['./profile-manage-resumes.component.scss'],
})
export class ProfileManageResumesComponent implements OnInit {
  title = 'Gestión HV';

  public displayedColumns: string[] = [
    'name',
    'numberIdentification',
    'processStatus',
    'city',
    'minAspiration',
    'acciones'
  ];


  dataSource:Search[] = [];

  constructor(private dialog: MatDialog,private service:ProfileManageResumesService) {}

  ngOnInit(): void {
    this.getHvs();
  }


  openDialog(type:string,value?:any){
    switch(type){
      case 'Agregar':
        this.dialog.open(AddResumeComponent, {
          width: '60%',
          height: '80%'
        });
        break;
      case 'Herramientas':
        this.dialog.open(ToolsComponent, {
          width: '40%',
          height: '40%',
          data: {datakey:value}
        });
        break;
      case 'Ver':
        this.dialog.open(SeeResumeComponent, {
          width: '50%',
          height: '50%',
          data: {datakey:value}
        });
        break;
      case  'Asociar':
        this.dialog.open(AssociateGLPIComponent, {
          width: '50%',
          height: '80%',
          data: {id:value}
        });
        break;
    }
  }

  getHvs(){
    this.service.getDataHvs()
      .then(dataValue => {
        if(dataValue.length > 0){
          this.dataSource = dataValue;
        }
      }).catch(error => {
        console.log('error',error);
      })
  }
}
