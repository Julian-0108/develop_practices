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
      url: '/generate-qr',
      imagePath: 'assets/images/dibujo mundo seti (generar qr).svg'
    },
    {
      name: 'Kits',
      description: 'Reportes de Kits',
      url: '/kits',
      imagePath: 'assets/images/reporte movimientos kit.svg'
    },
    {
      name: 'Configuración de tablas',
      description: 'Configuración de tablas',
      url: '/config-table',
      imagePath: 'assets/images/Confugiracion de tablas.svg'
    },
    {
      name: 'Movimientos',
      description: 'Movimientos',
      url: '/movements',
      imagePath: 'assets/images/Movimientos.svg'
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
