import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfigTableServices } from '../services/configTable.services';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { url } from 'inspector';

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
      [Validators.required, Validators.min(1000000000), Validators.max(9999999999)],
    ],
    city: ['', Validators.required],
    status: [false, Validators.required],
  });

  formSites = this.fg.group({
    idOffices: [''],
    name: ['', Validators.required],
    nameOffice: ['', Validators.required],
    capacity: ['', Validators.required],
    status: [false, Validators.required],
  });

  formOffices = this.fg.group({
    idVenues: [''],
    nameVenues: [''],
    office: ['', Validators.required],
    floor: ['', Validators.required],
    capacity: ['', Validators.required],
    status: [false, Validators.required],
  });
  dataRegister: any;
  venues: any[] = [];

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
    this.activateForm();
    this.formValue();
  }

  formValue() {
    if (this.data.add == false) {
      console.log(
        '🚀 ~ file: sites.component.ts ~ line 74 ~ SitesComponent ~ ngOnInit ~ this.data.dataSite',
        this.data.dataSite
      );
      switch (this.subtitle) {
        case 'Oficinas':
          this.formOffices.patchValue(this.data.dataSite);
          this.formOffices.get('idVenues')?.setValue(this.data.dataSite.idVenues._id);
          break;
        case 'Sitios':
          this.formSites.patchValue(this.data.dataSite);
          this.formSites.get('idOffices')?.setValue(this.data.dataSite.offices._id);
          break;
        case 'Sedes':
          this.formVenues.patchValue(this.data.dataSite);
          break;
      }
      this.sites = this.data.dataSite.status;

      this.formOffices.removeControl('listSites');
      if (this.subtitle == 'Oficinas') {
        this.formOffices.get('nameVenues')?.setValue(this.data.dataSite.idVenues.name);
      } else if (this.subtitle == 'Sitios') {
        this.formSites.get('nameOffice')?.setValue(this.data.dataSite.offices.office);
      }
    } else {
      this.getVenues('venues');
    }
  }
  activateForm() {
    switch (this.subtitle) {
      case 'Oficinas':
        this.formSites.disable({ onlySelf: true });
        this.formVenues.disable({ onlySelf: true });
        break;
      case 'Sitios':
        this.formOffices.disable({ onlySelf: true });
        this.formVenues.disable({ onlySelf: true });
        break;
      case 'Sedes':
        this.formOffices.disable({ onlySelf: true });
        this.formSites.disable({ onlySelf: true });
        break;
    }
  }
  getVenues(url: string) {
    console.log('entro aqui');
    this.service.getListSites(url).then((dataValue) => {
      if (dataValue.length > 0) {
        this.venues = dataValue;
        console.log(
          '🚀 ~ file: sites.component.ts ~ line 122 ~ SitesComponent ~ .then ~ venues',
          this.venues
        );
      }
    });
  }
  getList(value: any) {
    this.formOffices.get('idVenues')?.setValue(value._id);
  }

  updateSites(form: FormGroup) {
    this.formOffices.removeControl('nameVenues');
    this.formSites.removeControl('nameOffice');
    console.log(
      '🚀 ~ file: sites.component.ts ~ line 121 ~ SitesComponent ~ updateSites ~ form',
      form.value
    );

    this.id_Site = this.data.dataSite._id;
    this.service.updateDataSites(this.data?.url, this.id_Site, form.value).then(() => {
      this.notificationService.openSimpleSnackBar({
        title: `${this.subtitle}`,
        message: `${this.subtitle.slice(0, -1)} Actualizado Correctamente`,
        type: 'success',
      });
      this.dialog.close(true);
    });
  }

  addRegister(form: FormGroup) {
    console.log(form.value);
    this.service.addDataSites(this.data?.url, form.value).then(() => {
      this.notificationService.openSimpleSnackBar({
        title: `${this.subtitle}`,
        message: `${this.subtitle.slice(0, -1)} Creado Correctamente`,
        type: 'success',
      });
      this.dialog.close(true);
    });
  }
  onSubmit() {
    switch (this.subtitle) {
      case 'Oficinas':
        this.data.add ? this.addRegister(this.formOffices) : this.updateSites(this.formOffices);
        break;
      case 'Sitios':
        this.data.add ? this.addRegister(this.formSites) : this.updateSites(this.formSites);
        break;
      case 'Sedes':
        this.data.add ? this.addRegister(this.formVenues) : this.updateSites(this.formVenues);
        this.formVenues.controls['phoneNumber']?.patchValue(
          this.formVenues.controls['phoneNumber']?.value.toString()
        );
        break;
    }
  }
}
