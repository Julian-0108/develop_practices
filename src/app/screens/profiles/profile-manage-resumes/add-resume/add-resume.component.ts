import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,Validators } from '@angular/forms';
import { Type } from '../../admin-master-info/master-info/interfaces.interface';

@Component({
  selector: 'app-add-resume',
  templateUrl: './add-resume.component.html',
  styleUrls: ['./add-resume.component.scss']
})
export class AddResumeComponent implements OnInit {

  Languagesdata:string[] = ['Ingles', 'Español', 'Frances', 'Chino', 'Mandarin', 'Portugues'];
  typeIdentificationdata:string[] = ['Cedula de Cuidania', 'Cedula de extranjeria', 'tarjeta de identidad'];
  knowledge:string[] = ['Datastage','Power BI','Java','Python','Angular','PLSQL'];
  profiling:string[] = ['Control interno','Recursos físicos y tecnológicos','Desarrollo','Administración de datos'];
  phoneType:string[] = ['Movil','Casa','Oficina'];
  phonePrefix:string[] = ['+57','+51','+56'];


  constructor(private fb: FormBuilder) {}

  addResumeForm = this.fb.group({
    maxAspiration:['',Validators.required],
    minAspiration:['',Validators.required],
    observations: [''],
    processStatus:['',Validators.required],
    source:['',Validators.required],
    referred:[false,Validators.required],
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
    companyFrom: this.fb.group({
      name: [''],
      charge: [''],
      salary: [''],
      timeWorked: ['']
    }),
    skills: this.fb.group({
      domain: [''],
      knowledgeArea: ['']
    }),
    levelStudy: this.fb.group({
      type: [''],
      name: ['']
    }),
    languages: this.fb.group({
      name: [''],
      writing: [''],
      reading: [''],
      speaking: ['']
    })
    // profiling:
  });

  ngOnInit(): void {
  }


  createItemPhone(){
    return this.fb.group({
      type: ['',Validators.required],
      prefix: ['',Validators.required],
      number: ['',Validators.required]
    });
  }

  addPhone(){
    this.phoneArray.push(this.createItemPhone());
  }

  deletePhone(index:number){
    this.phoneArray.removeAt(index);
  }


  get phoneArray(): FormArray {
    return this.addResumeForm.get('phone') as FormArray;
  }

  saveForm(){
    console.log('data de addResumeForm', this.addResumeForm.value);
    // console.log('phone valid', this.phoneArray.controls[0].Type.);
  }

}
