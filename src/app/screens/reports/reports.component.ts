import { Component, OnInit } from '@angular/core';
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';
import { ReportsService } from './reports.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  /*public listOptions = [
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
      name: 'Idiomas',
      type: 'Languages',
      sumary: 'Aquí puedes consultar el reporte de los idiomas'
    }
  ];*/
  public listOptions = [
    {
      name: 'Plataformas',
      type: 'Platforms',
      sumary: 'Aquí puedes consultar el reporte de las plataformas'
    },
    {
      name: 'Herramientas/Opciones',
      type: 'ToolsOptions',
      sumary: 'Aquí puedes consultar el reporte de las herramientas u opciones'
    }
  ];
  subtitle: string = '';
  type: string = '';
  dataSource!: MatTableDataSource<any[]>;
  displayedColumnsHobbies: any[] = ['name', 'dni','mail', 'boss', 'others', 'arts', 'cinemaTheater', 'readingWriting', 'sports', 'music'];
  displayedColumnsFamilyNucleus: any[] = ['name', 'dni', 'mail', 'boss', 'fullName', 'gender', 'kinship'];
  displayedColumnsEmergencyContact: any[] = ['name', 'dni', 'mail', 'boss', 'fullName', 'kinship', 'contactNumber'];
  displayedColumnsPets: any[] = ['name', 'dni', 'mail', 'boss', 'namePet', 'type'];
  displayedColumnsOptionalsTools:any[]=['name','dni','charge','mail','area','boss','domain','technology','nameToolOption','versions','knowledgeLevel','experience'];
  displayedColumnsPlatforms:any[]=['name','dni','charge','mail','area','boss','domain','technology','versions'];
  displayedColumnsMethodologies:any[]=['name','dni','charge','mail','boss','type','nameMethodologies','versions','knowledgeLevel','experience'];
  displayedColumnsSpecificKnowledge:any[]=['name','dni','charge','mail','boss','domain','knowledgeArea','specificKnowledges','knowledgeLevel','experience'];
  displayedColumnsTitle:any[]=['name','dni','charge','mail','boss','academicEducation','educationArea','obtainedTitle'];
  displayedColumnsCourses:any[]=['name','dni','charge','mail','boss','domain','technology','nameCourse','version','year'];
  displayedColumnsCertifications:any[]=['name','dni','charge','mail','boss','domain','technology','nameCertification','version','year'];
  displayedColumnsProfessionalCard:any[]=['name','dni','charge','mail','boss','professionalCard','professionalCardNumber'];
  displayedColumnsLanguages:any[]=['name','dni','mail','boss','language','writing','reading','speaking'];
  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
  }

  getList(data: any) {
    this.subtitle = data.name;
    this.type = data.type;
    this.reportsService.loadReport(this.type).then((data:any)=>{
      this.dataSource = new MatTableDataSource(data);
    });
  }

  getName(type:string){
    const date = new Date();
        const format = {
            dd: date.getDate(),
            mm: date.getMonth() + 1,
            yyyy: date.getFullYear()
        }
        return (`${type}_${format.dd}-${format.mm}-${format.yyyy}`)
  }
}
