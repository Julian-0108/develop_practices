import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Search } from './interfaces/manege-resumes.interface';
import { AddResumeComponent } from './add-resume/add-resume.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileManageResumesService } from './services/profile-manage-resumes.service';

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

  openDialogAdd(){
    const dialogRef = this.dialog.open(AddResumeComponent, {
      width: '60%',
      height: '80%'
    });
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
