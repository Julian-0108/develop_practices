import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { Title } from '@angular/platform-browser';


export interface table {
  profileName: string;
  level: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

const ELEMENT_DATA: table[] = [
  {profileName: 'profesional en formacion' , level: 'no aplica', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: false},
  {profileName: 'consultor junior' , level: 'N1', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: true},
  {profileName: 'consultor junior' , level: 'N2', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: false},
  {profileName: 'consultor junior' , level: 'N3', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: true},
  {profileName: 'consultor especialista' , level: 'N1', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: true},
  {profileName: 'consultor especialista' , level: 'N2', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: false},
  {profileName: 'consultor especialista' , level: 'N3', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: true},
  {profileName: 'consultor senior' , level: 'N1', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: true},
  {profileName: 'consultor senior' , level: 'N2', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: false},
  {profileName: 'consultor senior' , level: 'N3', createdAt: new Date(1995,11,17), updatedAt: new Date(1995,11,17), status: true},
];

@Component({
  selector: 'app-manage-base-teams',
  templateUrl: './manage-base-teams.component.html',
  styleUrls: ['./manage-base-teams.component.scss']
})

export class ManageBaseTeamsComponent implements OnInit {

  isLoadingResults = false;

  displayedColumns: string[] = ['profiles', 'levels', 'created-at', 'updated-at', 'status', 'edit'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private title: Title) {
    this.title.setTitle("Mundo SETI - administrar equipos base");
  }
  
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
