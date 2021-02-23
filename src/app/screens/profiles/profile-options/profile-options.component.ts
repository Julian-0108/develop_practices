import { Component, OnInit, HostListener, Directive, ElementRef } from '@angular/core';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileOptionsService } from './services/profile-options.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { newArray } from '@angular/compiler/src/util';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {
  public API_MASTER_INFO: string = environment.API_MASTER_INFO;
  showBackButton = false;
  title = 'Habilidades';
  cardClicked = '';
  optionClicked = '';
  description =
    'Habilidades, capacidades, competencias y talentos necesarios para el desarrollo de funciones.';
  itemsOld: any = [];
  items: any = [];
  rowsArray: any;
  // PAGINACION
  pageNumber = 1;
  pageSize = 8;
  results: any[] = [];
  pagination: any;
  pageCont: any;
  buttonNext: boolean = false;
  buttonPrevius: boolean = false;
  pageContArr: any = [];

  constructor(
    private notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public profileOptionsService: ProfileOptionsService,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIcon(
      'arrow_back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/arrow_back.svg')
    );
  }

  ngOnInit() {
    this.getBaseTeams();
  }

  async onCardClicked(item: any) {
    this.cardClicked = item._id;
    if (item.submenu) {
      this.itemsOld = this.items;
      this.items = await this.profileOptionsService.getSubBaseTeams(
        item.name.substring(0, 2).toUpperCase()
      );
      // this.buildRows(this.items);
      this.paginate();
      this.showBackButton = true;
      this.title = 'Habilidades de Operación';
    }
  }

  /**
   * @author Hanna
   * @description crea arreglos de filas que limita el numero de resultados por fila
   */
  buildRows(items: any) {
    let newarray: any = [];
    let finalArray: any = [];
    items.forEach((element: any) => {
      newarray = [...newarray, element];
      if (newarray.length === 4) {
        finalArray = [...finalArray, newarray];
        newarray = [];
      }
    });
    if (newarray.length !== 0) {
      finalArray = [...finalArray, newarray];
    }
    this.rowsArray = finalArray;
  }

  async getBaseTeams() {
    this.items = await this.profileOptionsService.getBaseTeams();
    this.paginate();
  }

  onClickbuttonBack() {
    this.items = this.itemsOld;
    // this.buildRows(this.itemsOld);
    this.pageNumber=1;
    this.paginate();
    this.showBackButton = false;
    this.title = 'Habilidades';
  }

  // success() {
  //   const option = {
  //     title: 'Success',
  //     message: 'Error message',
  //     type: 'success',
  //   };
  //   this.notificationService
  //     .openSimpleSnackBar(option)
  //     .afterDismissed()
  //     .subscribe(() => {});
  // }
  // error() {
  //   const option = {
  //     title: 'Titulo del mensaje',
  //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  //     type: 'info',
  //     action: 'Confirmar',
  //   };
  //   this.notificationService
  //     .openComplexSnackBar(option)
  //     .afterClosed()
  //     .subscribe((resp) => {});
  // }
  // warning() {
  //   const option = {
  //     title: 'Warning',
  //     message: 'Error message',
  //     type: 'warning',
  //   };
  //   this.notificationService.openSimpleSnackBar(option);
  // }
  // info() {
  //   const option = {
  //     title: 'Info',
  //     message: 'Error message',
  //     type: 'info',
  //   };
  //   this.notificationService.openSimpleSnackBar(option);
  // }

  /**
   * @author Wilmer
   * @description pagina los datos recividos del servicio para mostrar 8 resultador por paginación.
   */
  // PAGINACION
  paginate() {
    this.pageCont = Math.ceil(this.items.length / this.pageSize); // calcular el numero de paginaciones totales
    this.results = this.items.slice(
      (this.pageNumber - 1) * this.pageSize,
      this.pageNumber * this.pageSize
    ); // calular los items que se van a mostrar por paginacion

    this.pageNumber > 1 ? (this.buttonPrevius = true) : (this.buttonPrevius = false); // mostrar boton anterior
    this.pageNumber < this.pageCont ? (this.buttonNext = true) : (this.buttonNext = false); // mostrar boton siguiente

    this.buildRows(this.results); // mostrar los resultados de la paginacion
    this.pageContArr = Array.from(new Array(this.pageCont), (x, i) => i + 1); // convertir pageCont en array
  }

  nextPage() {
    this.pageNumber++;
    this.paginate();
  }

  previusPage() {
    this.pageNumber--;
    this.paginate();
  }

  redirectToTemplateProfile(charge: any,idProfile: any = [], level?: string) {
    const id = idProfile.find((el: any) => (el.level === level && el.charge === charge) || el.charge === charge)
    this.router.navigate([`/profile-template/${id._id}`]);
  }
}
