import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ManageProfileService } from './services/manage-profile.service';
import { Master } from '@shared/interfaces/master.interface';
import { environment } from '@environments/environment';
import { NotificationService } from '../../../shared/components/notification/services/notification.service';
import { Router } from '@angular/router';
import { Location, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-adminprofiles',
  templateUrl: './adminprofiles.component.html',
  styleUrls: ['./adminprofiles.component.scss']
})
export class AdminprofilesComponent implements OnInit {
  public cards!: Master[];
  public API_MASTER_INFO: string = environment.API_MASTER_INFO;
  constructor(
    private titleService: Title,
    private manageProfileService: ManageProfileService,
    private notificationService: NotificationService,
    private router: Router,
    private loc: Location, 
    private viewportScroller: ViewportScroller
  ) {
    this.titleService.setTitle('Mundo SETI - administrar perfiles');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.manageProfileService.getData()
    .then( response => this.cards = response)
    .catch( err => this.notificationService.openSimpleSnackBar({ title: 'Error', type: 'error', message: 'Error cargando el menú. Vuelve a intentar'}));
  }

  //import { Location} from '@angular/common';
  //private loc: Location
  redirect(){
    this.router.navigate(['/home']).then(
      (res) => {
        window.scrollTo(0, 10000)
      }
    );
  }

}
