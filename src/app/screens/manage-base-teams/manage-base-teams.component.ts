import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';


export interface Perfiles {
  perfil: string;
  nivel: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  estado: boolean;
}

const ELEMENT_DATA: Perfiles[] = [
  {perfil: 'profesional en formacion' , nivel: 'no aplica', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: false},
  {perfil: 'consultor junior' , nivel: 'N1', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: true},
  {perfil: 'consultor junior' , nivel: 'N2', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: false},
  {perfil: 'consultor junior' , nivel: 'N3', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: true},
  {perfil: 'consultor especialista' , nivel: 'N1', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: true},
  {perfil: 'consultor especialista' , nivel: 'N2', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: false},
  {perfil: 'consultor especialista' , nivel: 'N3', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: true},
  {perfil: 'consultor senior' , nivel: 'N1', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: true},
  {perfil: 'consultor senior' , nivel: 'N2', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: false},
  {perfil: 'consultor senior' , nivel: 'N3', fechaCreacion: '21/12/2020', fechaActualizacion: '21/12/2021', estado: true},
];

@Component({
  selector: 'app-manage-base-teams',
  templateUrl: './manage-base-teams.component.html',
  styleUrls: ['./manage-base-teams.component.scss']
})

export class ManageBaseTeamsComponent implements OnInit {

  isLoadingResults = false;

  displayedColumns: string[] = ['perfiles', 'niveles', 'fecha-creacion', 'fecha-actualizacion', 'estado', 'editar'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {
  }
  
  
  // Dialog
  openDialog(element?: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "60%",
      data: {
        element,
        title: element ? 'Editar' : 'Agregar'
      },
    }).afterClosed();

    
  }

}
