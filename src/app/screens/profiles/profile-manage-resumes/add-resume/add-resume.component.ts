import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,Validators } from '@angular/forms';
import { type } from 'os';
import { Type } from '../../admin-master-info/master-info/interfaces.interface';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  Languagesdata:string[] = ['Ingles', 'Español', 'Frances', 'Chino', 'Mandarin', 'Portugues'];
  typeIdentificationdata:string[] = ['Cedula de Cuidania', 'Cedula de extranjeria', 'tarjeta de identidad'];
  // knowledge:string[] = ['Datastage','Power BI','Java','Python','Angular','PLSQL'];
  knowledge:string[] = ['Base de datos','Integracion','Desarrollo'];
  profiling:string[] = ['Control interno','Recursos físicos y tecnológicos','Desarrollo','Administración de datos'];
  phoneType:string[] = ['Movil','Casa','Oficina'];
  phonePrefix:string[] = ['+57','+51','+56'];

  displayedColumns: string[] = ['type', 'name','actions'];

  constructor(private fb: FormBuilder) {}

  addResumeForm = this.fb.group({
    maxAspiration:['',Validators.required],
    minAspiration:['',Validators.required],
    observations: [''],
    processStatus:['',Validators.required],
    source:['',Validators.required],
    referred:[false],
    nameReferred:[''],
    professionalCard:['',Validators.required],
    currentJob:['',Validators.required],
    email:['',Validators.email],
    city:['',Validators.required],
    country:['',Validators.required],
    numberIdentification:['',Validators.required],
    typeIdentification:['',Validators.required],
    name:['',Validators.required],
    lastName:['',Validators.required],
    phone: new FormArray([]),
    companyFrom: new FormArray([]),
    skills: new FormArray([]),
    levelStudy: new FormArray([]),
    languages: new FormArray([])
    // profiling:
  });

  nevelStudy = {
    type: '',
    name: ''
  }

  ngOnInit(): void {
  }

  // Creacion item
  createItemCompanyFrom(){
    return this.fb.group({
      name: ['',Validators.required],
      charge: ['',Validators.required],
      salary: ['',Validators.required],
      timeWorked: ['',Validators.required]
    })
  }

  createItemSkills(value:string){
    return this.fb.group({
      domain: [value],
      knowledgeArea: ['',Validators.required]
    })
  }

  createItemLanguages(value:string){
    return this.fb.group({
      name: [value],
      writing: ['',Validators.required],
      reading: ['',Validators.required],
      speaking: ['',Validators.required]
    });
  }

  createItemStudy(dataStudy:{type:string,name:string}){
    return this.fb.group({
      type: [dataStudy.type],
      name: [dataStudy.name]
    });
  }

  createItemPhone(){
    return this.fb.group({
      type: ['',Validators.required],
      prefix: ['',Validators.required],
      number: ['',Validators.required]
    });
  }

  // Añadir items a FormArray
  addPhone(){
    this.phoneArray.push(this.createItemPhone());
  }

  addStudy(){
    if(this.nevelStudy.type !== '' &&  this.nevelStudy.name !== ''){
      this.studyArray.push(this.createItemStudy(this.nevelStudy));
      this.nevelStudy.type = '';
      this.nevelStudy.name = '';
    }
  }

  addLanguages(value:string){
    this.languagesArray.push(this.createItemLanguages(value));
  }

  addSkills(value:string){
    this.skillsArray.push(this.createItemSkills(value));
  }

  addCompanyFrom(){
    this.companyFromArray.push(this.createItemCompanyFrom());
  }


  // Eliminar item de FormArray
  deletePhone(index:number){
    this.phoneArray.removeAt(index);
  }

  deleteStudy(index:number){
    this.studyArray.removeAt(index);
  }

  deleteLanguages(value:string){
    const index =  this.languagesArray.value.findIndex((languague: { name: string; }) => languague.name === value);
    this.languagesArray.removeAt(index);
  }

  deleteSkills(value:string){
    const index = this.skillsArray.value.findIndex((skill: {domain: string;}) => skill.domain === value);
    this.skillsArray.removeAt(index);
  }

  deleteCompanyFrom(index:number){
    this.companyFromArray.removeAt(index);
  }


  // obtener items de formArray
  get phoneArray(): FormArray {
    return this.addResumeForm.get('phone') as FormArray;
  }

  get studyArray():FormArray {
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
  getValidatorPhone(index:number, position: string) {
    return this.phoneArray?.controls[index].get(position)?.invalid && this.phoneArray?.controls[index].get(position)?.touched;
  }

  getValidationLanguage(index:number, position: string){
    return this.languagesArray?.controls[index].get(position)?.invalid && this.languagesArray?.controls[index].get(position)?.touched;
  }

  getValidationDomain(index:number){
    return this.skillsArray?.controls[index].get('knowledgeArea')?.invalid &&
    this.skillsArray?.controls[index].get('knowledgeArea')?.touched;
  }

  addOrRemoveLanguage(status:boolean,value:string){
    if(status === true){
      this.addLanguages(value);
    }else{
      this.deleteLanguages(value);
    }
  }

  addOrRemoveSkill(status:boolean,value:string){
    if(status === true){
      this.addSkills(value);
    }else{
      this.deleteSkills(value);
    }
  }

  // Insertar hoja de vida
  saveForm(){
    console.log('data de addResumeForm', this.addResumeForm.value);
    console.log('form is valid', this.addResumeForm.valid);
  }

}