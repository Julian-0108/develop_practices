import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from './services/home.service';
import { environment } from "@environments/environment";
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('cardsHTML') cardsHTML : ElementRef | undefined;
  @ViewChild('home') home : ElementRef | undefined;

  public cards: any;
  public API_MASTER_INFO = environment.API_MASTER_INFO;

  constructor(private homeService: HomeService, private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
        setTimeout(() => {
          this.viewportScroller.scrollToPosition([0, 10000]);
        }
        );
      });
  }

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

  scrollDown(){
    this.cardsHTML?.nativeElement.scrollIntoView({behavior:'smooth'});
  }

  scrollUp(){
    this.home?.nativeElement.scrollIntoView({behavior:'smooth'});
  }

}
