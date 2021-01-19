import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, fb: FormBuilder) {

    this.form = fb.group({
      profileName: ['', Validators.required],
      level: ['', Validators.required],
      academicFormation: ['', Validators.required],
      certifications: ['', Validators.required],
      workExperience: ['', Validators.required],
      areaExperience: ['', Validators.required],
      areaSkills: ['', Validators.required],
      roleFunctions: ['', Validators.required]
    });

    this.editForm();
    

  }

  ngOnInit(): void {
  }


  onSubmit(){

    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;
    
    console.log(formData);

  }

  editForm(){

    if (this.data.element){

      this.form.patchValue(this.data.element);

    }

  }

}