import { Component, OnInit } from '@angular/core';
import { Search } from './interfaces/manege-resumes.interface';
import { AddResumeComponent } from './add-resume/add-resume.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileManageResumesService } from './services/profile-manage-resumes.service';
import { AddResumeService } from './add-resume/service/add-resume.service';
import { ToolsComponent } from './dialogs/tools/tools.component';
import { AssociateGLPIComponent } from './dialogs/associate-glpi/associate-glpi.component';
import { SeeResumeComponent } from './dialogs/see-resume/see-resume.component';
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile-manage-resumes',
  templateUrl: './profile-manage-resumes.component.html',
  styleUrls: ['./profile-manage-resumes.component.scss'],
})
export class ProfileManageResumesComponent implements OnInit {
  title = 'Gestión HV';

  public displayedColumns: string[] = [
    'name',
    'numberIdentification',
    'processStatus',
    'city',
    'minAspiration',
    'acciones'
  ];

  cities: string[] = ['Bogotá', 'Medellín', 'Cali', 'Leticia', 'Arauca', 'Barranquilla', 'Cartagena', 'Tunja', 'Manizales', 'Florencia', 'Yopal', 'Popayán', 'Valledupar', 'Quibdó', 'Montería'];
  processStatus: string[] = ['En Proceso','Seleccionado','Descartado'];

  rangosSalarial = [
    { id: 0, apiracion_SMIN: '1000000', apiracion_SMAX: '1500000', view: '$ 1.000.000 - $ 1.500.000' },
    { id: 1, apiracion_SMIN: '2000000', apiracion_SMAX: '2500000', view: '$ 2.000.000 - $ 2.500.000' },
    { id: 2, apiracion_SMIN: '3000000', apiracion_SMAX: '3500000', view: '$ 3.000.000 - $ 3.500.000' },
    { id: 3, apiracion_SMIN: '4000000', apiracion_SMAX: '4500000', view: '$ 4.000.000 - $ 4.500.000' },
    { id: 4, apiracion_SMIN: '5000000', apiracion_SMAX: '5500000', view: '$ 5.000.000 - $ 5.500.000' },
    { id: 5, apiracion_SMIN: '6000000', apiracion_SMAX: '6500000', view: '$ 6.000.000 - $ 6.500.000' },
    { id: 6, apiracion_SMIN: '7000000', apiracion_SMAX: '7500000', view: '$ 7.000.000 - $ 7.500.000' },
    { id: 7, apiracion_SMIN: '8000000', apiracion_SMAX: '8500000', view: '$ 8.000.000 - $ 8.500.000' },
    { id: 8, apiracion_SMIN: '9000000', apiracion_SMAX: '9500000', view: '$ 9.000.000 - $ 9.500.000' }
  ]

  filterDomainArea = this.fb.group({
    domain: ['',Validators.required],
    area: [{value: '', disabled: true}, Validators.required]
  })

  idSalario = '';
  knowledge:string[] = [];
  dataSource: Search[] = [];
  dataDomain: Array<any>[] = [];
  filteredList: any = [];
  filterKeys!: { fullName: string; numberIdentification: string; processStatus: string; city: string; };

  constructor(
    private dialog: MatDialog,
    private service: ProfileManageResumesService,
    private serviceAddResume: AddResumeService,
    private searchFilter: SearchFilterPipe,
    private fb: FormBuilder,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getHvs();
    this.getDomain();
    this.filterKeys = { fullName: '', numberIdentification: '', processStatus: '', city: '' };
  }


  openDialog(type: string, value?: any) {
    switch (type) {
      case 'Agregar':
        this.dialog.open(AddResumeComponent, {
          width: '60%',
          height: '80%'
        })
        .afterClosed().toPromise().then((response: boolean) => {
          if (response) {
            this.getHvs();
          }
        });
        break;
      case 'Herramientas':
        this.dialog.open(ToolsComponent, {
          width: '40%',
          height: '40%',
          data: { datakey: value }
        });
        break;
      case 'Ver':
        this.dialog.open(SeeResumeComponent, {
          width: '80%',
          height: '80%',
          data: { datakey: value }
        });
        break;
      case 'Asociar':
        this.dialog.open(AssociateGLPIComponent, {
          width: '50%',
          height: '80%',
          data: { id: value }
        });
        break;
    }
  }

  async getHvs() {
    await this.service.getDataHvs()
      .then(dataValue => {
        if (dataValue.length > 0) {
          this.filteredList = dataValue;
          this.dataSource = this.filteredList;
        }
      }).catch(error => {
        console.log('error', error);
      })
  }

  getDomain() {
    this.serviceAddResume.getDataDomain()
      .then(domains => {
        if (domains.length > 0) {
          this.dataDomain = domains;
        }
      }).catch(error => {
        console.log('error', error);
      })
  }

  async getArea(type?:string){
    if(this.filterDomainArea.get('domain')?.valid){

      const value = this.filterDomainArea.get('domain')?.value;
      if(type === 'New'){
        this.serviceAddResume.getDataSyllabi()
          .then(area => {
            if(area.length > 0){
              this.filterDomainArea.get('area')?.enable();
              const domainName = area.filter((domain:{ domain: { name: string; }[]; }) => domain.domain[0].name === value);
              if(domainName.length !== 0){
                this.knowledge = domainName;
              }else{
                this.knowledge = [];
              }
            }
          }).catch(error =>{
            console.log('error',error);
          })
      }

      await this.getHvs();

      const fill =  this.dataSource.filter((val: any) =>
          val.knowledgeCharge.some((domain: { domain: string | string[]; }) =>
            domain.domain.includes(value)) === true)
      this.dataSource=fill;
    }else{
      this.filterDomainArea.get('area')?.reset();
      this.filterDomainArea.get('area')?.disable();
      this.knowledge = [];
      this.dataSource = this.filteredList;
    }
  }

  async addArea(areaDescription:any){
    if(this.filterDomainArea.get('area')?.valid){
      await this.getArea();
    }

    if(areaDescription === 'Ver Todo'){
      this.filterDomainArea.get('area')?.setValue(areaDescription);
    }else{
      this.filterDomainArea.get('area')?.setValue(areaDescription.knowledgeArea);
      const fill =  this.dataSource.filter((val: any) =>
      val.knowledgeCharge.some((domain: { knowledgeArea: string | string[]; description:string | string[] }) =>
        domain.knowledgeArea.includes(areaDescription.knowledgeArea) &&
        domain.description.includes(areaDescription.specificKnowledge)) === true)
      this.dataSource=fill;
    }
  }

  getInfoArea(){
    return this.filterDomainArea.get('area')?.value;
  }

  filterRegister(value:any, type:string) {
    switch (type) {
      case 'fullName':
        this.filterKeys.fullName = value;
        break;
      case 'numberIdentification':
        this.filterKeys.numberIdentification = value;
        break;
      case 'processStatus':
        this.filterKeys.processStatus = value;
        break;
      case 'city':
        this.filterKeys.city = value;
        break;
      case 'salario':
        this.idSalario = value;
        break;
    }

    this.dataSource = this.searchFilter.transform(this.filteredList, this.filterKeys);

    if (this.idSalario !== '') {
      if (this.dataSource.length > 0) {
        const Info = this.dataSource;
        this.dataSource = [];
        const rs = this.rangosSalarial[+this.idSalario];
        Info.forEach((item: any) => {
          if (item.minAspiration >= rs.apiracion_SMIN && item.minAspiration <= rs.apiracion_SMAX) {
            this.dataSource.push(item);
          }
        });
      }
    }

    if (this.dataSource.length === 0) {
      this.notificationService.openSimpleSnackBar(
        { title: 'Sin registros', message: 'No se encontraron hojas de vida con estas coincidencias', type: 'info' }
      );
    }

  }
}
