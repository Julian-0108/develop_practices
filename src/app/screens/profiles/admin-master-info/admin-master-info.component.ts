import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterInfoService } from './services/master-info.service';
import { Master } from '@shared/interfaces/master.interface';
import { MasterInfoComponent } from './master-info/master-info.component';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Masters } from './interfaces/master-info-dialog';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-master-info',
  templateUrl: './admin-master-info.component.html',
  styleUrls: ['./admin-master-info.component.scss'],
})
export class AdminMasterInfoComponent implements OnInit {
  otherIcon!: boolean;
  open: boolean = false;
  help: string = 'help';
  idHistory!: string;
  subtitle: any = '';

  public displayedColumns: string[] = [
    'idDomain',
    'knowledgeArea',
    'specificKnowledge',
    'type',
    'name',
    'platform',
    'technology',
    'formation',
    'reference',
    'description',
    'createdAt',
    'updatedAt',
    'status',
    'submenu',
    'actions',
    
  ];

  public readonly masters: Masters[] = [
    {
      name: 'Area de Formación',
      url: 'education-area',
      sumary: 'Conjunto de conocimientos que por su afinidad conceptual, teórica y metodológica, conforman los contenidos de un plan de estudios: Ejemplo Sistemas, Comunicación, Contaduría.',
    },
    {
      name: 'Competencias corporativas y talentos',
      url: 'skills',
      sumary: 'Se refiere a los rasgos y competencias personales que caracterizan a los individuos y permiten establecer como se relacionan con los demás en  su entorno laboral y personal. ',
    },
    // {
    //   name: 'Conocimientos específicos del cargo',
    //   url: 'specific-knowledge',
    //   sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    // },
    {
      name: 'Cursos y certificaciones',
      url: 'courses-certifications',
      sumary: 'Conjunto de conocimientos académicos sobre un tema estructurado a través de un plan. Comprendido por talleres, diplomados, certificaciones, cursos, entre otros. ',
      icon: 'help',
    },
    {
      name: 'Dominio',
      url: 'domain',
      sumary: 'Representa las áreas de la tecnología y las de apoyo  sobre las cuales la organización realiza algún tipo de gestión o requiere algún conocimiento. Ejemplo: Bases de datos, Sistemas Operativos, Servidores de Aplicación, Redes, Almacenamiento, Cloud, Gestión Financiera, Gestión Administrativa',
    },
    {
      name: 'Formación académica',
      url: 'studies',
      sumary: 'Nivel académico obtenido al finalizar un proceso formativo  en una carrera tecnológica, técnica superior o profesional. ',
    },
    {
      name: 'Funciones del Cargo',
      url: 'functions',
      sumary: 'Conjunto de responsabilidades, tareas, actividades requeridas  para desempeñar un determinado cargo o rol.',
    },
    {
      name: 'Habilidades de equipo',
      url: 'base-teams-categories',
      sumary: 'Representa la estructura interna operativa y administrativa de la compañía',
    },
    {
      name: 'Herramientas de trabajo',
      url: 'work-tools',
      sumary: 'Es cualquier software o hardware que ayuda a realizar una tarea. Ejemplo: Golden Gate: Software que permite la replicación de una base de datos a otra',
    },
    {
      name: 'Módulos',
      url: 'modules',
      sumary: 'Es la agrupación de funcionalidades que componen mundo SETI.',
    },
    {
      name: 'Responsabilidades Corporativas',
      url: 'security-responsabilities',
      sumary: 'Conjunto de compromisos que deben cumplir  los integrantes de las compañía. ',
    },
    {
      name: 'Temario',
      url: 'syllabi',
      sumary: 'Representa la relación entre dominio, área de conocimiento y conocimiento específico, para facilitar el uso de estos conceptos en Mundo SETI. ',
    },
    {
      name: 'Tipos',
      url: 'types',
      sumary: 'A través de esta opción se registrará la información de las tablas maestras que incluyen campos de concepto y descripción.',
    }
  ];

  public masterSeleted: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort;
  dataSource: MatTableDataSource<Master> = new MatTableDataSource();
  result!: any;

  constructor(
    private title: Title,
    private masterInfoService: MasterInfoService,
    private dialog: MatDialog
  ) {
    this.title.setTitle('Mundo SETI - administrar maestros');
  }

  ngOnInit(): void {}

  getDataMaster() {
    this.masterInfoService.getData(this.masterSeleted).then((res: Master[]) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.subtitle = this.masters.find((el: any) => el.url === this.masterSeleted);
    });
  }

  getDisplayedColumns(): string[] {
    switch (this.masterSeleted) {
      case 'types':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'description' &&
            el !== 'submenu' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'studies':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'security-responsabilities':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'description' &&
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'education-area':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'base-teams-categories':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'domain':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'type' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'functions':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'type' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'courses-certifications':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'reference' &&
            el !== 'description'          
        );
      case 'syllabi':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'name' &&
            el !== 'reference' &&
            el !== 'type' &&
            el !== 'description' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      default:
        return this.displayedColumns.filter(
          (el) =>
            el !== 'reference' &&
            el !== 'submenu' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'&&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
    }
  }

  openDialog(element?: Master) {
    const dialogRef = this.dialog
      .open(MasterInfoComponent, {
        width: '60%',
        data: {
          element,
          title: element ? 'Editar' : 'Agregar',
          url: this.masterSeleted,
          name: this.masters.filter((el: any) => el.url === this.masterSeleted),
          masters: this.masters,
          subtitle: this.subtitle.name,
        },
      })
      .afterClosed();
    dialogRef.toPromise().then((response: any) => {
      if (response) {
        this.getDataMaster();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDirectFilter(filterValue: any) {
    this.dataSource.filter = filterValue;
  }
  setId(el: any) {
    this.idHistory = el;
  }

  isOpen() {
    this.open = true;
  }
}
