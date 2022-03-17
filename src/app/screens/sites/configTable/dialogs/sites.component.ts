import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfigTableServices } from '../services/configTable.services';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';

@Component({
  selector: 'sites-app',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  id_Site: any;
  url_Site: any;
  sites: boolean = false;
  subtitle = this.data.subtitle;
  add: any;

  // formUp!: FormGroup;
  formVenues = this.fg.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required,Validators.min(1000000000), Validators.max(9999999999)],
    ],
    city: ['', Validators.required],
    status: [false, Validators.required],
  });

  formSites = this.fg.group({
    idOffices: [''],
    name: ['', Validators.required],
    nameOffice:['',Validators.required],
    capacity:['',Validators.required],
    status: [false, Validators.required],
  });

  formOffices = this.fg.group({
    idVenues: [''],
    nameSedes:['',Validators.required],
    office:['',Validators.required],
    floor:['',Validators.required],
    capacity:['',Validators.required],
    status: [false, Validators.required],
  })

  formGroup2: any;
  dataRegister: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: any;
      dataSite: any;
      subtitle: any;
      add: boolean;
      url: any;
      tables: any;
    },
    private fg: FormBuilder,
    private service: ConfigTableServices,
    private dialog: MatDialogRef<SitesComponent>,
    private notificationService: NotificationService
  ) {}



  ngOnInit(): void {
    switch(this.subtitle){
      case 'Oficinas':
        this.formGroup2  = this.formOffices;
        this.formGroup2.patchValue(this.data.dataSite);
        this.formGroup2.get('idVenues').setValue(this.data.dataSite.idVenues._id)
        this.sites = this.data.dataSite.status;
        break;
      case 'Sitios':
        // console.log(this.formGroup2.value)
        this.formGroup2 = this.formSites;
        this.formGroup2.patchValue(this.data.dataSite);
        this.formGroup2.get('idOffices').setValue(this.data.dataSite.idOffices._id)
        this.sites = this.data.dataSite.status;
        break
      case 'Sedes':
        this.formGroup2 = this.formVenues;
        this.formGroup2.patchValue(this.data.dataSite);
        this.sites = this.data.dataSite.status;
        break
    }

    if (this.data.add == false) {
      this.formOffices.removeControl('listSites')
      if(this.subtitle=='Oficinas'){
        this.formOffices.get('nameSedes')?.setValue(this.data.dataSite.idVenues.name);
      } else if (this.subtitle == 'Sitios'){
          this.formSites.get('nameOffice')?.setValue(this.data.dataSite.idOffices.office);
      }
    }
  }

  updateSites() {
    this.formGroup2.removeControl('nameSedes');
    this.formGroup2.removeControl('nameOffice');

    console.log(this.formGroup2.value)
    this.id_Site = this.data.dataSite._id;
      this.service
      .updateDataSites(this.data?.url, this.id_Site, this.formGroup2.value )
      .then(() => {
        switch(this.subtitle){
          case 'Sedes':
            this.notificationService.openSimpleSnackBar({
              title: 'Sedes',
              message: 'Sede Actualizado Correctamente',
              type: 'success',
            });
            this.dialog.close(true);
            break
          case 'Oficinas':
            this.notificationService.openSimpleSnackBar({
              title: 'Oficinas',
              message: 'Oficina Actualizada Correctamente',
              type: 'success',
            });
            this.dialog.close(true);
            break
          case 'Sitios':
            this.notificationService.openSimpleSnackBar({
              title: 'Sitios',
              message: 'Sitio Actualizado Correctamente',
              type: 'success',
            });
            this.dialog.close(true);
            break
        }
      })
    }

  addRegister() {
    this.service
      .addDataSites(this.data?.url, this.formGroup2)

      .then(() => {
        switch(this.subtitle){
          case 'Sedes':
            this.notificationService.openSimpleSnackBar({
              title: 'Sedes',
              message: 'Sede Creada Correctamente',
              type: 'success',
            });
            this.dialog.close(true);
            break
          case 'Oficinas':
            this.notificationService.openSimpleSnackBar({
              title: 'Oficinas',
              message: 'Oficina Creada Correctamente',
              type: 'success',
            });
            this.dialog.close(true);
            break
          case 'Sitios':
            this.notificationService.openSimpleSnackBar({
              title: 'Sitios',
              message: 'Sitio Creado Correctamente',
              type: 'success',
            });
            this.dialog.close(true);
            break
        }
      })
  }
  onSubmit() {
    this.formVenues.controls['phoneNumber']?.patchValue(
      this.formVenues.controls['phoneNumber']?.value.toString()
    );
    if (this.data?.add) {
      this.addRegister();
      return;
    }
    this.updateSites();
  }
}
