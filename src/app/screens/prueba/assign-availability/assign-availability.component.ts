import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAvailabilityComponent } from '../dialog-availability/dialog-availability.component';
import { integrante, integranteAssign } from '../interfaces/assignAvailability';

@Component({
  selector: 'app-assign-availability',
  templateUrl: './assign-availability.component.html',
  styleUrls: ['./assign-availability.component.scss'],
})
export class AssignAvailabilityComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  data: integrante[] = [
    { _id: '1', name: 'Juan', identifation: 12345, name_team: 'Desarrollo', cargo: 'Aprendiz', leader: { _id_leader: 1, leader_name:'Doncey'} },
    { _id: '2', name: 'Kevin', identifation: 12345, name_team: 'Talento humano', cargo: 'Aprendiz', leader: { _id_leader: 1, leader_name:'Doncey'} },
  ];
  displayedColumns: string[] = ['i', 'name', 'cc', 'name_team', 'cargo', 'lider', 'actions'];

  data2: integranteAssign[] = [
    { 
      _id: '1',
      name: 'Juan',
      identifation: 12345,
      name_team: 'Desarrollo',
      cargo: 'Aprendiz',
      leader: { _id_leader: 1, leader_name:'Doncey'},
      date_start: '13/07/2022',
      date_end: '14/08/2022',
      hoursD: 145,
      total_hoursD: 145,
      status: {id_status: 1, status_name: 'Disponible'},
    },
    { 
      _id: '2',
      name: 'Julian',
      identifation: 12345,
      name_team: 'Desarrollo',
      cargo: 'Aprendiz',
      leader: { _id_leader: 1, leader_name:'Doncey'},
      date_start: '13/07/2022',
      date_end: '14/08/2022',
      hoursD: 145,
      total_hoursD: 145,
      status: {id_status: 2, status_name: 'Ocupado'},
    }
  ];
  displayedColumns2: string[] = ['i','name','cc','name_team','cargo','lider','date_init','date_end','hours','state','actions'];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource2 = new MatTableDataSource(this.data2);
  }

  openDialog(id:string, update = false): void {
    let getIntegrante;
    if (!update) {
      this.data.forEach(element => {
        if (element._id === id) {
          getIntegrante = element;
        }
      });
    }else{
      this.data2.forEach(element => {
        if (element._id === id) {
          getIntegrante = element;
        }
      });
    }
    
    const dialogRef = this.dialog.open(DialogAvailabilityComponent, {
      width: '600px',
      data: { integrante: getIntegrante, update: update, integrantesAssign: update == false ? this.data2 : false},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('modal cerrada');
    });
  }

  filter(event: Event, table: boolean = false) {
    if (table) {
      const value = (event.target as HTMLInputElement).value;
      this.dataSource.filter = value.toLowerCase();
    } else {
      const value = (event.target as HTMLInputElement).value;
      this.dataSource2.filter = value.toLowerCase();
    }
  }
}
