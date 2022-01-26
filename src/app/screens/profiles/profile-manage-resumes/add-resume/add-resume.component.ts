import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AddResumeService } from './service/add-resume.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  Languagesdata: string[] = ['Ingles', 'Español', 'Frances', 'Chino', 'Mandarin', 'Portugues'];
  typeIdentificationdata: string[] = ['Cedula de Ciudadania', 'Cedula de extranjeria', 'tarjeta de identidad'];
  knowledge:string[] = [];
  phoneType: string[] = ['Movil', 'Casa', 'Oficina'];
  phonePrefix: string[] = ['+57', '+51', '+56'];
  source: string[] = ['Correo','Linkedin','Computrabajo','Empleo.com','Ticjob'];
  cities: string[] = ['Bogota','Medellin','Cali','Leticia','Arauca','Barranquilla','Cartagena','Tunja','Manizalez','Florencia','Yopal','Popayan','Valledupar','Quibdo','Monteria'];
  // profiling: string[] = ['Control interno', 'Recursos físicos y tecnológicos', 'Desarrollo', 'Administración de datos'];
  // Propiedades listadas desde servicio
  domain: any = {};
  Study: any = {};
  referred:any = {};

  // Columna tabla
  displayedColumns: string[] = ['type', 'name', 'actions'];
  displayedColumnsJob: string[] = ['company', 'charge', 'wage', 'time', 'actions'];

  constructor(private fb: FormBuilder, private addResumeService: AddResumeService,private notificationService: NotificationService) { }

  addResumeForm = this.fb.group({
    maxAspiration: ['', Validators.required],
    minAspiration: ['', Validators.required],
    observations: [''],
    processStatus: 'En proceso',
    source: ['', Validators.required],
    referred: [false],
    nameReferred: [''],
    professionalCard: ['', Validators.required],
    email: ['', Validators.email],
    city: ['', Validators.required],
    country: ['', Validators.required],
    numberIdentification: ['', Validators.required],
    typeIdentification: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: new FormArray([]),
    // companyFrom: new FormArray([]),
    skills: new FormArray([]),
    levelStudy: new FormArray([]),
    languages: new FormArray([]),
    jobReferences: new FormArray([])
    // profiling:
  });

  nevelStudy = {
    type: '',
    name: ''
  }

  references = {
    company: '',
    charge: '',
    wage: '',
    time: ''
  }

  ngOnInit(): void {
    this.getDataStudies();
    this.getDataDomain();
    this.getDataReferred();
  }

  // Creacion item
  createJobRefence(dataJob: { company: string, charge: string, wage: any, time: any }) {
    return this.fb.group({
      company: [dataJob.company],
      charge: [dataJob.charge],
      wage: [dataJob.wage],
      time: [dataJob.time]
    })
  }

  createItemCompanyFrom() {
    return this.fb.group({
      name: ['', Validators.required],
      charge: ['', Validators.required],
      salary: ['', Validators.required],
      timeWorked: ['', Validators.required]
    })
  }

  createItemSkills(value: string) {
    return this.fb.group({
      domain: [value],
      knowledgeArea: ['', Validators.required]
    })
  }

  createItemLanguages(value: string) {
    return this.fb.group({
      name: [value],
      writing: ['', Validators.required],
      reading: ['', Validators.required],
      speaking: ['', Validators.required]
    });
  }

  createItemStudy(dataStudy: { type: string, name: string }) {
    return this.fb.group({
      type: [dataStudy.type],
      name: [dataStudy.name]
    });
  }

  createItemPhone() {
    return this.fb.group({
      type: ['', Validators.required],
      prefix: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  // Añadir items a FormArray
  addJobReference() {
    if (this.references.company !== '' && this.references.charge !== '' && this.references.wage !== '' && this.references.time !== '') {
      this.jobReferencesArray.push(this.createJobRefence(this.references));
      this.references.company = '';
      this.references.charge = '';
      this.references.wage = '';
      this.references.time = '';
    }
  }

  addPhone() {
    this.phoneArray.push(this.createItemPhone());
  }

  addStudy() {
    if (this.nevelStudy.type !== '' && this.nevelStudy.name !== '') {
      this.studyArray.push(this.createItemStudy(this.nevelStudy));
      this.nevelStudy.type = '';
      this.nevelStudy.name = '';
    }
  }

  addLanguages(value: string) {
    this.languagesArray.push(this.createItemLanguages(value));
  }

  addSkills(value: string) {
    this.skillsArray.push(this.createItemSkills(value));
  }

  addCompanyFrom() {
    this.companyFromArray.push(this.createItemCompanyFrom());
  }

  // Eliminar item de FormArray
  deleteJobReference(index: number) {
    this.jobReferencesArray.removeAt(index);
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
    console.log('select conocimientos',this.knowledge);

  }

  deleteCompanyFrom(index: number) {
    this.companyFromArray.removeAt(index);
  }

  // obtener items de formArray
  get jobReferencesArray(): FormArray {
    return this.addResumeForm.get('jobReferences') as FormArray;
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

  get companyFromArray(): FormArray {
    return this.addResumeForm.get('companyFrom') as FormArray;
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

  addOrRemoveLanguage(status: boolean, value: string) {
    if (status === true) {
      this.addLanguages(value);
    } else {
      this.deleteLanguages(value);
    }
  }

  addOrRemoveSkill(status: boolean, value: string) {
    if (status === true) {
      this.getDataSyllabi(value);
    } else {
      this.deleteSkills(value);
    }
  }

  addValidationReferred(status:boolean){
    if(status === true){
      this.addResumeForm.get('nameReferred')?.setValidators(Validators.required);
    }else{
      this.addResumeForm.get('nameReferred')?.clearValidators();
      this.addResumeForm.get('nameReferred')?.reset();
    }
  }

  getDataStudies(){
    this.addResumeService.getDataStudies()
      .then(dataValue => {
        if (dataValue.length > 0) {
          this.Study = dataValue
          console.log('Response del metodo getDataStudies', this.Study)
        }
      }).catch(error => {
        console.log('error', error)
      })
  }


  getDataSyllabi(value:string) {
    this.addResumeService.getDataSyllabi()
      .then(dataValue => {
        if (dataValue.length > 0) {
          const domainName = dataValue.filter((domain: { domain: { name: string; }[]; }) => domain.domain[0].name === value);
          if(domainName.length !== 0){
            this.knowledge.push(domainName);
            this.addSkills(value);
            console.log('skills of domain', this.knowledge);
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
          console.log('Respuesta dominios:', this.knowledge);
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

  validateHvExist(){
    const Identification = this.addResumeForm.get('numberIdentification')?.value;
    if(Identification !== ''){
      this.addResumeService.getDataExist(Identification)
      .then(dataValue =>{
        if (dataValue.length > 0) {
          this.notificationService.openSimpleSnackBar(
            {title: 'Hoja de vida existente', message: `numero de identificacion ${Identification} existente`, type: 'info'}
          );
          this.addResumeForm.reset();
        }
      }).catch(error => {
        console.log('error', error);
      })
    }
  }

  // Post (añadir Hojja de vida)
  saveForm() {
    console.log('data de addResumeForm', this.addResumeForm.value);
    if(this.addResumeForm.valid){
    this.addResumeService.addResume('http://localhost:80/life-story', this.addResumeForm.value)
      .then(value => {
        console.log('servicio enviado sin error',value);
        this.notificationService.openSimpleSnackBar(
          {title: 'Hoja de vida', message: 'Hoja de vida insertada correctamente', type: 'success'}
        );
      })
      .catch(value => console.log(value));
    }else{
      this.notificationService.openSimpleSnackBar(
        {title: 'Campos ivalidos', message: 'La hoja de vida posee campos vacios o invalidos', type: 'error'}
      );
    }
  }

}


