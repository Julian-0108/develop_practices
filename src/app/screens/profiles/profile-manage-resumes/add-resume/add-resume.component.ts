import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,Validators } from '@angular/forms';
import { AddResumeService } from './service/add-resume.service';
import { url } from 'inspector';
import { catchError } from 'rxjs/operators';

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
  dataCloud: any[]= []




  addProfile:any = {
    "maxAspiration": 10000000,
    "minAspiration": 10000000,
    "companyFrom": [
        {
            "name": "Cualquiera",
            "charge": "Aprendiz",
            "salary": 0,
            "timeWorked": 2
        },
        {
            "name": "Cualquiera",
            "charge": "Aprendiz",
            "salary": 0,
            "timeWorked": 2
        }
    ],
    "observations": "ninguna",
    "processStatus": "seleccionado",
    "source": "Lasalle",
    "referred": true,
    "nameReferred": "cualquier persona",
    "professionalCard": "No",
    "currentJob": "Seti",
    "email": "shirleybenavides@gmail.com.co",
   "phone": [
        {
            "type": "Móvil",
            "prefix": "+57",
            "number": "3008255241"
        },
        {
            "type": "Fijo",
            "prefix": "+57",
            "number": "1234567890"
        }
    ],
    "city": "Zipaquira",
    "country": "Colombia",
    "numberIdentification": "12345678",
    "typeIdentification": "Cedula de Ciudadania", 
    "name": "Ricardo",
    "lastName": "Fraile",
    "skills": [
        {
            "domain": "base de datos",
            "knowledgeArea": "MSQL"
        }
    ],
    "levelStudy": [],
    "languages": [
        {
            "name": "Frances",
            "writing": "Alto",
            "reading": "Alto",
            "speaking": "Medio"
        }
    ]
};


  constructor(private fb: FormBuilder, private addResumeService:AddResumeService) {}

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

  /*
  saveForm(){
    this.addResumeService.addResume("http://localhost/life-story",this.addProfile)
    .then(value => console.log(value))
    .catch(value => console.log(value));
  }
  */

  saveForm(){
    this.getDataStudies()
  }



  getDataStudies(): void {
    this.addResumeService.getDataStudies()
    .then(dataValue =>{
      if (dataValue.length > 0) {
        this.dataCloud =  dataValue
        console.log("Response del metodo getDataStudies" ,this.dataCloud)
      }
    }).catch(error =>{
      console.log("error",error)
    })
  }

  getDataDomain():void {
    this.addResumeService.getDataDomain()
    .then(dataValue => {
      if(dataValue.length > 0){
        this.dataCloud = dataValue
        console.log("Response del metodo getDataDomain" ,this.dataCloud)
      }
    }).catch(error =>{
      console.log("error", error)
    })
  }

}


