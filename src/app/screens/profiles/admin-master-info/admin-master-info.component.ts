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
    'star',
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
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Competencias corporativas y talentos',
      url: 'skills',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    // {
    //   name: 'Conocimientos específicos del cargo',
    //   url: 'specific-knowledge',
    //   sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    // },
    {
      name: 'Cursos y certificaciones',
      url: 'courses-certifications',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
      icon: 'help',
    },
    {
      name: 'Dominio',
      url: 'domain',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Formación académica',
      url: 'studies',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Funciones del Cargo',
      url: 'functions',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Habilidades de equipo',
      url: 'base-teams-categories',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Herramientas de trabajo',
      url: 'work-tools',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Módulos',
      url: 'modules',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Responsabilidades Corporativas',
      url: 'security-responsabilities',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Temario',
      url: 'syllabi',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
    },
    {
      name: 'Tipos',
      url: 'types',
      sumary: 'Lorem Ipsum is simply dummy text of the printing ',
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
      console.log(res);
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
    console.log(this.dataSource);
  }

  applyDirectFilter(filterValue: any) {
    this.dataSource.filter = filterValue;
  }
  setId(el: any) {
    console.log(el);
    this.idHistory = el;
  }

  isOpen() {
    this.open = true;
  }
}
