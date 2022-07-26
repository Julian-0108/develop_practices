import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';
import { ManageBaseTeamsService } from './service/manage-base-teams.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';

@Component({
  selector: 'app-manage-base-teams',
  templateUrl: './manage-base-teams.component.html',
  styleUrls: ['./manage-base-teams.component.scss'],
})
export class ManageBaseTeamsComponent implements OnInit {
  name!: string;
  CoursesCertifications!: any;
  idHistory!: string;

  displayedColumns: string[] = [
    'profiles',
    'levels',
    'createdAt',
    'updatedAt',
    'status',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  dataSource2: any[] = [];
  filterObject: any = {};

  constructor(
    public dialog: MatDialog,
    private title: Title,
    private routerParams: ActivatedRoute,
    private router: Router,
    private manageBaseTeamsService: ManageBaseTeamsService,
    private notificationService: NotificationService,
    private filterpipe: SearchFilterPipe
  ) {
    this.title.setTitle('Mundo SETI - gestionar equipos base');
  }

  ngOnInit(): void {
    this.getBaseTeams();
  }

  setIdHistory(el: any) {
    this.idHistory = el;
  }
  getBaseTeams() {
    this.manageBaseTeamsService
      .getBaseTeams(this.routerParams.snapshot.params['id'])
      .then((response: any) => {
        if (response.length === 0) {
          this.notificationService.openSimpleSnackBar({
            title: 'Vacio',
            message: 'eqipo base no encontrado',
            type: 'info',
          });
          return;
        }
        this.name = response[0].name;
        this.dataSource = new MatTableDataSource(this.sort(response[0].profiles));
        this.dataSource2 = response[0].profiles;
      })
      .catch((error: any) => {
        if (error.error?.statusCode !== 400) {
          this.notificationService.openSimpleSnackBar({
            title: 'Petición Incorrecta',
            message: 'Error cargando el equipo base. Vuelve a intentar',
            type: 'error',
          });
        }
      });
  }

  // Dialog
  openDialog(element?: any) {
    this.dialog
      .open(DialogComponent, {
        width: '60%',
        data: {
          element,
          idBaseTeams: this.routerParams.snapshot.params['id'],
          title: element ? 'Editar' : 'Agregar',
          profiles: this.dataSource.data,
        },
      })
      .afterClosed()
      .toPromise()
      .then((response: any) => {
        if (response) {
          this.getBaseTeams();
        }
      });
  }

  async redirect(id: string) {
    //const url = this.rout.createUrlTree([`/profile-template/${id}`]);
    //window.open(url.toString(), '_blank');
   this.router.navigate([`/profile-template/${id}`]);
  }

  sort(value: any[]) {
    return value.sort((a, b): any => {
      let x = a.charge.toLowerCase();
      let y = b.charge.toLowerCase();
      if (x < y) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  applyFilter(value: any, type: string) {
    this.filterObject[type] = value;
    this.dataSource.data = this.filterpipe.transform(this.dataSource2, this.filterObject);
  }

  applyDirectFilter(e: any) {
    this.dataSource.filter = e.value;
  }
}
