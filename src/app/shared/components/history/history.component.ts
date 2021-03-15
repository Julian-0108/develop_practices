import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = ['name', 'levels', 'status'];
  historySelected = '';
  visivility = false;
  dataSource = [];
  historyFilter: any = [
    {
      showDate: 'ejemplo',
      author: 'ejemplo',
      descriptionChanges: 'ejemplo',
      updatedAt: '2021-03-10',
      _id: 'id1',
      name: 'ejemplo',
      levels: ['N1', 'N2', 'N3'],
      status: true,
    },
    {
      showDate: 'ejemplo2',
      author: 'ejemplo2',
      descriptionChanges: 'ejemplo2',
      updatedAt: '2021-03-05',
      _id: 'id2',
      name: 'ejemplo2',
      levels: ['N1', 'N2', 'N3'],
      status: true,
    },
    {
      showDate: 'ejemplo3',
      author: 'ejemplo3',
      descriptionChanges: 'ejemplo3',
      updatedAt: '2021-03-11',
      _id: 'id3',
      name: 'ejemplo3',
      levels: ['N1', 'N2', 'N3'],
      status: true,
    },
  ];

  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  ngOnInit(): void {
    this.getHistory();
  }
  getHistory() {
    // this.historySelected = this.historyFilter[0]._id;
  }
  /**
   * @author Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y como fecha final, la fecha actual por defecto.
   */
  onSelectStartDate(event: any) {
    const startDate = dayjs.default(event.value).format('YYYY-MM-DD');
    const endDate =
      this.formFilterHistory.value.endDate === null
        ? dayjs.default(new Date()).format('YYYY-MM-DD')
        : dayjs.default(this.formFilterHistory.value.endDate).format('YYYY-MM-DD');

    this.historyFilter = this.historyFilter.filter((item: any) =>
      dayjs.default(item.updatedAt).isBetween(startDate, endDate)
    );
  }

  /**
   * @author Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y la fecha final digitada.
   */
  onSelectEndDate(event: any) {
    const endDate = dayjs.default(event.value).format('YYYY-MM-DD');
    const startDate = dayjs.default(this.formFilterHistory.value.startDate).format('YYYY-MM-DD');
    this.historyFilter = this.historyFilter.filter((item: any) =>
      dayjs.default(item.updatedAt).isBetween(startDate, endDate)
    );
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
