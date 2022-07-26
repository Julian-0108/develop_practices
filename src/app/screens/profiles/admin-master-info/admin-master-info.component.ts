import { NotificationService } from '@app/shared/components/notification/services/notification.service';
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
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';



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
    'idTechnology',
    'version',
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
      sumary:
        'Conjunto de conocimientos que por su afinidad conceptual, teórica y metodológica, conforman los contenidos de un plan de estudios: Ejemplo Sistemas, Comunicación, Contaduría.',
      haveTypeField: false,
    },
    {
      name: 'Competencias corporativas y talentos',
      url: 'skills',
      sumary:
        'Se refiere a los rasgos y competencias personales que caracterizan a los individuos y permiten establecer como se relacionan con los demás en  su entorno laboral y personal.',
      haveTypeField: true,
    },
    {
      name: 'Cursos y certificaciones',
      url: 'courses-certifications',
      sumary:
        'Conjunto de conocimientos académicos sobre un tema estructurado a través de un plan. Comprendido por talleres, diplomados, certificaciones, cursos, entre otros. ',
      icon: 'help',
      haveTypeField: true,
    },
    {
      name: 'Dominio',
      url: 'domain',
      sumary:
        'Representa las áreas de la tecnología y las de apoyo  sobre las cuales la organización realiza algún tipo de gestión o requiere algún conocimiento. Ejemplo: Bases de datos, Sistemas Operativos, Servidores de Aplicación, Redes, Almacenamiento, Cloud, Gestión Financiera, Gestión Administrativa.',
      haveTypeField: false,
    },
    {
      name: 'Formación académica',
      url: 'studies',
      sumary:
        'Nivel académico obtenido al finalizar un proceso formativo  en una carrera tecnológica, técnica superior o profesional.',
      haveTypeField: false,
    },
    {
      name: 'Funciones del Cargo',
      url: 'functions',
      sumary:
        'Conjunto de responsabilidades, tareas, actividades requeridas  para desempeñar un determinado cargo o rol.',
      haveTypeField: false,
    },
    {
      name: 'Habilidades de equipo',
      url: 'base-teams-categories',
      sumary: 'Representa la estructura interna operativa y administrativa de la compañía. ',
      haveTypeField: true,
    },

    {
      name: 'Módulos',
      url: 'modules',
      sumary: 'Es la agrupación de funcionalidades que componen mundo SETI.',
      haveTypeField: true,
    },
    {
      name: 'Responsabilidades Corporativas',
      url: 'security-responsabilities',
      sumary: 'Conjunto de compromisos que deben cumplir  los integrantes de las compañía. ',
    },
    {
      name: 'Temario',
      url: 'syllabi',
      sumary:
        'Representa la relación entre dominio, área de conocimiento y conocimiento específico, para facilitar el uso de estos conceptos en Mundo SETI.',
      haveTypeField: true,
    },
    {
      name: 'Tipos',
      url: 'types',
      sumary:
        'A través de esta opción se registrará la información de las tablas maestras que incluyen campos de concepto y descripción.',
      haveTypeField: false,
    },
    {
      name: 'Fotos Carousel',
      url: 'member-carousel',
      sumary:
        'Fotos para reflejar en el carousel de mundo seti integrante.',
      haveTypeField: true,
    },
    {
      name: 'Competencias Corporativas',
      url: 'corporate-competencies',
      sumary:
        'conjunto de conocimientos, habilidades, actitudes y destrezas.',
      haveTypeField: true,
    },
    {
      name: 'Metodologías',
      url: 'methodology',
      sumary:
        'este es el maestro metodologíasc.',
      haveTypeField: true,
    },
    {
      name: 'Tecnologia',
      url: 'technology',
      sumary:
        'Esta es la tecnologia',
      haveTypeField: true,
    },
    {
      name: 'Herramientas/Opciones',
      url: 'optional-tools',
      sumary:
        'Esta son las herramientas y opciones',
      haveTypeField: true,
    },
    {
      name: 'Centros de Estudios',
      url: 'study-center',
      sumary:
        'Listado de los centros de estudio',
      haveTypeField: true,
    },


  ];

  public masterSeleted: string = '';
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort;
  dataSource: MatTableDataSource<Master> = new MatTableDataSource();
  dataSource2: any[] = [];
  filterobject: any = {};
  result!: any;
  types: any[] = [];
  platform: any[] = [];
  domainList: any[] = [];
  technologyList: any[] = [];
  areaList: any[] = [];
  pruebaData: any[] = [{ name: "nombre 1", createdAt: new Date(), updatedAt: new Date(), status: true, imagePath: "ruta//jpg1" }, { name: "nombre 2", createdAt: new Date(), updatedAt: new Date(new Date().setDate(24)), status: false, imagePath: "ruta//jpg2" }]
  knowledgeAreaList: any[] = [];
  formationList = [{ name: 'Básica' }, { name: 'Específica' }];

  public coursesAndCertificationsColumns: string[] = [
    'domain',
    'name',
    'type',
    'required',
    'optional',
  ];

  constructor(
    private title: Title,
    private masterInfoService: MasterInfoService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private filterpipe: SearchFilterPipe
  ) {
    this.title.setTitle('Mundo SETI - administrar maestros');
  }

  ngOnInit(): void { }

  getDataMaster() {
    this.dataSource.filter = '';
    if (this.masterSeleted == "prueba") {
      this.dataSource.data = this.pruebaData;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.subtitle = this.masters.find((el: any) => el.url === this.masterSeleted);
      this.fillTypeList();
      this.fillDomainList();
      this.fillTechnologyList();
      this.fillAreaList();
    } else {
      this.masterInfoService.getData(this.masterSeleted).then((res: Master[] | any) => {
        res.forEach((element: Master) => {
          if (element.technology) {
            return (element.technology[0].technology);
          }
          if (element.domain) {
            return (element.nameDomain = element.domain[0].name);
          }
        });
        this.dataSource.data = res;
        this.dataSource2 = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.subtitle = this.masters.find((el: any) => el.url === this.masterSeleted);
        this.fillTypeList();
        this.fillDomainList();
        this.fillTechnologyList();
        this.fillAreaList();
      });
    }
  }

  getDisplayedColumns(): string[] {
    switch (this.masterSeleted) {
      case 'types':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'idTechnology' &&
            el !== 'version' &&
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
            el !== 'idTechnology' &&
            el !== 'version' &&
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
            el !== 'idTechnology' &&
            el !== 'version' &&
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
            el !== 'idTechnology' &&
            el !== 'version' &&
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
            el !== 'idTechnology' &&
            el !== 'version' &&
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
            el !== 'idTechnology' &&
            el !== 'version' &&
            el !== 'reference' &&
            el !== 'type' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'skills':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'version' &&
            el !== 'idTechnology' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation' &&
            el !== 'reference' &&
            el !== 'submenu'
        );
      case 'modules':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'version' &&
            el !== 'idTechnology' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation' &&
            el !== 'reference' &&
            el !== 'submenu'
        );
      case 'work-tools':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'version' &&
            el !== 'idTechnology' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation' &&
            el !== 'reference' &&
            el !== 'submenu'
        );
      case 'functions':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'idTechnology' &&
            el !== 'version' &&
            el !== 'reference' &&
            el !== 'type' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'optional-tools':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'reference' &&
            el !== 'submenu' &&
            el !== 'technology' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'formation' &&
            el !== 'description' &&
            el !== 'master'
        );
      case 'member-carousel':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'reference' &&
            el !== 'idTechnology' &&
            el !== 'version' &&
            el !== 'submenu' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation' &&
            el !== 'description' &&
            el !== 'type' &&
            el !== 'master'
        );
      case 'methodologies':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'reference' &&
            el !== 'idTechnology' &&
            el !== 'submenu' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'corporate-competencies':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'reference' &&
            el !== 'idTechnology' &&
            el !== 'version' &&
            el !== 'submenu' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
      case 'technology':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'reference' &&
            el !== 'idTechnology' &&
            el !== 'submenu' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'type' &&
            el !== 'formation' &&
            el !== 'description' &&
            el !== 'name'
        );
      case 'study-center':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'idTechnology' &&
            el !== 'version' &&
            el !== 'reference' &&
            el !== 'type' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation' &&
            el !== 'description'
        );
      case 'courses-certifications':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'technology' &&
            el !== 'reference' &&
            el !== 'specificKnowledge' &&
            el !== 'description' &&
            el !== 'platform'

        );
      case 'syllabi':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'submenu' &&
            el !== 'idTechnology' &&
            el !== 'version' &&
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
            el !== 'idTechnology' &&
            el !== 'submenu' &&
            el !== 'idDomain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'platform' &&
            el !== 'technology' &&
            el !== 'formation'
        );
    }
  }

  fillDomainList() {
    this.masterInfoService.getAllDomains().then((resp: any) => {
      this.domainList = resp;
    });
  }
  fillTechnologyList() {
    this.masterInfoService.getAllTechnologies().then((resp: any) => {

      this.technologyList = resp;
    });
  }

  fillAreaList() {
    this.masterInfoService.getSyllabi().then((res: any) => {
      const allAreaKnowledgeWithOutDuplicates = res.knowledgeArea.filter(
        (obj: any, index: number, arraySource: any[]) =>
          arraySource.findIndex((element: any) => element === obj) === index
      );
      this.knowledgeAreaList = allAreaKnowledgeWithOutDuplicates;
    });
  }

  fillTypeList() {
    let masterName = this.masters.filter((el) => el.url === this.masterSeleted);
    if (this.masterSeleted === 'base-teams-categories') {
      this.types = [{ name: 'Habilidad' }, { name: 'Subgrupo' }];

      return;
    }

    if (this.masterSeleted === 'courses-certifications') {
      this.types = [{ name: 'Curso' }, { name: 'Certificación' }];
      this.masterInfoService.getTypes(masterName, true).then((response: any) => {
        this.platform = response;
      });

      return;
    }

    this.masterInfoService

      .getTypes(masterName, true)

      .then((response: any) => {
        this.types = response;
      })

      .catch((err) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Ha ocurrido un error',

          message: err.message,

          type: 'error',
        });
      });
  }

  filterinfo(value: any, type: any) {
    if (type == 'domain.name') {
      const arraySource: any = []
      this.dataSource2.forEach((valuecompare: any) => {
        if (valuecompare.domain[0].name.includes(value)) {
          arraySource.push(valuecompare);
        }
      });
      this.dataSource.data = arraySource;
    } else if (type == 'technology.technology') {
        const arraySource: any = []
        this.dataSource2.forEach((valuecompare: any) => {
        if (valuecompare.technology[0].technology.includes(value)) {
          arraySource.push(valuecompare);
        }
      });
      this.dataSource.data = arraySource;
    }
    else {
      this.filterobject[type] = value;
      this.dataSource.data = this.filterpipe.transform(this.dataSource2, this.filterobject);
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
