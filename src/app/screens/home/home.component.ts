import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scroll(){
    document.getElementById('cards')?.scrollIntoView({behavior:'smooth'});
  }

  public cards: any[] = [
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
