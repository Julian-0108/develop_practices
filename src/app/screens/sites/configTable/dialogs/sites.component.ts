import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigTableServices } from '../services/configTable.services';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { AnyRecord } from 'dns';

@Component({
  selector: 'sites-app',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent implements OnInit {
  id_Site: any;
  url_Site: any;
  // dataRegister:any ;
  sites:boolean= false;
  subtitle = this.data.subtitle;

  add: any;

  // formUp!: FormGroup;
  formSities = this.fg.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    city: ['', Validators.required],
    status: ['', Validators.required],
  });
  dataRegister: any;
  
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      title:any, 
      dataSite: any; 
      subtitle: any, 
      add:boolean,
      url:any
    },
    private fg: FormBuilder,
    private service: ConfigTableServices,
    private dialog: MatDialogRef<SitesComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log("valor del add:",this.data.add);
    if(this.data.add == false){
      this.formSities.patchValue(this.data.dataSite);
      this.sites = this.data.dataSite.status;
    }
  }

  updateSites() {
    this.id_Site = this.data.dataSite._id;
    this.service
      .updateDataSites(this.id_Site, this.formSities.value)
      .then(() => {
        this.notificationService.openSimpleSnackBar({
          title: 'Sedes',
          message: 'Sede Actualizada Correctamente',
          type: 'success',
        });
      })
      .catch();
    this.dialog.close(true);
  }

  addRegister(){
    console.log("entre pai    ")
    this.service
    .addDataSites(this.data.url, this.formSities.value)
    .then(()=>{
      console.log('Se ha creado con exito', this.dataRegister)
    })
    .catch(()=>{
      console.log('no se a creado', this.dataRegister)
    })
    this.dialog.close(true);
  }

  onSubmit(){
    console.log('se esta ejecutanddooooo',(this.data?.add))
    if(this.data?.add){
      console.log('adddddddddddddd')
      this.addRegister();
    }else {
      console.log('uppppppp')
      this.updateSites();
    }
  }
}
