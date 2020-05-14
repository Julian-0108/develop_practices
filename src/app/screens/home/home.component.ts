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

  selected = null;
  selectedOffice = null;
  selectedMicrosite = null;

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

	constructor (
		private micrositesService: MicrositesService,
    private venuesService: VenuesService,
    private officeService:  OfficeService,
    private fb: FormBuilder,
    // public form: FormGroup
	) {}

	ngOnInit() {
    this.getVenues();
    this.getMicrosites();
    this.getOffices();

    // this.form = this.fb.group({
    //   venue: '',
    //   office: '',
    // })

  }

	onSubmit() {


    // this.idMicrosites = this.resultMicrosites[0].id;
    // this.showQrInfo = true;
    // this.qrHormiguero = `${this.idMicrosites}` + ':entrada'
    // this.qrHormigueroS = `${this.idMicrosites}` + ':salida'
    // console.log(this.qrHormiguero);
    // console.log(this.qrHormigueroS);
  }

  onChange(value: any) {
    console.log(value);
  }

	getVenues() {
		this.venuesService.getVenueList().subscribe((data: any) => {
      this.venues = data;
      this.resultVenues = this.venues
        .map(
          (venues) => (venues['_id'])
        );
      console.log({venues: this.resultVenues});
		});
  }

  getOffices() {
    this.officeService.getOfficeList().subscribe((data: any) => {
      this.offices = data;

      this.resultOffices = this.offices
        .map(
          (offices) => (offices['_id'])
        );
      console.log({offices: this.resultOffices});
    })
  }

  getMicrosites() {
		this.micrositesService.getMicrositeList().subscribe((data: any) => {
      this.microsites = data;

      this.resultMicrosites = this.microsites
        .map(
          (microsites) => (microsites['_id'])
        );

      this.resultNameMicrosites = this.microsites
        .map(
          (microsites) => (microsites['nombre'])
        );

      this.idMicrosites = this.resultMicrosites[0].id;
      this.nameMicrosites = this.resultNameMicrosites[0].name;
      // console.log(this.nameMicrosites);
      return this.idMicrosites, this.nameMicrosites
		});
  }

}
