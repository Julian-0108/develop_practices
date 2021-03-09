import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './services/home.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
<<<<<<< HEAD
  @ViewChild('cardsHTML') cardsHTML: ElementRef | undefined;
=======

  @ViewChild('cardsHTML') cardsHTML : ElementRef | undefined;
  @ViewChild('home') home : ElementRef | undefined;

>>>>>>> fdc6e50f3c1f9b596b401eba8b1296434af0c237
  public cards: any;
  public API_MASTER_INFO = environment.API_MASTER_INFO;
  // sortOrder: any = [];
  sortOrder: any = ['Sitios SETI', 'Perfilamiento', 'Universidad SETI', 'Administrar Recursos'];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getModules();
  }

  getModules(): void {
    this.homeService
      .getModules()
      .then((res) => {
        res.sort((a: any, b: any) => {
          return this.sortOrder.indexOf(a.name) - this.sortOrder.indexOf(b.name);
        });
        this.cards = res;
      })
      .catch((err) => console.log(err));
  }

<<<<<<< HEAD
  scroll() {
    this.cardsHTML?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
=======
  scrollDown(){
    this.cardsHTML?.nativeElement.scrollIntoView({behavior:'smooth'});
  }

  scrollUp(){
    this.home?.nativeElement.scrollIntoView({behavior:'smooth'});
  }

>>>>>>> fdc6e50f3c1f9b596b401eba8b1296434af0c237
}
