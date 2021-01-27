import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tables } from '@app/shared/interfaces/profile-competences.interface';
import { ProfileTemplateService } from './services/profile-template.service';
import { MatSelectionList } from '@angular/material/list';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.scss'],
})
export class ProfileTemplateComponent implements OnInit {
  @ViewChild('education') education!: MatSelectionList;
  @ViewChild('requiredCertificates') requiredCertificates!: MatSelectionList;
  @ViewChild('specificKnowledge') specificKnowledge!: MatSelectionList;
  @ViewChild('rolResponsabilities') rolResponsabilities!: MatSelectionList;
  @ViewChild('matTabEducation') matTabEducation!: MatTabGroup;
  dataAssertiveComunication!: MatTableDataSource<Tables>;
  dataAchievementOrientation!: MatTableDataSource<Tables>;
  dataServiceOrientation!: MatTableDataSource<Tables>;
  dataTeamwork!: MatTableDataSource<Tables>;
  percent: number = 0;
  data!: any;
  getAllData: any;
  contentPages: any;
  isEditable!: string;
  nextPage = false;
  selectedOptions: any = [];
  public tabIndex = 0;
  constructor(private profileTemplateService: ProfileTemplateService) {}

  ngOnInit(): void {
    this.getDataCorporativeCompetences();
    this.getData();
  }

  x(ev: any) {
    this.percent = ev.value;
  }

  nextTab(){
    console.log(this.matTabEducation._tabs);
    console.log(this.matTabEducation);

    this.tabIndex = 1;
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
    switch (item) {
      case 'education':
        this.profileTemplateService.getAllEstudies().then((res: any) => {
          this.buildPagesAndColumnsList(res, item);
        });
        break;
      case 'requiredCertificates':
        this.profileTemplateService.getAllCertificates().then((res: any) => {
          this.buildPagesAndColumnsList2(res, item)
        });
        break;
      case 'specificKnowledge':
        this.profileTemplateService.getAllKnowledge().then((res: any) => {
          this.buildPagesAndColumnsList(res, item);
        });
        break;
      case 'rolResponsabilities':
        this.profileTemplateService.getAllFunctions().then((res: any) => {
          this.buildPagesAndColumnsList2(res, item)
        });
        break;
    }
  }

  buildColumns(res: any) {
    let newarray: any = [];
    let finalArray: any = [];
    res.forEach((element: any) => {
      element.forEach((el: any) => {
        newarray = [...newarray, el];
        if (newarray.length === 7) {
          finalArray = [...finalArray, newarray];
          newarray = [];
        }
      });
    });
    finalArray = [...finalArray, newarray];
    this.getAllData = finalArray;
    console.log(this.getAllData);

    // this.isEditable = item;
  }

  buildPagesAndColumnsList(res: any, item: string) {
    let newarraycolumns: any = [];
    let newarrayPages: any = [];
    let finalArrayPages: any = [];
    let finalArrayColumns: any = [];
      res.forEach((element: any) => {
        newarraycolumns = [...newarraycolumns, element];
        if (newarraycolumns.length === 7) {
          finalArrayColumns = [...finalArrayColumns, newarraycolumns];
          newarraycolumns = [];
        }
      });
      finalArrayColumns = [...finalArrayColumns, newarraycolumns];
      console.log(finalArrayColumns);
      finalArrayColumns.forEach((el: any) => {
        newarrayPages = [...newarrayPages, el];
        if (newarrayPages.length === 3) {
          finalArrayPages = [...finalArrayPages, newarrayPages];
          newarrayPages = [];
        }
      });
      finalArrayPages = [...finalArrayPages, newarrayPages];
      console.log(finalArrayPages);
      this.contentPages = finalArrayPages;
    this.isEditable = item;
  }
  buildPagesAndColumnsList2(res: any, item: string) {
    let newarrayPages: any = [];
    let finalArrayPages: any = [];
      res.forEach((element: any) => {
        newarrayPages = [...newarrayPages, element];
        if (newarrayPages.length === 6) {
          finalArrayPages = [...finalArrayPages, newarrayPages];
          newarrayPages = [];
        }
      });
      finalArrayPages = [...finalArrayPages, newarrayPages];
      console.log(finalArrayPages);
      this.contentPages = finalArrayPages;
    this.isEditable = item;
  }

  onInitList(item: any, section: string) {
    for (const i of this.data[section]) {
      if (i._id === item._id) {
        return true;
      }
    }
  }
  onSave(section: string) {
    switch (section) {
      case 'education':
        console.log(this.education.selectedOptions.selected.map((value) => value.value));
        break;
      case 'requiredCertificates':
        console.log(this.requiredCertificates.selectedOptions.selected.map((value) => value.value));
        break;
      case 'specificKnowledge':
        console.log(this.specificKnowledge.selectedOptions.selected.map((value) => value.value));
        break;
      case 'rolResponsabilities':
        console.log(this.rolResponsabilities.selectedOptions.selected.map((value) => value.value));
        break;
    }
  }

  onCancel() {
    this.isEditable = '';
  }
}
