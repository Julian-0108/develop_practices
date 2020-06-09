import { Component, OnInit } from '@angular/core';
import { SitesService } from './services/sites/sites.service';
import { VenuesService } from './services/venues/venues.service';
import { OfficeService } from './services/office/office.service';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

const TOAST = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  showCloseButton: true,
  onOpen: (TOAST) => {
    TOAST.addEventListener('mouseenter', Swal.stopTimer)
    TOAST.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  disabled: boolean = true
  loading: boolean = false
  showQrInfo: boolean = false;

  selectedVenue: string = '';
  selectedOffice: string = '';
  selectedMicrosite: string = '';

  qrHormiguero: string = '';
  qrHormigueroS: string = '';
  qrKit: string = '';
  myDate: any;

  venues: any[] = [];
  offices: any[] = [];
  sites: any[] = [];

  resultNameSites: any[] = [];
  resultSites: any[] = [];
  resultVenues: any[] = [];
  resultOffices: any[] = [];

  idSites: any;

  constructor(
    private venuesService: VenuesService,
    private officeService: OfficeService,
    private sitesService: SitesService,
  ) {}

  ngOnInit() {
    this.getVenues();
  }

  onChangeSite(value: string) {
    this.idSites = value;
  }

  onSubmit() {
    this.showQrInfo = true;
    this.loading = false;
    this.resultNameSites = this.sites
      .find(sites => sites['_id'] == this.idSites).nombre;
    this.qrHormiguero = `${this.idSites}` + ':entrada'
    this.qrHormigueroS = `${this.idSites}` + ':salida'
    // console.log(this.resultNameSites);
    // console.log(this.qrHormiguero);
    // console.log(this.qrHormigueroS);
  }

  onSubmitKit() {
    this.myDate = formatDate(new Date(), 'yyyy-MM-dd-h:mm-a', 'en')
    this.qrKit = `${this.myDate}` + ':kit';
    // console.log(this.qrKit);
  }

  onChangeVenue(value: string) {
    console.log(value);
    this.officeService.getOfficeByVenueId(value).subscribe(
      (data: any) => {
        this.offices = data;

        this.resultOffices = this.offices
          .map(
            (offices) => (offices['_id'])
          );
        console.log(this.resultOffices);
      }
    )
  }

  onChangeOffice(value: string) {
    console.log(value);
    this.sitesService.getSitesByOfficeId(value).subscribe(
      (data: any) => {
        this.sites = data;

        this.resultSites = this.sites
          .map(
            (sites) => (sites['_id'])
          );
        console.log(this.resultSites);
      }
    )
  }

  getVenues() {
    this.venuesService.getVenueList().subscribe((data: any) => {
      this.venues = data;
      this.resultVenues = this.venues
        .map(
          (venues) => (venues['_id'])
        );
      // console.log(this.resultVenues);
    });
  }

}
