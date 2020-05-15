import { Component, OnInit, Input } from '@angular/core';
import { MicrositesService } from 'src/app/services/microsites/microsites.service';
import { VenuesService } from 'src/app/services/venues/venues.service';
import { OfficeService } from 'src/app/services/office/office.service';
import { FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

const TOAST = Swal.mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 1500,
   showCloseButton:true,
   onOpen: (Toast) => {
       Toast.addEventListener('mouseenter', Swal.stopTimer)
       Toast.addEventListener('mouseleave', Swal.resumeTimer)
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

   selected = null;
   selectedOffice: string = '';
   selectedMicrosite: string = '';

   selectedVenue: string = '';

   showQrInfo = false;

   qrHormiguero: any = null;
   qrHormigueroS: any = null;
   qrKit: any = null;
   myDate: any;

   microsites: any[] = []
   offices: any[] = [];
   venues: any[] = [];

   resultNameMicrosites: any[] = [];
   resultMicrosites: any[] = [];
   resultVenues: any[] = [];
   resultOffices: any[] = [];

   nameMicrosites: any[] = [];
   idMicrosites: any;
   idVenues: any[] = [];

   constructor(
      private micrositesService: MicrositesService,
      private venuesService: VenuesService,
      private officeService: OfficeService,
   ) {}

   ngOnInit() {
      this.getVenues();
   }

   onChangeMicrosite(value: any) {
      this.idMicrosites = value;
   }

   onSubmit() {
      this.showQrInfo = true;
      this.loading = false;
      this.resultNameMicrosites = this.microsites
         .find(
            microsites => microsites['_id'] == this.idMicrosites
         ).nombre;
      this.qrHormiguero = `${this.idMicrosites}` + ':entrada'
      this.qrHormigueroS = `${this.idMicrosites}` + ':salida'
      '7691871286917461976478124124:entrada'
      '7691871286917461976478124124:salida'
      // console.log(this.resultNameMicrosites);
      // console.log(this.qrHormiguero);
      // console.log(this.qrHormigueroS);
   }

   onSubmitKit() {
      this.myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en')
      this.qrKit = `${this.myDate}` + ':kit';
      console.log(this.qrKit);
   }

   onChangeVenue(value: any) {
      // console.log(value);
      this.officeService.getOfficeByVenueId(value).subscribe(
         (data: any) => {
            this.offices = data;

            this.resultOffices = this.offices
            .map(
               (offices) => (offices['_id'])
            );
         // console.log(this.resultOffices);
         }
      )
   }

   onChangeOffice(value: any) {
      // console.log(value);
      this.micrositesService.getMicrositesByOfficeId(value).subscribe(
         (data: any) => {
            this.microsites = data;

            this.resultMicrosites = this.microsites
            .map(
               (microsites) => (microsites['_id'])
            );
         // console.log(this.resultMicrosites);
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
