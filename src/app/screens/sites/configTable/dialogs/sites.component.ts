import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigTableServices } from '../services/configTable.services';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { AnyRecord } from 'dns';

@Component({
  selector: 'sites-app',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
})
export class SitesComponent implements OnInit {
  id_Site: any;
  url_Site: any;
  // dataRegister:any ;
  sites: boolean = false;
  subtitle = this.data.subtitle;

  add: any;

  // formUp!: FormGroup;
  formSities = this.fg.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', 
      [ Validators.required,
        Validators.min(1000000000),
        Validators.max(9999999999)
      ]
    ],
    city: ['', Validators.required],
    status: [false, Validators.required],
  });
  dataRegister: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: any;
      dataSite: any;
      subtitle: any;
      add: boolean;
      url: any;
    },
    private fg: FormBuilder,
    private service: ConfigTableServices,
    private dialog: MatDialogRef<SitesComponent>,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.data.add == false) {
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

  addRegister() {
    this.service
      .addDataSites(this.data?.url, this.formSities.value)
      .then(() => {
        this.notificationService.openSimpleSnackBar({
          title: 'Sedes',
          message: 'Sede Agregada Correctamente',
          type: 'success',
        });
      })
      .catch(() => {
        this.notificationService.openSimpleSnackBar({
          title: 'Sedes',
          message: 'No se pudo agregar la sede',
          type: 'error',
        });
      });
    this.dialog.close(true);
  }

  onSubmit() {
    this.formSities.controls['phoneNumber']?.patchValue(this.formSities.controls['phoneNumber']?.value.toString())
    if (this.data?.add) {
      this.addRegister();
      return;
    }

    this.updateSites();
  }
}
