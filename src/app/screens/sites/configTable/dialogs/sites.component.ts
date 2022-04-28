import { Component, Inject, OnInit, QueryList } from '@angular/core';
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
      [Validators.required, Validators.min(1000000000), Validators.max(9999999999)],
    ],
    city: ['', Validators.required],
    status: [false, Validators.required],
  });

  formSites = this.fg.group({
    idOffices: [''],
    name: ['', Validators.required],
    nameOffice: [''],
    capacity: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
    status: [false, Validators.required],
  });

  formOffices = this.fg.group({
    idVenues: [''],
    nameVenues: [''],
    office: ['', Validators.required],
    floor: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
    capacity: ['', [Validators.required, Validators.min(1), Validators.max(999)]],
    status: [false, Validators.required],
  });
  formKits = this.fg.group({
    name: ['', Validators.required],
    status: [false, Validators.required],
  });
  dataRegister: any;
  venues: any[] = [];
  offices: any[] = [];

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
  ) { }

  ngOnInit(): void {
    this.activateForm();
    this.formValue();
  }

  async formValue() {
    if (this.data.add == false) {
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
        case 'Kits':
          this.formKits.patchValue(this.data.dataSite);
          break;
      }
      this.sites = this.data.dataSite.status;
      if (this.subtitle == 'Oficinas') {
        this.formOffices.get('nameVenues')?.setValue(this.data.dataSite.idVenues.name);
      } else if (this.subtitle == 'Sitios') {
        this.formSites.get('nameOffice')?.setValue(this.data.dataSite.offices.office);
      }
    }
    await this.getVenuesOffice('venues');
    await this.getVenuesOffice('offices');
  }
  activateForm() {
    switch (this.subtitle) {
      case 'Oficinas':
        this.formSites.disable({ onlySelf: true });
        this.formVenues.disable({ onlySelf: true });
        this.formKits.disable({ onlySelf: true });
        break;
      case 'Sitios':
        this.formOffices.disable({ onlySelf: true });
        this.formVenues.disable({ onlySelf: true });
        this.formKits.disable({ onlySelf: true });
        break;
      case 'Sedes':
        this.formOffices.disable({ onlySelf: true });
        this.formSites.disable({ onlySelf: true });
        this.formKits.disable({ onlySelf: true });
        break;
      case 'Kits':
        this.formOffices.disable({ onlySelf: true });
        this.formSites.disable({ onlySelf: true });
        this.formVenues.disable({ onlySelf: true });
        break;
    }
  }
  getVenuesOffice(url: string) {
    this.service.getList(url).then((dataValue) => {
      if (dataValue.length > 0) {
        if (url === 'offices') {
          this.offices = dataValue;
        } else {
          this.venues = dataValue;
        }
      }
    });
  }

  changeName(_id: string, type: string) {
    type === "oficce" ? this.formOffices.get('nameVenues')?.setValue(this.venues?.filter((element => element._id === _id))[0]?.name) :
      this.formSites.get('nameOffice')?.setValue(this.offices?.filter((element => element._id === _id))[0]?.office);
      console.log(this.formOffices.get('nameVenues')?.value,this.formSites.get('nameOffice')?.value)
  }

  getListVenues(value: any) {
    this.formOffices.get('idVenues')?.setValue(value._id);
  }
  getListOffice(value: any) {
    this.formSites.get('idOffices')?.setValue(value._id);
  }

  updateSites(form: FormGroup) {
    this.formOffices.removeControl('nameVenues');
    this.formSites.removeControl('nameOffice');

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
        this.formVenues
          .get('phoneNumber')
          ?.patchValue(this.formVenues.get('phoneNumber')?.value.toString());
        this.data.add ? this.addRegister(this.formVenues) : this.updateSites(this.formVenues);
        break;
      case 'Kits':
        this.data.add ? this.addRegister(this.formKits) : this.updateSites(this.formKits);
        break;
    }
  }
}
