import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tables } from '@app/shared/interfaces/profile-competences.interface';
import { ProfileTemplateService } from './services/profile-template.service';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.scss'],
})
export class ProfileTemplateComponent implements OnInit {
  @ViewChild('estudies') estudies!: MatSelectionList;
  dataAssertiveComunication!: MatTableDataSource<Tables>;
  dataAchievementOrientation!: MatTableDataSource<Tables>;
  dataServiceOrientation!: MatTableDataSource<Tables>;
  dataTeamwork!: MatTableDataSource<Tables>;
  percent: number = 0;
  data!: any;
  getAllData: any;
  isEditable!: string;
  constructor(private profileTemplateService: ProfileTemplateService) {}

  ngOnInit(): void {
    this.getDataCorporativeCompetences();
    this.getData();
  }

  x(ev: any) {
    this.percent = ev.value;
  }
  displayedColumns(table: string) {
    return [table, 'measureApproval'];
  }
  getDataCorporativeCompetences() {
    this.profileTemplateService.getDataCorporativeCompetences().then((res: any) => {
      this.dataAssertiveComunication = new MatTableDataSource(res.assertiveComunication);
      this.dataAchievementOrientation = new MatTableDataSource(res.achievementOrientation);
      this.dataServiceOrientation = new MatTableDataSource(res.serviceOrientation);
      this.dataTeamwork = new MatTableDataSource(res.teamwork);
    });
  }
  getData() {
    this.profileTemplateService.getData().then((res: any) => {
      this.data = res[0];
    });
  }

  menuItemSelected(item: string) {
    if (item === 'education') {
      this.profileTemplateService.getAllEstudies().then((res: any) => {
        let newarray: any = [];
        let finalArray: any = [];
        res.forEach((element: any) => {
          newarray = [...newarray, element];
          if (newarray.length === 7) {
            finalArray = [...finalArray, newarray];
            newarray = [];
          }
        });
        finalArray = [...finalArray, newarray];
        this.getAllData = finalArray;
      });
      this.isEditable = 'education';
    }
  }

  onInitList(item: any) {
    for (const i of this.data.education) {
      if (i._id === item._id) {
        return true;
      }
    }
  }
  onSave(){
    console.log(this.estudies.selectedOptions.selected.map(v => v.value));
  }

  onSelection(event: any){
    if (event.option.selected) {
      this.estudies.selectedOptions.selected.push(event.option);
    } else {
      const removeItem = this.estudies.selectedOptions.selected.indexOf(event.option);
      this.estudies.selectedOptions.selected.splice(removeItem, 1);
    }
  }
  onCancel(){
    this.isEditable = '';
  }
}
