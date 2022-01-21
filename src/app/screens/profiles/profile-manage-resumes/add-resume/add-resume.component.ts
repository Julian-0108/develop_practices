import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { AddResumeService } from './service/add-resume.service';
import { url } from 'inspector';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  Languagesdata: string[] = ['Ingles', 'Español', 'Frances', 'Chino', 'Mandarin', 'Portugues'];
  typeIdentificationdata: string[] = ['Cedula de Cuidania', 'Cedula de extranjeria', 'tarjeta de identidad'];
  // knowledge:string[] = ['Datastage','Power BI','Java','Python','Angular','PLSQL'];
  // profiling: string[] = ['Control interno', 'Recursos físicos y tecnológicos', 'Desarrollo', 'Administración de datos'];
  phoneType: string[] = ['Movil', 'Casa', 'Oficina'];
  phonePrefix: string[] = ['+57', '+51', '+56'];
  // Propiedades listadas desde servicio
  knowledge: any = {};
  Study: any = {};


  displayedColumns: string[] = ['type', 'name', 'actions'];
  displayedColumnsJob: string[] = ['company','charge','wage','time','actions'];


  addProfile: any = {
    maxAspiration: 100000,
    minAspiration: 10000000,
    companyFrom: [
      { name: 'Cualquiera', charge: 'Aprendiz', salary: 0, timeWorked: 2 },
      { name: 'Cualquiera', charge: 'Aprendiz', salary: 0, timeWorked: 2 }
    ], observations: 'ninguna',
    processStatus: 'seleccionado',
    source: 'Lasalle',
    jobReferences: [
      { company: 'Seti', charge: 'Aprendiz', wage: 1200000, time: 2 }
    ],
    referred: true,
    nameReferred: 'cualquier persona',
    professionalCard: 'No',
    currentJob: 'Seti',
    email: 'andres@gmail.com.co',
    phone: [
      { type: 'Móvil', prefix: '+57', number: '3008255241' },
      { type: 'Fijo', prefix: '+57', number: '1234567890' }
    ], city: 'Cali',
    country: 'Colombia',
    numberIdentification: '12345678',
    typeIdentification: 'Cedula de Ciudadania',
    name: 'Andres',
    lastName: 'Duque Palacio',
    skills: [
      { domain: 'base de datos', knowledgeArea: 'MSQL' }
    ], levelStudy: [],
    languages: [{ name: 'Frances', writing: 'Alto', reading: 'Alto', speaking: 'Medio' }]
  };


  constructor(private fb: FormBuilder, private addResumeService: AddResumeService) { }

  addResumeForm = this.fb.group({
    maxAspiration: ['', Validators.required],
    minAspiration: ['', Validators.required],
    observations: [''],
    processStatus: ['', Validators.required],
    source: ['', Validators.required],
    referred: [false],
    nameReferred: [''],
    professionalCard: ['', Validators.required],
    currentJob: ['', Validators.required],
    email: ['', Validators.email],
    city: ['', Validators.required],
    country: ['', Validators.required],
    numberIdentification: ['', Validators.required],
    typeIdentification: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: new FormArray([]),
    companyFrom: new FormArray([]),
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
    company:'',
    charge: '',
    wage:'',
    time:''
  }

  ngOnInit(): void {
    this.getDataStudies();
    this.getDataDomain();
  }

  // Creacion item

  createJobRefence(dataJob: {company:string,charge:string,wage:any,time:any}) {
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
  addJobReference(){
    if(this.references.company !== '' && this.references.charge !== '' && this.references.wage !== '' && this.references.time !== ''){
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
  deleteJobReference(index:number){
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
    const index = this.skillsArray.value.findIndex((skill: { domain: string; }) => skill.domain === value);
    this.skillsArray.removeAt(index);
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
      this.addSkills(value);
    } else {
      this.deleteSkills(value);
    }
  }

  // saveForm() {
    //   console.log('data de addResumeForm', this.addResumeForm.value);
    //   console.log('form is valid', this.addResumeForm.valid);
    // }


    // Post (añadir Hojja de vida)
  saveForm(){
    this.addResumeService.addResume('http://localhost/life-story',this.addProfile)
    .then(value => console.log(value))
    .catch(value => console.log(value));
  }



  // Metodos Get

  getDataStudies() {
    this.addResumeService.getDataStudies()
      .then((dataValue: string | any[]) => {
        if (dataValue.length > 0) {
          this.Study = dataValue;
          console.log('Respuesta estudios', this.Study);
        }
      }).catch(error => {
        console.log('error', error)
      })
  }

  getDataDomain() {
    this.addResumeService.getDataDomain()
      .then((dataValue: string | any[]) => {
        if (dataValue.length > 0) {
          this.knowledge = dataValue;
          console.log('Respuesta dominios:', this.knowledge);
        }
      }).catch(error => {
        console.log('error', error)
      })
  }





}


