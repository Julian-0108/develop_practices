import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AddResumeService } from './service/add-resume.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';
// import { Type } from '../../admin-master-info/master-info/interfaces.interface';
import {Observable} from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogExistRegisterComponent } from './dialog-exist-register/dialog-exist-register.component';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  update=false;
  id_registro:any;

  Languagesdata: string[] = ['Inglés', 'Francés', 'Chino', 'MandarÍn', 'Portugués'];
  typeIdentificationdata: string[] = ['Cedula de Ciudadania', 'Cedula de extranjeria', 'tarjeta de identidad'];
  knowledge:string[] = [];
  phoneType: string[] = ['Móvil', 'Casa', 'Oficina'];
  phonePrefix: string[] = ['+57', '+51', '+56'];
  source: string[] = ['Correo','Linkedin','Computrabajo','Empleo.com','Ticjob'];
  cities: string[] = ['Bogotá','Medellín','Cali','Leticia','Arauca','Barranquilla','Cartagena','Tunja','Manizales','Florencia','Yopal','Popayán','Valledupar','Quibdó','Montería'];
  nivelesIdioma: string[] = ['Alto','Medio','Bajo'];
  // Propiedades listadas desde servicio
  domain: any = {};
  Study: any = {};
  referred:any = {};
  descriptionStudy: any[] = [];

  registerLanguague:string[] = [];
  registerSkills:string[] = [];

  // Columna tabla
  displayedColumns: string[] = ['type', 'name', 'actions'];
  displayedColumnsJob: string[] = ['company', 'charge', 'wage', 'timeStart','timeEnd', 'actions'];


  filteredOptions: Observable<string[]> | undefined;

  constructor(
    private fb: FormBuilder,
    private addResumeService: AddResumeService,
    private notificationService: NotificationService,
    public dialogo: MatDialog) {
      this.filteredOptions = this.addResumeForm.controls.nameReferred.valueChanges
      .pipe(
        startWith(''),
        map((ref: string) => ref ? this.filterRefered(ref) : this.referred.slice())
      );
     }

  addResumeForm = this.fb.group({
    maxAspiration: ['', Validators.required],
    minAspiration: ['', Validators.required],
    observations: [''],
    processStatus: 'En proceso',
    source: ['', Validators.required],
    referred: [false],
    nameReferred: [''],
    professionalCard: ['No', Validators.required],
    email: ['', Validators.email],
    city: ['', Validators.required],
    country: ['', Validators.required],
    numberIdentification: ['', Validators.required],
    typeIdentification: ['', Validators.required],
    fullName: ['',Validators.required],
    phone: new FormArray([]),
    skills: new FormArray([]),
    levelStudy: new FormArray([]),
    languages: new FormArray([]),
    workExperience: new FormArray([])
  });

  formExperience = this.fb.group({
    company: ['',Validators.required],
    charge: ['',Validators.required],
    wage: ['',Validators.required],
    timeStart: ['',Validators.required],
    timeEnd: ['',Validators.required]
  });

  phones = this.fb.group({
    type: ['',Validators.required],
    prefix: ['',Validators.required],
    number: ['',Validators.required]
  });

  nevelStudy = this.fb.group({
    type: ['',Validators.required],
    name: ['',Validators.required]
  });

  ngOnInit(): void {
    this.getDataStudies();
    this.getDataDomain();
    this.getDataReferred();
    this.getEducationArea();
  }

  filterRefered(name: string) {
    return this.referred.filter((ref: { name: string; }) =>
      ref.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  // Creacion item

  createItemCompanyFrom() {
    return this.fb.group({
      name: ['', Validators.required],
      charge: ['', Validators.required],
      salary: ['', Validators.required],
      timeWorked: ['', Validators.required]
    })
  }

  createItemSkills(value: {domain:string, knowledgeArea:string, description:string}) {
    return this.fb.group({
      domain: [{value: value.domain, disabled : true}],
      knowledgeArea: [value.knowledgeArea, Validators.required],
      description: [value.description, Validators.required]
    })
  }

  createItemLanguages(value: {name:string, writing:string, reading:string, speaking:string}) {
    return this.fb.group({
      name: [{value: value.name, disabled : true}],
      writing: [value.writing, Validators.required],
      reading: [value.reading, Validators.required],
      speaking: [value.speaking, Validators.required]
    });
  }

  createItemStudy(dataStudy: { type: string, name: string }) {
    return this.fb.group({
      type: [dataStudy.type],
      name: [dataStudy.name]
    });
  }

  createItemPhone(dataPhone: {type:string, prefix:string, number:string}) {
    return this.fb.group({
      type: [dataPhone.type, Validators.required],
      prefix: [dataPhone.prefix, Validators.required],
      number: [dataPhone.number, Validators.required]
    });
  }

  // Añadir items a FormArray
  async addJobReference() {
    if(this.formExperience.valid){
      if(this.dateIsValid(new Date(this.formExperience.value.timeStart), new Date(this.formExperience.value.timeEnd))){
        this.workExperienceArray.push(await this.returnForm(this.formExperience.value));
        this.formExperience.reset();
      }else{
        this.notificationService.openSimpleSnackBar(
          {title: 'Fechas Invalidas', message: 'La fecha final debe ser mayor a la fecha de inicio', type: 'info'}
        );
        this.formExperience.get('timeStart')?.reset();
        this.formExperience.get('timeEnd')?.reset();
      }
    }else{
      this.notificationService.openSimpleSnackBar(
        {title: 'Experinecias laborales', message: 'los campos no se pueden añadir hasta encontrarse llenos', type: 'info'}
      );
    }
  }

  returnForm(data: {company:string, charge:string, wage:number, timeStart:string, timeEnd:string}){
    return this.fb.group({
      company: [data.company,Validators.required],
      charge: [data.charge,Validators.required],
      wage: [data.wage,Validators.required],
      timeStart: [data.timeStart,Validators.required],
      timeEnd: [data.timeEnd,Validators.required]
    })
  }

  addPhone() {
    if(this.phones.valid){
      this.phoneArray.push(this.createItemPhone(this.phones.value));
      this.phones.reset();
    }else{
      this.notificationService.openSimpleSnackBar(
        {title: 'Telefono vacio', message: 'No se puede crear un telefono con campos vacios', type: 'info'}
      );
    }
  }

  addStudy() {
    if(this.nevelStudy.valid){
      this.studyArray.push(this.createItemStudy(this.nevelStudy.value));
      this.nevelStudy.reset();
    }else{
      this.notificationService.openSimpleSnackBar(
        {title: 'Nivel Estudio vacio', message: 'No se puede crear un estudio con campos vacios', type: 'info'}
      );
    }
  }

  addLanguages(value: {name:string, writing:string, reading:string, speaking:string}) {
    this.languagesArray.push(this.createItemLanguages(value));
  }

  addSkills(value: {domain:string, knowledgeArea:string, description:string}) {
    this.skillsArray.push(this.createItemSkills(value));
  }

  // Eliminar item de FormArray
  deleteJobReference(index: number) {
    this.workExperienceArray.removeAt(index);
  }

  deletePhone(index: number) {
    this.phoneArray.removeAt(index);
  }

  deleteStudy(index: number) {
    this.studyArray.removeAt(index);
  }

  deleteLanguages(value: string) {
    const index = this.languagesArray.value.findIndex((languague: { name: string; }) => languague.name === value);
    this.languagesArray.removeAt(index);
  }

  deleteSkills(value: string) {
    const position = this.skillsArray.value.findIndex((skill: { domain: string; }) => skill.domain === value);
    this.skillsArray.removeAt(position);

    this.knowledge.splice(position,1);
  }

  // obtener items de formArray
  get workExperienceArray(): FormArray {
    return this.addResumeForm.get('workExperience') as FormArray;
  }

  get phoneArray(): FormArray {
    return this.addResumeForm.get('phone') as FormArray;
  }

  get studyArray(): FormArray {
    return this.addResumeForm.get('levelStudy') as FormArray;
  }

  get languagesArray(): FormArray {
    return this.addResumeForm.get('languages') as FormArray;
  }

  get skillsArray(): FormArray {
    return this.addResumeForm.get('skills') as FormArray;
  }


  // Validacion formArray
  getValidatorPhone(index: number, position: string) {
    return this.phoneArray?.controls[index].get(position)?.invalid && this.phoneArray?.controls[index].get(position)?.touched;
  }

  getValidationLanguage(index: number, position: string) {
    return this.languagesArray?.controls[index].get(position)?.invalid && this.languagesArray?.controls[index].get(position)?.touched;
  }

  getValidationDomain(index: number) {
    return this.skillsArray?.controls[index].get('knowledgeArea')?.invalid &&
      this.skillsArray?.controls[index].get('knowledgeArea')?.touched;
  }

  dateIsValid(startDate: Date, endDate: Date){
    return startDate.getTime() <= endDate.getTime();
  }

  addOrRemoveLanguage(status: boolean, value: string) {
    if (status === true) {
      const valor = {name: value,writing: '',reading: '',speaking: ''}
      this.addLanguages(valor);
    } else {
      this.deleteLanguages(value);
    }
  }

  addOrRemoveSkill(status: boolean, value: string) {
    if (status === true) {
      this.getDataSyllabi(value,'Nuevo');
    } else {
      this.deleteSkills(value);
    }
  }

  addValidationReferred(status:boolean,tipe:string){
    if(status === true && tipe === 'S'){
      this.addResumeForm.get('nameReferred')?.setValidators(Validators.required);
      this.addResumeForm.get('referred')?.setValue(true);
    }else if(status === false && tipe === 'N'){
      this.addResumeForm.get('referred')?.setValue(true);
    }else{
      this.addResumeForm.get('nameReferred')?.clearValidators();
      this.addResumeForm.get('nameReferred')?.reset();
      this.addResumeForm.get('referred')?.reset();
    }
  }

  getDataStudies(){
    this.addResumeService.getDataStudies()
      .then(dataValue => {
        if (dataValue.length > 0) {
          this.Study = dataValue;
        }
      }).catch(error => {
        console.log('error', error);
      })
  }


  getDataSyllabi(value:string, type:string) {
    this.addResumeService.getDataSyllabi()
      .then(dataValue => {
        if (dataValue.length > 0) {
          const domainName = dataValue.filter((domain: { domain: { name: string; }[]; }) => domain.domain[0].name === value);
          if(domainName.length !== 0){
            this.knowledge.push(domainName);
            if(type === 'Nuevo'){
              const valor = {domain: value, knowledgeArea: '', description: ''}
              this.addSkills(valor);
            }
          }
        }
      }).catch(error => {
        console.log('error', error);
      })
  }

  getDataDomain() {
    this.addResumeService.getDataDomain()
      .then((dataValue: string | any[]) => {
        if (dataValue.length > 0) {
          this.domain = dataValue;
        }
      }).catch(error => {
        console.log('error', error)
      })
  }

  getDataReferred(){
    this.addResumeService.getDataUsers()
    .then(dataValue =>{
      if (dataValue.length > 0) {
        this.referred = dataValue;
      }
    }).catch(error => {
      console.log('error', error);
    })
  }

  async getEducationArea(){
  await this.addResumeService.getDataEducationArea()
    .then((dataValue:any[]) => {
     if (dataValue.length > 0){
        this.descriptionStudy = dataValue;
      }
    }).catch((error:any) =>{
      console.log(error);
    })
  }


  validateHvExist(){
    const Identification = this.addResumeForm.get('numberIdentification')?.value;
    if(Identification !== ''){
      this.addResumeService.getDataExist(Identification)
      .then(dataValue =>{
        if (dataValue.length > 0) {
          this.dialogo
            .open(DialogExistRegisterComponent,{
              width: '20%',
              height: '20%'
            })
            .afterClosed()
            .subscribe((confirmado:boolean) => {
              if(confirmado){
                this.update=true;
                this.addResumeForm.patchValue(dataValue[0]);
                this.id_registro = dataValue[0]._id;
                this.addData(dataValue[0].phone,'phone');
                this.addData(dataValue[0].skills,'skills');
                this.addData(dataValue[0].levelStudy, 'levelStudy');
                this.addData(dataValue[0].languages,'languages');
                this.addData(dataValue[0].workExperience, 'workExperience');
              }else{
                this.addResumeForm.reset();
              }
            });
        }
      }).catch(error => {
        console.log('error', error);
      })
    }
  }

  addData(data:any, type:string){
    switch (type) {
      case 'phone':
        data.forEach((element: { type: string; prefix: string; number: string; }) => {
          this.phoneArray.push(this.createItemPhone(element));
        });
        break;
      case 'skills':
        data.forEach((element: { domain:string; knowledgeArea:string; description:string }) => {
          this.addSkills(element);
          this.getDataSyllabi(element.domain,'Existente');
          this.registerSkills.push(element.domain);

        });
        break;
      case 'levelStudy':
        data.forEach((element: { type: string; name: string; }) => {
          this.studyArray.push(this.createItemStudy(element));
        });
        break;
      case 'languages':
        data.forEach((element: {name:string; writing:string; reading:string; speaking:string}) => {
          this.addLanguages(element);
          this.registerLanguague.push(element.name);
        });
        break
      case 'workExperience':
        data.forEach((element: { company: string; charge: string; wage: number; timeStart: string; timeEnd: string; }) => {
          this.workExperienceArray.push(this.returnForm(element));
        });
        break;
    }
  }

  // Post (añadir Hojja de vida)
  saveForm() {
    console.log('data de addResumeForm', this.addResumeForm.value);
    if(this.addResumeForm.valid){
      if(this.update === false){
        this.addResumeService.addResume('http://localhost:80/life-story', this.addResumeForm.value)
        .then(value => {
          console.log('servicio enviado sin error',value);
          this.notificationService.openSimpleSnackBar(
            {title: 'Hoja de vida', message: 'Hoja de vida insertada correctamente', type: 'success'}
          );
        })
        .catch(value => console.log(value));
        this.dialogo.closeAll();
      }else if(this.update === true){
        console.log(this.addResumeForm.value);
        this.addResumeService.updateRegister(this.id_registro,this.addResumeForm.value)
          .then(value => {
            console.log('registro actulizado con exito', value);
            this.notificationService.openSimpleSnackBar(
              {title: 'Hoja de vida', message: 'Hoja de vida actulizada correctamente', type: 'success'}
            );
          })
          .catch(value => console.log(value));
        this.dialogo.closeAll();
      }
    }else{
      this.notificationService.openSimpleSnackBar(
        {title: 'Campos inválidos', message: 'La hoja de vida posee campos vacíos o inválidos', type: 'error'}
      );
    }
  }

}