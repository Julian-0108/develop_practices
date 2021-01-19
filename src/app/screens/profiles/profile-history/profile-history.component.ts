import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss'],
})
export class ProfileHistoryComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  constructor() {}
  historyId!: string;
  existentDate!: string;

  history = [
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2021-01-13',
      id: 'id1',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2021-01-15',
      id: 'id2',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-09-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-09-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '1920-09-12',
      id: 'id3',
    },
  ];

  ngOnInit(): void {
    this.history.sort((a, b) => (a.date < b.date) ? 1 : -1)
    this.historyId = this.history[0].id;
  }

  onStepClicked(id: any) {
    this.historyId = this.history[id.selectedIndex].id;
  }

  showDate(date: string) {
    const dateTransformad = `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}`;
    if (this.existentDate !== dateTransformad ) {
      this.existentDate = dateTransformad;
      return this.onTransformDate(date)
    } else {
      return null
    }
  }

  onTransformDate(date: string){
    switch (new Date(date).getMonth() + 1) {
      case 1:
        return `Enero ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 2:
        return `Febrero ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 3:
        return `Marzo ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 4:
        return `Abril ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 5:
        return `Mayo ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 6:
        return `Junio ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 7:
        return `Julio ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 8:
        return `Agosto ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 9:
        return `Septiembre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 10:
        return `Octubre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 11:
        return `Noviembre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      case 12:
        return `Diciembre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(date).getFullYear()}`;
      default:
        break;
    }
  }
}
