import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageBaseTeamsService } from './service/manage-base-teams.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@shared/components/notification/services/notification.service';

@Component({
  selector: 'app-manage-base-teams',
  templateUrl: './manage-base-teams.component.html',
  styleUrls: ['./manage-base-teams.component.scss']
})

export class ManageBaseTeamsComponent implements OnInit {

  isLoadingResults = false;
  name!: string;
  idProfiles!: string;
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
    private rout: Router,
    private manageBaseTeamsService: ManageBaseTeamsService,
    private notificationService: NotificationService
  ) {
    this.title.setTitle("Mundo SETI - gestionar equipos base");
  }
  
  ngOnInit(): void {
    this.getBaseTeams();
  }

  getBaseTeams(){
    this.manageBaseTeamsService.getBaseTeams(this.router.snapshot.params['id'])
    .then( (response:any) => {
      if (response.length === 0) {
        this.notificationService.openSimpleSnackBar({
          title: 'Vacio',
          message: 'eqipo base no encontrado',
          type: 'info'
        });
        return;
      }
        this.name = response[0].name;
        this.idProfiles = response[0]._id;
        this.dataSource = new MatTableDataSource(response[0].profiles);
    })
    .catch((error: any)=> {
      if (error.error?.statusCode !== 400) {
        this.notificationService.openSimpleSnackBar({
          title: 'Petición Incorrecta',
          message: 'Error cargando el equipo base. Vuelve a intentar',
          type: 'error'
        });
      }
    });
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
    }).afterClosed().toPromise().then(( response: any) => {
      if (response.data) {
        this.getBaseTeams();
      }
    });
  }

  redirectToProfileTemplate(){
    const url = this.rout.createUrlTree([`/profile-template/${this.idProfiles}`]);
    window.open(url.toString(), '_blank');
  }

}
