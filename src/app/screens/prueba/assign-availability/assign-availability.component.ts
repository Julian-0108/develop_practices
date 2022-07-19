import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAvailabilityComponent } from '../dialog-availability/dialog-availability.component';

@Component({
  selector: 'app-assign-availability',
  templateUrl: './assign-availability.component.html',
  styleUrls: ['./assign-availability.component.scss']
})
export class AssignAvailabilityComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  data: any = [
    {name: 'Juan', cc: 12345, name_team: 'Desarrollo', cargo: 'Aprendiz', lider: 'Doncey'},
    {name: 'Kevin', cc: 12345, name_team: 'Talento humano', cargo: 'Aprendiz', lider: 'Doncey'}
  ];
  displayedColumns: string[] = ['i', 'name', 'cc', 'name_team', 'cargo', 'lider', 'actions'];

  data2: any = [
    {name: 'Juan', cc: 12345, name_team: 'Desarrollo', cargo: 'Aprendiz', lider: 'Doncey', date_init: '13/07/2022', date_end: '14/08/2022', hours: 145, state: 'disponible'},
    {name: 'Kevin', cc: 12345, name_team: 'Talento humano', cargo: 'Aprendiz', lider: 'Doncey', date_init: '13/07/2022', date_end: '14/08/2022', hours: 145, state: 'ocupado'}
  ];
  displayedColumns2: string[] = ['i', 'name', 'cc', 'name_team', 'cargo', 'lider', 'date_init', 'date_end', 'hours', 'state', 'actions'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource2 = new MatTableDataSource(this.data2);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAvailabilityComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('modal cerrada');
    });
  }

  filter(event:Event, table:boolean = false){
    if (table) {
      const value = (event.target as HTMLInputElement).value;
      this.dataSource.filter = value.toLowerCase();
    } else {
      const value = (event.target as HTMLInputElement).value;
      this.dataSource2.filter = value.toLowerCase();
    }
  }

}
