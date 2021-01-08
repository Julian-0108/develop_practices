import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './services/home.service';
import { environment } from "@environments/environment";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('cardsHTML') cardsHTML : ElementRef | undefined;
  public cards: any;
  public API_MUNDO_SETI = environment.API_MUNDO_SETI;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getModules();
  }

  getModules(): void {
    this.homeService.getModules()
    .then( res => {
      this.cards = res;
    })
    .catch(err => console.log(err))
  }

  scroll(){
    this.cardsHTML?.nativeElement.scrollIntoView({behavior:'smooth'});
  }


}
