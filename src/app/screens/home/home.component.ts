import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './services/home.service';
import { environment } from "@environments/environment";
import { Router, RoutesRecognized, Scroll } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('cardsHTML') cardsHTML : ElementRef | undefined;
  @ViewChild('home') home : ElementRef | undefined;

  public cards: any;
  public API_MASTER_INFO = environment.API_MASTER_INFO;
  // sortOrder: any = [];
  sortOrder: any = ['Sitios SETI', 'Perfilamiento', 'Universidad SETI', 'Administrar Recursos'];

  constructor(private homeService: HomeService, private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise()).subscribe((events: RoutesRecognized[]) => {
      if (events[0].urlAfterRedirects !== "/login") {
        this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
          setTimeout(() => {
            this.viewportScroller.scrollToPosition([0, 10000]);
          }
          );
        });
      }else if (events[0].urlAfterRedirects == "/login") {
        this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
          setTimeout(() => {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
          );
        });
      }
    });
  }

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

  scrollDown(){
    this.cardsHTML?.nativeElement.scrollIntoView({behavior:'smooth'});
  }

  scrollUp(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


}
