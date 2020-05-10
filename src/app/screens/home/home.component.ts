import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MicrositesService } from 'src/app/services/microsites/microsites.service';
import { VenuesService } from 'src/app/services/venues/venues.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedVenue: string ='';


  showQrInfo = false;

	public qrHormiguero: any = null;
	public qrHormigueroS: any = null;

  form: FormGroup;

  public microsites: any[] = []
  public resultMicrosites: any[] = [];
  public resultNameMicrosites: any[] = [];
  public nameMicrosites: any[] = [];
  public idMicrosites: any;
  public venues: any[] = []
  public idVenues: any[] = [];

  json: any

	constructor(
		private fb: FormBuilder,
		private micrositesService: MicrositesService,
		private venuesService: VenuesService
	) {
	}

	ngOnInit() {
		// this.form = this.fb.group({
		// 	venue: ['', Validators.required],
    // });
    this.getVenues();
    this.getMicrosites();
	}

	onSubmit(form: FormGroup) {
    this.idMicrosites = this.resultMicrosites[0].id;
    this.showQrInfo = true;
    this.qrHormiguero = `${this.idMicrosites}` + ':entrada'
    this.qrHormigueroS = `${this.idMicrosites}` + ':salida'
    // console.log(this.qrHormiguero);
    // console.log(this.qrHormigueroS);
	}

	getVenues() {
		this.venuesService.getVenueList().subscribe((data: any) => {
			this.venues = data;
		});
  }

  getMicrosites() {
		this.micrositesService.getMicrositeList().subscribe((data: any) => {
      this.microsites = data;
      this.resultMicrosites = this.microsites.map(function (microsites) { return {"id": microsites['_id']} });
      this.resultNameMicrosites = this.microsites.map(function (microsites) { return {"name": microsites['nombre']} });
      this.idMicrosites = this.resultMicrosites[0].id;
      this.nameMicrosites = this.resultNameMicrosites[0].name;
      // console.log(this.nameMicrosites);
      return this.idMicrosites, this.nameMicrosites
		});
  }

}
