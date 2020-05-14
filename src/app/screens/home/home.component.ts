import { Component, OnInit, Input } from '@angular/core';
import { MicrositesService } from 'src/app/services/microsites/microsites.service';
import { VenuesService } from 'src/app/services/venues/venues.service';
import { OfficeService } from 'src/app/services/office/office.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      private fb: FormBuilder,
      // public form: FormGroup
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
      .find(microsites => microsites['_id'] == this.idMicrosites).nombre;
      console.log(this.resultNameMicrosites);
      this.qrHormiguero = `${this.idMicrosites}` + ':entrada'
      this.qrHormigueroS = `${this.idMicrosites}` + ':salida'
   // console.log(this.qrHormiguero);
   // console.log(this.qrHormigueroS);
   }

   onChangeVenue(value: any) {

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

   onChangeOffice(value: any) {

      console.log(value);

      this.micrositesService.getMicrositesByOfficeId(value).subscribe(
         (data: any) => {
            this.microsites = data;

            this.resultMicrosites = this.microsites
            .map(
               (microsites) => (microsites['_id'])
            );
         console.log(this.resultMicrosites);
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
         console.log(this.resultVenues);
      });
   }

   // getMicrosites() {
   //    this.micrositesService.getMicrositeList().subscribe((data: any) => {
   //       this.microsites = data;

   //       this.resultMicrosites = this.microsites
   //          .map(
   //             (microsites) => (microsites['nombre'])
   //          );
   //    });
   // }

}
