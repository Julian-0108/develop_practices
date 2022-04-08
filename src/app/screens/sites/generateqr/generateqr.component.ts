import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SitesService } from './services/sites/sites.service';
import { OfficeService } from './services/office/office.service';
import { VenuesService } from './services/venues/venues.service';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { KitService } from './services/kit/kit.service';

@Component({
  selector: 'app-generateqr',
  templateUrl: './generateqr.component.html',
  styleUrls: ['./generateqr.component.scss'],
})
export class GenerateqrComponent implements OnInit {
  qrEntry: string = '';
  qrExit: string = '';
  myDate!: string;
  idSites: any;
  idKit: any;
  sites: any[] = [];
  venues: any[] = [];
  offices: any[] = [];
  kit: any[] = [];

  constructor(
    private serviceSites: SitesService,
    private serviceOffices: OfficeService,
    private serviceVenues: VenuesService,
    private serviceKit: KitService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {}

  general = this.fb.group({
    venue: ['', Validators.required],
    office: ['', Validators.required],
    site: ['', Validators.required],
  });
  generalkit = this.fb.group({
    kits: ['', Validators.required],
  });

  ngOnInit() {
    this.getVenues();
    this.getKit();
  }

  getVenues() {
    this.idKit = '';
    this.serviceVenues
      .getListVenues()
      .then((venuesInfo: any) => {
        venuesInfo.forEach((element: { name: any }) => {
          this.venues.push(element.name);
        });
        if (this.venues.length === 0) {
          this.notificationService.openSimpleSnackBar({
            title: 'Sin registros',
            message: 'No se encontraron sedes',
            type: 'info',
          });
        }
      })
      .catch((error: any) => console.log(error));
  }

  getOffices(venue: string) {
    this.qrEntry = '';
    this.qrExit = '';
    this.serviceOffices
      .getListOffices()
      .then((officesInfo: any) => {
        this.offices = [];
        this.sites = [];
        this.general.get('office')?.setValue('');
        this.general.get('site')?.setValue('');
        officesInfo.forEach((element: { idVenues: { name: string }; office: any }) => {
          if (element.idVenues.name === venue) {
            this.offices.push(element.office);
          }
        });
        if (this.offices.length === 0) {
          this.notificationService.openSimpleSnackBar({
            title: 'Sin registros',
            message: `No se encontraron oficinas segun la sede ${venue}`,
            type: 'info',
          });
        }
      })
      .catch((error: any) => console.log(error));
  }

  getSites(office: string) {
    this.qrEntry = '';
    this.qrExit = '';
    this.serviceSites
      .getListSites()
      .then((sitesInfo: any) => {
        this.sites = [];
        sitesInfo.forEach((element: { offices: { office: string }; _id: any; name: any }) => {
          if (element.offices.office === office) {
            this.sites.push({ id: element._id, name: element.name });
          }
        });
        if (this.sites.length === 0) {
          this.notificationService.openSimpleSnackBar({
            title: 'Sin registros',
            message: `No se encontraron sitios segun la oficina ${office}`,
            type: 'info',
          });
        }
      })
      .catch((error: any) => console.log(error));
  }
  getKit() {
    this.serviceKit.getListKit().then((kitInfo: any) => {
      this.kit = kitInfo;
      if (this.kit.length === 0) {
        this.notificationService.openSimpleSnackBar({
          title: 'Sin registros',
          message: 'No se encontraron kits',
          type: 'info',
        });
      }
    });
  }

  fieldsValid(field: string) {
    return !this.general.get(field)?.valid && this.general.get(field)?.touched;
  }
  fieldsValidKit(field: string) {
    return !this.generalkit.get(field)?.valid && this.generalkit.get(field)?.touched;
  }

  addIdSite(valueSite: any) {
    this.general.get('site')?.setValue(valueSite.name);
    this.idSites = valueSite.id;
  }

  generateQr() {
    if (this.general.valid) {
      this.qrEntry = `${this.idSites}` + ':entrada';
      this.qrExit = `${this.idSites}` + ':salida';
    }
    // this.qrEntry = `5ec7e1e79b2edecdbf525e8f` + ':entrada'
    // this.qrExit = `5ec7e1e79b2edecdbf525e8f` + ':salida'
  }

  kitQr() {
    if (this.generalkit.valid) {
      this.idKit = `${this.generalkit.get('kits')?.value}` + ':kit';
    }
  }
}
