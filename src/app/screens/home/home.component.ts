import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('cardsHTML') cardsHTML : ElementRef | undefined;
  public cards: any;

  constructor() { 
    this.cards = [
      {
        img: '../../../assets/images/Logo-seti.png',
        tittle: 'Sitios Seti',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, consequuntur assumenda'
      },
      {
        img: '../../../assets/images/Logo-seti.png',
        tittle: 'Perfilamiento',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, consequuntur assumenda'
      }
    ];
  }

  ngOnInit(): void {

  }

  scroll(){
    this.cardsHTML?.nativeElement.scrollIntoView({behavior:'smooth'});
    /*document.getElementById('cards')?.scrollIntoView({behavior:'smooth'});*/
  }


}
