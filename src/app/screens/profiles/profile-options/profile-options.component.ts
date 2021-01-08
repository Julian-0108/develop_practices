import { Component, OnInit, HostListener, Directive } from '@angular/core';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileOptionsService } from './services/profile-options.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {
  title = 'Equipos Base';
  cardClicked = '';
  optionClicked = '';
  showBackButton = false;
  description =
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Maxime, consequuntur assumenda';
  itemsOld: any = [];
  items: any;
  rowsArray: any;
  // items = [
  //   {
  //     id: 'card1',
  //     title: 'Talento Humano',
  //     content: [
  //       { profile: 'Profesional en Formación', levels: [], id: 'btn1' },
  //       { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btn2' },
  //       { profile: 'Consultor Especialista', levels: ['N1'], id: 'btn3' },
  //       { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btn4' },
  //     ],
  //     image: '../../../assets/images/baseTeams_talentoHumano.svg',
  //   },
  //   {
  //     id: 'card2',
  //     title: 'Negocios',
  //     content: [
  //       { profile: 'Profesional en Formación', levels: [], id: 'btn5' },
  //       { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btn6' },
  //       { profile: 'Consultor Especialista', levels: ['N1'], id: 'btn7' },
  //       { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btn8' },
  //     ],
  //     image: '../../../assets/images/baseTeams_negocios.svg',
  //   },
  //   {
  //     id: 'card3',
  //     title: 'Operación',
  //     sections: [
  //       {
  //         title: 'Desarrollo',
  //         id: 'cardOp1',
  //         content: [
  //           { profile: 'Profesional en Formación', levels: [], id: 'btnOp1' },
  //           { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btnOp2' },
  //           { profile: 'Consultor Especialista', levels: ['N1', 'N2', 'N3'], id: 'btnOp3' },
  //           { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btnOp4' },
  //         ],
  //         image: '../../../assets/images/baseTeams_operDesarrollo.svg',
  //       },
  //       {
  //         title: 'Bases de Datos',
  //         id: 'cardOp2',
  //         content: [
  //           { profile: 'Profesional en Formación', levels: [], id: 'btnOp5' },
  //           { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btnOp6' },
  //           { profile: 'Consultor Especialista', levels: ['N1'], id: 'btnOp7' },
  //           { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btnOp8' },
  //         ],
  //         image: '../../../assets/images/baseTeams_operBaseDat.svg',
  //       },
  //       {
  //         title: 'Sistema Operativo',
  //         id: 'cardOp3',
  //         content: [
  //           { profile: 'Profesional en Formación', levels: [], id: 'btnOp9' },
  //           { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btnOp10' },
  //           { profile: 'Consultor Especialista', levels: ['N1'], id: 'btnOp11' },
  //           { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btnOp12' },
  //         ],
  //         image: '../../../assets/images/baseTeams_operSisOper.svg',
  //       },
  //       {
  //         title: 'Aplicaciones',
  //         id: 'cardOp4',
  //         content: [
  //           { profile: 'Profesional en Formación', levels: [], id: 'btnOp13' },
  //           { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btnOp14' },
  //           { profile: 'Consultor Especialista', levels: ['N1'], id: 'btnOp15' },
  //           { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btnOp16' },
  //         ],
  //         image: '../../../assets/images/baseTeams_operAplicaciones.svg',
  //       },
  //       {
  //         title: 'Nube',
  //         id: 'cardOp5',
  //         content: [
  //           { profile: 'Profesional en Formación', levels: [], id: 'btnOp17' },
  //           { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btnOp18' },
  //           { profile: 'Consultor Especialista', levels: ['N1'], id: 'btnOp19' },
  //           { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btnOp20' },
  //         ],
  //         image: '../../../assets/images/baseTeams_operNube.svg',
  //       },
  //       {
  //         title: 'DevOps',
  //         id: 'cardOp6',
  //         content: [
  //           { profile: 'Profesional en Formación', levels: [], id: 'btnOp21' },
  //           { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btnOp22' },
  //           { profile: 'Consultor Especialista', levels: ['N1'], id: 'btnOp23' },
  //           { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btnOp24' },
  //         ],
  //         image: '../../../assets/images/baseTeams_operDevops.svg',
  //       },
  //     ],

  //     image: '../../../assets/images/baseTeams_operacion.svg',
  //   },
  //   {
  //     id: 'card4',
  //     title: 'Gobierno Corporativo',
  //     content: [
  //       { profile: 'Profesional en Formación', levels: [], id: 'btn9' },
  //       { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btn10' },
  //       { profile: 'Consultor Especialista', levels: ['N1'], id: 'btn11' },
  //       { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btn12' },
  //     ],
  //     image: '../../../assets/images/baseTeams_gobiernoCorp.svg',
  //   },
  //   {
  //     id: 'card5',
  //     title: 'Transformación',
  //     content: [
  //       { profile: 'Profesional en Formación', levels: [], id: 'btn9' },
  //       { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btn10' },
  //       { profile: 'Consultor Especialista', levels: ['N1'], id: 'btn11' },
  //       { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btn12' },
  //     ],
  //     image: '../../../assets/images/baseTeams_transformacion.svg',
  //   },
  //   {
  //     id: 'card6',
  //     title: 'Administrativo',
  //     content: [
  //       { profile: 'Profesional en Formación', levels: [], id: 'btn9' },
  //       { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btn10' },
  //       { profile: 'Consultor Especialista', levels: ['N1'], id: 'btn11' },
  //       { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btn12' },
  //     ],
  //     image: '../../../assets/images/baseTeams_administrativo.svg',
  //   },
  //   {
  //     id: 'card7',
  //     title: 'TI',
  //     content: [
  //       { profile: 'Profesional en Formación', levels: [], id: 'btn9' },
  //       { profile: 'Consultor Junior', levels: ['N1', 'N2', 'N3'], id: 'btn10' },
  //       { profile: 'Consultor Especialista', levels: ['N1'], id: 'btn11' },
  //       { profile: 'Consultor Senior', levels: ['N1', 'N2'], id: 'btn12' },
  //     ],
  //     image: '../../../assets/images/baseTeams_TI.svg',
  //   },
  // ];
  constructor(
    private notificationService: NotificationService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public profileOptionsService: ProfileOptionsService
  ) {
    this.matIconRegistry.addSvgIcon(
      'arrow_back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/arrow_back.svg')
    );
  }

  ngOnInit() {
    this.getBaseTeams();
  }

  onCardClicked(item: any) {
    this.cardClicked = item._id;
    if (item.sections) {
      this.itemsOld = this.items;
      this.items = item.sections;
      this.showBackButton = true;
      // this.show = !this.show;
    }
  }
  // onCardClicked(item: any) {
  //   this.cardClicked = item.id;
  //   if (item.sections) {
  //     this.itemsOld = this.items;
  //     this.items = item.sections;
  //     this.showBackButton = true;

  //   }
  // }

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
    finalArray = [...finalArray, newarray];
    this.rowsArray = finalArray;
  }

  async getBaseTeams() {
    this.items = await this.profileOptionsService.getBaseTeams();
    this.buildRows(this.items);
  }

  onClickbuttonBack() {
    this.items = this.itemsOld;
    this.showBackButton = false;
  }

  success() {
    const option = {
      title: 'Success',
      message: 'Error message',
      type: 'success',
    };
    this.notificationService
      .openSimpleSnackBar(option)
      .afterDismissed()
      .subscribe(() => {
        console.log('Alguna acción');
      });
  }
  error() {
    const option = {
      title: 'Titulo del mensaje',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
      type: 'info',
      action: 'Confirmar',
    };
    this.notificationService
      .openComplexSnackBar(option)
      .afterClosed()
      .subscribe((resp) => {
        console.log(resp);
      });
  }
  warning() {
    const option = {
      title: 'Warning',
      message: 'Error message',
      type: 'warning',
    };
    this.notificationService.openSimpleSnackBar(option);
  }
  info() {
    const option = {
      title: 'Info',
      message: 'Error message',
      type: 'info',
    };
    this.notificationService.openSimpleSnackBar(option);
  }
}
