import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { ProfileSelectionService } from './services/profile-selection.service';
import { NotificationService } from '../../../shared/components/notification/services/notification.service';

@Component({
  selector: 'app-profile-selection',
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.scss'],
})
export class ProfileSelectionComponent implements OnInit {
  public cards:any[] = [
    {
      name: 'Gestión HV',
      description: 'Repositorio de hojas de vida',
      url: '/underConstruction',
      imagePath: '',
    },
    {
      name: 'Estado procesos',
      description: 'Estado de requisiciones',
      url: '/underConstruction',
      imagePath: '',
    }
  ];
  public API_MASTER_INFO: string = environment.API_MASTER_INFO;

  constructor(
    private router: Router,
    private profileSelectionService: ProfileSelectionService,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    // this.getItemSelection();
  }

  redirect() {
    this.router.navigate(['/home']).then((res) => {
      window.scrollTo({
        top: 10000,
      });
    });
  }


  getItemSelection(){
    this.profileSelectionService.getItemsSelection()
    .then(response => {
      // response.sort((a:any, b:any) => {
      //   return this.sortOrder.indexOf(a.name) - this.sortOrder.indexOf(b.name);
      // });
      this.cards = response;
    })
    .catch(err => this.notificationService.openSimpleSnackBar({title: 'Error', type: 'error', message: 'Error cargando el menú. Vuelve a intentar'}));
  }



}


