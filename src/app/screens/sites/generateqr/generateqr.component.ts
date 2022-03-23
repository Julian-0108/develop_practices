import { Component, OnInit } from '@angular/core';
import {ConfigTableServices} from '../configTable/services/configTable.services';
import {FormBuilder,Validators} from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-generateqr',
  templateUrl: './generateqr.component.html',
  styleUrls: ['./generateqr.component.scss']
})

export class GenerateqrComponent implements OnInit {

  qrEntry: string = '';
  qrExit: string = '';
  qrKit: string = '';

  myDate!: string;

  idSites: any;
  sites: any[] = [];
  venues: any[] = [];
  offices: any[] = [];


  constructor(
    private configService:ConfigTableServices,
    private fb:FormBuilder
  ) {}

  general = this.fb.group({
    venue: ['',Validators.required],
    office: ['',Validators.required],
    site: ['',Validators.required]
  })

  ngOnInit() {
    this.getVenues();
  }


  getVenues() {
    this.configService.getListSites('venues').then((venuesInfo:any) => {
      venuesInfo.forEach((element: { name: any; }) => {
        this.venues.push(element.name);
      });
    }).catch((error:any) => console.log(error))
  }

  getOffices(venue:string){
    this.configService.getListSites('Offices').then((officesInfo:any) => {
      this.offices = [];
      this.sites = [];
      this.qrEntry= '';
      this.qrExit= '';
      this.general.get('office')?.setValue('');
      this.general.get('site')?.setValue('');
      officesInfo.forEach((element: { idVenues: { name: string; }; office: any; }) => {
        if(element.idVenues.name === venue){
          this.offices.push(element.office);
        }
      });
    }).catch((error:any) => console.log(error))
  }

  getSites(office:string){
    this.configService.getListSites('sites').then((sitesInfo:any) => {
      this.sites = [];
      this.qrEntry= '';
      this.qrExit= '';
      sitesInfo.forEach((element: { offices: { office: string; }; _id: any; name: any; }) => {
        if(element.offices.office === office){
          this.sites.push({id:element._id,name:element.name});
        }
      });
    });
  }

  fieldsValid(field:string){
    return !this.general.get(field)?.valid && this.general.get(field)?.touched;
  }

  addIdSite(valueSite:any){
    this.general.get('site')?.setValue(valueSite.name);
    this.idSites = valueSite._id;
  }

  generateQr(){
    if(this.general.valid){
      this.qrEntry = `${this.idSites}` + ':entrada';
      this.qrExit = `${this.idSites}` + ':salida';
    }
    // this.qrEntry = `5ec7e1e79b2edecdbf525e8f` + ':entrada'
    // this.qrExit = `5ec7e1e79b2edecdbf525e8f` + ':salida'
  }

  kitQr(){
    this.myDate = formatDate(new Date(), 'yyyy-MM-dd-h:mm-a', 'en');
    this.qrKit = `${this.myDate}` + ':kit';
  }

}
