import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
import { HistoryBaseTeamsService } from './services/history-base-team.service';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

@Component({
  selector: 'app-history-base-teams',
  templateUrl: './history-base-teams.component.html',
  styleUrls: ['./history-base-teams.component.scss'],
})
export class HistoryBaseTeamsComponent implements OnInit {
  endDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  constructor(private historyBaseTeamsService: HistoryBaseTeamsService) {}
  @Input() idHistory: any;
  displayedColumns: string[] = ['name', 'levels'];
  historySelected = '';
  visivility = false;
  dataSource = [];
  historyFilter: any = [];
  existentDate!: string;
  idHistoryassigned!: string;
  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.existentDate = '';
    if (changes.idHistory.currentValue !== undefined) {
      this.idHistoryassigned = changes.idHistory.currentValue._id;
      this.historyBaseTeamsService
        .hitoryActionsManageBaseProfiles('get', this.idHistoryassigned)
        .then((res: any) => {
          this.historyFilter = res.map((item: any) => {
            // delete item.showDate;
            item.updatedAt = dayjs.default(item.updatedAt).format('YYYY-MM-DD');
            item[`showDate`] = this.showDate(item.updatedAt);
            return item;
          });
        });
    }
  }
  /**
   * @author Hanna
   * @description Esta función muestra las fechas en la sección de historial,
   * omitiendo los rangos de fechas que se repitan; a demás de retornarlas en un formato
   * más descriptivo (ejemplo: Febrero 2021).
   */
  showDate(date: string) {
    const dateTransformad = dayjs.default(date).format('YYYY-MM');
    if (this.existentDate !== dateTransformad) {
      this.existentDate = dateTransformad;
      return `${this.monthNames[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
    } else {
      return null;
    }
  }
  /**
   * @author Hanna
   * @description Esta función le da un formato más diciente, a las fechas de
   * la sección de historial. (ejemplo: Febrero 2021)
   */
  setShowDate(filter: any, response: any) {
    return (filter = response.map((item: any) => {
      item.updatedAt = dayjs.default(item.updatedAt).format('YYYY-MM-DD');
      item[`showDate`] = this.showDate(item.updatedAt);
      return item;
    }));
  }
  /**
   * @author Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y como fecha final, la fecha actual por defecto.
   */
  onSelectStartDate(event: any) {
    this.existentDate = '';
    const startDate = dayjs.default(event.value).format('YYYY-MM-DD');
    let endDate: any;
        if (this.formFilterHistory.value.endDate === null) {
          endDate = dayjs.default(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD');
          this.formFilterHistory.get('endDate')?.patchValue(endDate);
        } else {
          endDate = dayjs.default(this.formFilterHistory.value.endDate).format('YYYY-MM-DD');
        }
    this.historyBaseTeamsService
      .hitoryActionsManageBaseProfiles('get', this.idHistoryassigned)
      .then((res: any) => {
        console.log(res);
        this.historyFilter = this.setShowDate(this.historyFilter, res).filter(
          (item: any) =>
            dayjs.default(item.updatedAt).isSameOrAfter(startDate) &&
            dayjs.default(item.updatedAt).isSameOrBefore(endDate)
          // dayjs.default(item.updatedAt).isBetween(startDate, endDate, null, '[]')
        );
        // this.historyFilter = res.map((item: any) => {
        //   item.updatedAt = dayjs.default(item.updatedAt).format('YYYY-MM-DD');
        //   item[`showDate`] = this.showDate(item.updatedAt);
        //   return item;
        // }).filter((item: any) =>
        // {
        //   console.log(dayjs.default(item.updatedAt).isBetween(startDate, endDate, null, '[]'))
        //   return dayjs.default(item.updatedAt).isBetween(startDate, endDate, null, '[]')}
        // );
      });
  }

  /**
   * @author Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y la fecha final digitada.
   */
  onSelectEndDate(event: any) {
    this.existentDate = '';
    const endDate = dayjs.default(event.value).format('YYYY-MM-DD');
    const startDate = dayjs.default(this.formFilterHistory.value.startDate).format('YYYY-MM-DD');
    this.historyBaseTeamsService
      .hitoryActionsManageBaseProfiles('get', this.idHistoryassigned)
      .then((res: any) => {
        this.historyFilter = this.setShowDate(this.historyFilter, res).filter((item: any) =>
        dayjs.default(item.updatedAt).isSameOrAfter(startDate) &&
        dayjs.default(item.updatedAt).isSameOrBefore(endDate)
        );
      });
  }
  onPreview(id: any) {
    this.historySelected = id;
    this.visivility = true;
    this.dataSource = this.historyFilter.filter((el: any) => el._id === id);
  }
  outPreview() {
    this.historySelected = '';
    this.visivility = false;
  }
}
