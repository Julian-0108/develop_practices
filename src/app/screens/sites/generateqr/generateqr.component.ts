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
  idKit: any;
  sites: any[] = [];
  venues: any[] = [];
  offices: any[] = [];
  kit: any[] = [];
  kitName:string="";
  siteInfo: any;
  site:string="";

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
    this.siteInfo = valueSite;
    this.general.get('site')?.setValue(valueSite.name);
  }

  getNameKit(){
    return this.kit.filter((kit:any)=>kit._id===this.generalkit.get('kits')?.value)[0]?.name
  }

  generateQr() {
    if (this.general.valid) {
      this.site = this.general.get('site')?.value;
      this.qrEntry = `${this.siteInfo.id}:entrada`;
      this.qrExit = `${this.siteInfo.id}:salida`;
    }
  }

  kitQr() {
    if (this.generalkit.valid) {
      this.idKit = `${this.generalkit.get('kits')?.value}:kit`;
      this.kitName=this.getNameKit();
    }
  }
}
