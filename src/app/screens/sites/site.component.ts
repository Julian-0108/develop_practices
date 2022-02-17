import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { environment } from '@environments/environment';
import { SitesSelectionService } from './services/sites-selection.service';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  public cards:any[] = [
    {
      name: 'Generar QR',
      description: 'Generar QR',
      url: '/generateqr',
      imagePath: ''
    },
    {
      name: 'Kit de salud',
      description: 'Kit de salud',
      url: '/kits',
      imagePath: ''
    },
    {
      name: 'Configuración de tablas',
      description: 'Configuración de tablas',
      url: '/temperature',
      imagePath: ''
    },
    {
      name: 'Movimientos',
      description: 'Movimientos',
      url: '/movements',
      imagePath: ''
    }
  ];
  public API_MASTER_INFO: string = environment.API_MASTER_INFO;

  constructor(
    private sitesSelectionService: SitesSelectionService,
    private notificationService: NotificationService
    ) {}

  ngOnInit(): void {
    // this.getItemSelection();
  }


  getItemSelection(){
    this.sitesSelectionService.getItemsSelection()
    .then(response => {
      // response.sort((a:any, b:any) => {
      //   return this.sortOrder.indexOf(a.name) - this.sortOrder.indexOf(b.name);
      // });
      this.cards = response;
    })
    .catch(err => this.notificationService.openSimpleSnackBar({title: 'Error', type: 'error', message: 'Error cargando el menú. Vuelve a intentar'}));
  }



}
