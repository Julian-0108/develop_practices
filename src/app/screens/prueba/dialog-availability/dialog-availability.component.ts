import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { getDataAlertAssign, integrante, integranteAssign } from '../interfaces/assignAvailability';
@Component({
  selector: 'app-dialog-availability',
  templateUrl: './dialog-availability.component.html',
  styleUrls: ['./dialog-availability.component.scss']
})
export class DialogAvailabilityComponent implements OnInit {
  update: boolean = false;
  formAssign!: FormGroup;
  integrante!:any;
  myFilter = (d: Date): boolean => {
    let view = true;
    
    // Prevent Saturday and Sunday from being selected.
    if (d.getFullYear() > new Date().getFullYear()){
      view = false;
    }
    else if (d.getMonth() > new Date().getMonth()) {
      if (d.getFullYear() == new Date().getFullYear()) {
        view = false;
      }
    }
    else if (d.getDate() > new Date().getDate()) {
      if (d.getMonth() == new Date().getMonth() && d.getFullYear() == new Date().getFullYear()){
        view = false;
      }
    }
    return view;
  };
  
  constructor(public dialogRef: MatDialogRef<DialogAvailabilityComponent>, @Inject(MAT_DIALOG_DATA) public data: getDataAlertAssign, private fb:FormBuilder ) { 

  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.update == true) {
      this.update = true;
      this.integrante = this.data.integrante;
      console.log('Actualizando integrante: '+this.data.integrante._id); 
    }else{
      this.integrante = this.data.integrante;
      console.log('creando asignacion de disponiblidad al integrante: '+this.data.integrante._id); 
    }
    
    this.builderForm();
  }

  builderForm(){
    this.formAssign = this.fb.group({
      dateStart: [(this.integrante.date_start == undefined?'MM/DD/YYYY':this.integrante.date_start)],
      dateEnd: [(this.integrante.date_end == undefined?'MM/DD/YYYY':this.integrante.date_end)],
      hours: [(this.integrante.hoursD == undefined?1:this.integrante.hoursD), Validators.min(1)],
      state: [(this.integrante.status == undefined?'':this.integrante.status.id_status.toString())]
    });
  }
}
