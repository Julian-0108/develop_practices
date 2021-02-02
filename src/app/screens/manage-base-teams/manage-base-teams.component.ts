import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ManageBaseTeamsService } from './service/manage-base-teams.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-base-teams',
  templateUrl: './manage-base-teams.component.html',
  styleUrls: ['./manage-base-teams.component.scss']
})

export class ManageBaseTeamsComponent implements OnInit {

  isLoadingResults = false;
  name!: string;
  CoursesCertifications! : any;

  displayedColumns: string[] = [
    'profiles',
    'levels',
    'createdAt',
    'updatedAt',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<any> ;

  constructor(
    public dialog: MatDialog, 
    private title: Title,
    private router: ActivatedRoute,
    private manageBaseTeamsService: ManageBaseTeamsService
  ) {
    this.title.setTitle("Mundo SETI - administrar equipos base");
  }
  
  ngOnInit(): void {
    this.getBaseTeams();
  }

  getBaseTeams(){
    this.manageBaseTeamsService.getBaseTeams(this.router.snapshot.params['id'])
    .then( (response:any) => {
      this.name = response.name;
      this.dataSource = new MatTableDataSource(response.profiles);
    })
    .catch(console.log)
  }
  
  // Dialog
  openDialog(element?: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "60%",
      data: {
        element,
        idBaseTeams: this.router.snapshot.params['id'],
        title: element ? 'Editar' : 'Agregar'
      },
    }).afterClosed();

    
  }

}
