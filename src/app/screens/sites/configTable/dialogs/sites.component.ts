import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sites-app',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { dataSite: any }, private fg: FormBuilder) {}

  sites = this.data.dataSite;
  // formUp!: FormGroup;
  formSities = this.fg.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    city: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    this.formSities.patchValue(this.data.dataSite);
  }

  updateSites() {
    console.log(this.formSities.value)
    console.log(this.formSities.valid)
    // if(this.update === true){
    //   console.log(this.SitesForm.value);
    //   this.addResumeService.updateRegister(this.idUpdate,this.SitesForm.value)
    //   .then(value => {
    //     console.log('registro actulizado con exito', value);
    //     this.notificationService.openSimpleSnackBar(
    //       {title: 'Hoja de vida', message: 'Hoja de vida actulizada correctamente', type: 'success'}
    //     );
    //   })
    //   .catch(value => console.log(value));
    //     this.dialogo.closeAll();
    // }else{
    //   this.notificationService.openSimpleSnackBar(
    //     {title: 'Campos inválidos', message: 'La hoja de vida posee campos vacíos o inválidos', type: 'error'}
    //   );
    // }
  }
}
