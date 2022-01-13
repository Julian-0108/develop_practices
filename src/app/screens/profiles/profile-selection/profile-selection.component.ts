import { Component, OnInit } from '@angular/core';
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
      url: '/manage-resumes',
      imagePath: 'assets/images/Gestion_HV.svg'
    },
    {
      name: 'Estado procesos',
      description: 'Estado de requisiciones',
      url: '/underConstruction',
      imagePath: 'assets/images/Estado_procesos.svg'
    }
  ];
  public API_MASTER_INFO: string = environment.API_MASTER_INFO;

  constructor(
    private profileSelectionService: ProfileSelectionService,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    // this.getItemSelection();
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


