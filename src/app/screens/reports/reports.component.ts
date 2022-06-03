import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  public listOptions = [
    {
      name: 'Hobbies',
      type: 'Hobbies',
      sumary: 'Aquí puedes consultar el reporte de los hobbies'
    },
    {
      name: 'Núcleo Familiar',
      type: 'FamilyNucleus',
      sumary: 'Aquí puedes consultar el reporte del núcleo familiar'
    },
    {
      name: 'Mascotas',
      type: 'Pets',
      sumary: 'Aquí puedes consultar el reporte de las mascotas'
    },
    {
      name: 'Contactos de Emergencia',
      type: 'EmergencyContact',
      sumary: 'Aquí puedes consultar el reporte de los contactos de emergencia'
    },
    {
      name: 'Titulos',
      type: 'Title',
      sumary: 'Aquí puedes consultar el reporte de los titulos'
    },
    {
      name: 'Cursos',
      type: 'Courses',
      sumary: 'Aquí puedes consultar el reporte de los cursos'
    },
    {
      name: 'Certificaciones',
      type: 'Certifications',
      sumary: 'Aquí puedes consultar el reporte de las certificaciones'
    }
    , {
      name: 'Tarjetas Profesionales',
      type: 'ProfessionalCard',
      sumary: 'Aquí puedes consultar el reporte de las tarjetas profesionales'
    },
    {
      name: 'Plataformas',
      type: 'Platforms',
      sumary: 'Aquí puedes consultar el reporte de las plataformas'
    },
    {
      name: 'Herramientas/Opciones',
      type: 'ToolsOptions',
      sumary: 'Aquí puedes consultar el reporte de las herramientas u opciones'
    },
    {
      name: 'Metodologías',
      type: 'Methodologies',
      sumary: 'Aquí puedes consultar el reporte de las metodologías'
    },
    {
      name: 'Conocimientos Específicos',
      type: 'SpecificKnowledge',
      sumary: 'Aquí puedes consultar el reporte de los conocimientos específicos'
    },
    {
      name: 'Idiomas',
      type: 'Languages',
      sumary: 'Aquí puedes consultar el reporte de los idiomas'
    }
  ];
  subtitle: string = '';
  type: string = '';
  dataSource: any[] = [];
  displayedColumnsHobbies: any[] = ['name', 'dni', 'boss', 'others', 'arts', 'cinemaTheater', 'readingWriting', 'sports', 'music']
  displayedColumnsFamilyNucleus: any[] = ['name', 'dni', 'boss', 'fullName', 'gender', 'kinship']
  data: any[] = [
    [{
      name: 'juan', dni: '1026666666', boss: 'no tengo jefe', others: '--', arts: 'x',
      cinemaTheater: '--', readingWriting: 'x', sports: 'x', music: '--'
    }],
    [{
      name: 'juan', dni: '1026666666', boss: 'no tengo jefe', fullName: 'Julio Julian Arango Rodriguez', gender: 'Masculino', kinship: 'Padre'
    }]
  ]

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
  }

  getList(data: any) {
    this.subtitle = data.name;
    this.type = data.type;
    if (this.type == "Hobbies") {
      this.dataSource = this.data[0];
    } else if (this.type == "FamilyNucleus") {
      this.dataSource = this.data[1];
    }
    this.reportsService.loadReport(this.type);
  }

  filterData(value: string, key: string) {

  }
}
