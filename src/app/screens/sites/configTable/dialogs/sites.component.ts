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
  formSities = this.fg.group({
    name: ['', Validators.required],
    nameSedes:['',Validators.required],
    address: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required,Validators.min(1000000000), Validators.max(9999999999)],

    ],
    office:['',Validators.required],
    floor:['',Validators.required],

    capacity:['',Validators.required],
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
      if(this.subtitle=='Oficinas'){
        console.log("🚀 ~ file: sites.component.ts ~ line 61 ~ SitesComponent ~ ngOnInit ~ this.data.dataSite.idVenues.name", this.data.dataSite.idVenues.name)
        this.formSities.get('nameSedes')?.setValue(this.data.dataSite.idVenues.name);
        console.log(this.formSities.value);
      }
      console.log("🚀 ~ file: sites.component.ts ~ line 59 ~ SitesComponent ~ ngOnInit ~ data", this.data)
      this.formSities.patchValue(this.data.dataSite);
      this.sites = this.data.dataSite.status;
    }


  }

  updateSites() {
    this.id_Site = this.data.dataSite._id;
      this.service
      .updateDataSites(this.id_Site,this.data?.url, this.formSities.value)
      .then(() => {
        this.notificationService.openSimpleSnackBar({
          title: 'Sedes',
          message: 'Sede Actualizada Correctamente',
          type: 'success',
        });
        this.dialog.close(true);
      })
      .catch();

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
        this.dialog.close(true);
      })
      .catch();
  }

  onSubmit() {
    this.formSities.controls['phoneNumber']?.patchValue(
      this.formSities.controls['phoneNumber']?.value.toString()
    );
    if (this.data?.add) {
      this.addRegister();
      return;
    }
    this.updateSites();
  }
}
