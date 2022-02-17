import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { HistoryMastersService } from './service/history-master.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomHistoryComponent } from './custom-history/custom-history.component';
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

@Component({
  selector: 'app-history-master',
  templateUrl: './history-master.component.html',
  styleUrls: ['./history-master.component.scss'],
})
export class HistoryMasterComponent implements OnInit {
  endDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  historyFilter: any = [];
  dataSource = [];
  historySelected = '';
  visivility = false;
  existentDate!: string;
  displayedColumns: string[] = [
    'domain',
    'knowledgeArea',
    'specificKnowledge',
    'name',
    'description',
    'type',
    'master',
  ];
  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
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

  constructor(private historyMastersService: HistoryMastersService, private _dialog: MatDialog) {}
  @Input() idHistory: any;
  @Input() masterSeleted: any;
  idHistoryassigned!: any;
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {

    this.existentDate = '';
    if (changes.idHistory) {
      if (changes.idHistory.currentValue !== undefined) {
        this.idHistoryassigned = changes.idHistory.currentValue._id;
        this.historyMastersService
          .hitoryActionsAdminMaster('get', this.idHistoryassigned)
          .then((res: any) => {
            this.historyFilter = res.map((item: any) => {
              item.updatedAt = dayjs.default(item.updatedAt).format('YYYY-MM-DD');
              item[`showDate`] = this.showDate(item.updatedAt);
              return item;
            });
          });
      }
    }
  }
  getDisplayedColumns(): string[] {
    switch (this.masterSeleted) {
      case 'types':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'description' &&
            el !== 'type' &&
            el !== 'domain' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'
        );
      case 'member-carousel':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'domain' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge' &&
            el !== 'description'
        );
        case 'studies':
          return this.displayedColumns.filter(
            (el) =>
              el !== 'type' &&
              el !== 'domain' &&
              el !== 'master' &&
              el !== 'knowledgeArea' &&
              el !== 'specificKnowledge'
          );
      case 'security-responsabilities':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'description' &&
            el !== 'domain' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'
        );
      case 'education-area':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'domain' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'
        );
      case 'base-teams-categories':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'domain' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'
        );
      case 'domain':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' &&
            el !== 'domain' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'
        );
      case 'functions':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'type' && el !== 'master' && el !== 'knowledgeArea' && el !== 'specificKnowledge'
        );
      case 'courses-certifications':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'description' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'type' &&
            el !== 'domain' &&
            el !== 'name' &&
            el !== 'specificKnowledge'
        );
      case 'syllabi':
        return this.displayedColumns.filter(
          (el) => el !== 'description' && el !== 'master' && el !== 'name' && el !== 'type'
        );
      default:
        return this.displayedColumns.filter(
          (el) =>
            el !== 'domain' &&
            el !== 'master' &&
            el !== 'knowledgeArea' &&
            el !== 'specificKnowledge'
        );
    }
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
    this.historyMastersService
      .hitoryActionsAdminMaster('get', this.idHistoryassigned)
      .then((res: any) => {
        this.historyFilter = this.setShowDate(this.historyFilter, res).filter(
          (item: any) =>
            dayjs.default(item.updatedAt).isSameOrAfter(startDate) &&
            dayjs.default(item.updatedAt).isSameOrBefore(endDate)
        );
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
    this.historyMastersService
      .hitoryActionsAdminMaster('get', this.idHistoryassigned)
      .then((res: any) => {
        this.historyFilter = this.setShowDate(this.historyFilter, res).filter(
          (item: any) =>
            dayjs.default(item.updatedAt).isSameOrAfter(startDate) &&
            dayjs.default(item.updatedAt).isSameOrBefore(endDate)
        );
      });
  }

  /**
   * @author Hanna
   * @description Esta función muestra las fechas en la sección de historial,
   * omitiendo los rangos de fechas que se repitan; a demás de retornarlas en un formato
   * más descriptivo (ejemplo: Febrero 2021).
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
  onPreview(id: any) {
    this.historySelected = id;
    this.visivility = true;
    if (this.masterSeleted === 'courses-certifications') {
      this.customPreview();
      return;
    }
    this.dataSource = this.historyFilter.filter((el: any) => el._id === id);
  }
  customPreview() {
    this._dialog
      .open(CustomHistoryComponent, {
        data: this.historyFilter.filter((el: any) => el._id === this.historySelected),
        autoFocus: false,
      })
      .afterClosed()
      .subscribe(async (resp: any) => {
        this.historySelected = '';
        this.visivility = false;
      });
  }
  outPreview() {
    this.historySelected = '';
    this.visivility = false;
  }
}
