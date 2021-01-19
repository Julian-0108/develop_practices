import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  date: Date = new Date();
  private readonly DATE_FORM_CONTROL = 'yyyy-MM-dd';

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, fb: FormBuilder, private datePipe: DatePipe) {

    this.form = fb.group({
      profileName: ['', Validators.required],
      level: ['', Validators.required],
      academicFormation: ['', Validators.required],
      certifications: ['', Validators.required],
      workExperience: ['', Validators.required],
      areaExperience: ['', Validators.required],
      areaSkills: ['', Validators.required],
      roleFunctions: ['', Validators.required],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required],
      status: ['', Validators.required],
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
    
    this.form.get('status')?.patchValue(true);
    this.form.get('updatedAt')?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
    this.form.get('createdAt')?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
    
    if (this.data?.element){
      
      this.form.patchValue(this.data.element);
      
      this.form.get('updatedAt')?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
      this.form.get('createdAt')?.patchValue(this.datePipe.transform(this.data.element.createdAt, this.DATE_FORM_CONTROL));

    }


  }

}