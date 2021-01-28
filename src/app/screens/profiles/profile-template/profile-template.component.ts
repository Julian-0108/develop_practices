import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tables } from '@app/shared/interfaces/profile-competences.interface';
import { ProfileTemplateService } from './services/profile-template.service';
import { MatSelectionList } from '@angular/material/list';
import { MatTabGroup } from '@angular/material/tabs';
import { MatInput } from '@angular/material/input';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';

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
  dataAssertiveComunication!: MatTableDataSource<Tables>;
  dataAchievementOrientation!: MatTableDataSource<Tables>;
  dataServiceOrientation!: MatTableDataSource<Tables>;
  dataTeamwork!: MatTableDataSource<Tables>;
  percent: number = 0;
  data!: any;
  securityResponsabilitiesData!: any;
  getAllData: any;
  contentPages: any;
  isEditable!: string;
  nextPageButtonDisabled = false;
  beforePageButtonDisabled = true;
  selectedOptions: any = [];
  public tabIndex = 0;
  formObjective!: FormGroup;
  formExperience!: FormGroup;
  constructor(private profileTemplateService: ProfileTemplateService,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getDataCorporativeCompetences();
    this.getData();
    this.formObjective = new FormGroup({
      objective: new FormControl(null, [Validators.required]),
    });
    this.formExperience = new FormGroup({
      professionalExperience: new FormControl(null),
      chargeExperience: new FormControl(null),
    });
  }

  x(ev: any) {
    this.percent = ev.value;
  }

  nextTab(length: any) {
    this.tabIndex = this.tabIndex + 1;
    if (this.tabIndex > 0) {
      this.beforePageButtonDisabled = false;
    }
    if (this.tabIndex === length - 1) {
      this.nextPageButtonDisabled = true;
    }
  }
  beforeTab() {
    this.tabIndex = this.tabIndex - 1;
    this.nextPageButtonDisabled = false;
    if (this.tabIndex === 0) {
      this.beforePageButtonDisabled = true;
    }
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
    this.getSecurityResponsabilities();
  }

  getSecurityResponsabilities() {
    this.profileTemplateService.getAllSecurityResponsabilities().then((res: any) => {
      this.securityResponsabilitiesData = res;
    });
  }

  menuItemSelected(item: string) {
    switch (item) {
      case 'objective':
        this.formObjective.get('objective')?.patchValue(this.data.objective);
        this.isEditable = item;
        break;
      case 'experience':
        this.formExperience
          .get('professionalExperience')
          ?.patchValue(this.data.professionalExperience);
        this.formExperience.get('chargeExperience')?.patchValue(this.data.chargeExperience);
        this.isEditable = item;
        break;
      case 'education':
        this.profileTemplateService.getAllEstudies().then((res: any) => {
          this.buildPagesAndColumnsList(res, item);
        });
        break;
      case 'requiredCertificates':
        this.profileTemplateService.getAllCertificates().then((res: any) => {
          this.buildPagesAndColumnsList2(res, item);
        });
        break;
      case 'specificKnowledge':
        this.profileTemplateService.getAllKnowledge().then((res: any) => {
          this.buildPagesAndColumnsList(res, item);
        });
        break;
      case 'rolResponsabilities':
        this.profileTemplateService.getAllFunctions().then((res: any) => {
          this.buildPagesAndColumnsList2(res, item);
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
    if (newarrayPages[0].length !== 0) {
      finalArrayPages = [...finalArrayPages, newarrayPages];
    }
    console.log(finalArrayPages);
    this.contentPages = finalArrayPages;
    this.isEditable = item;
    this.restartPaginator();
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
    this.restartPaginator();
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
      case 'objective':
        this.onSaveObjective();
        break;
      case 'experience':
        this.onSaveEperience();
        break;
      case 'education':
        this.onSaveeEucation();
        break;
      case 'requiredCertificates':
        this.onSaveRequiredCertificates();
        break;
      case 'specificKnowledge':
        this.onSaveSpecificKnowledge();
        break;
      case 'rolResponsabilities':
        this.onSavErolResponsabilities();
        break;
    }
  }

  onSaveObjective() {
    if (this.formObjective.invalid) {
      this.formObjective.markAllAsTouched();
      return;
    }
    if (this.formObjective.value.objective.length < 10) {
      this.formObjective
        .get('objective')
        ?.setErrors({ error: 'El contenido debe tener almenos 10 carateres.' });
      return;
    }
    console.log(this.formObjective.value.objective);
  }
  onSaveEperience() {
    if (this.formExperience.invalid) {
      this.formExperience.markAllAsTouched();
      return;
    }
    console.log(this.formExperience.value.professionalExperience);
    console.log(this.formExperience.value.chargeExperience);
  }
  onSaveeEucation() {
    if (this.education.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista.',
        type: 'error',
      });
      return;
    }
    console.log(this.education.selectedOptions.selected.map((value) => value.value));
  }
  onSaveRequiredCertificates() {
    if (this.requiredCertificates.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista',
        type: 'error',
      });
      return;
    }
    console.log(this.requiredCertificates.selectedOptions.selected.map((value) => value.value));
  }
  onSaveSpecificKnowledge() {
    if (this.specificKnowledge.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista',
        type: 'error',
      });
      return;
    }
    console.log(this.specificKnowledge.selectedOptions.selected.map((value) => value.value));
  }
  onSavErolResponsabilities() {
    if (this.rolResponsabilities.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista',
        type: 'error',
      });
      return;
    }
    console.log(this.rolResponsabilities.selectedOptions.selected.map((value) => value.value));
  }

  onCancel() {
    this.isEditable = '';
    this.restartPaginator();
  }

  restartPaginator() {
    this.tabIndex = 0;
    this.nextPageButtonDisabled = false;
    this.beforePageButtonDisabled = true;
  }

  soloNumeros(value: any) {
    /*
     * La expresión regular valida que el valor ingresado sea numérico de 0-9.
     */
    /^[0-9]+$/.test(value.key.toString())
      ? (value.returnValue = true)
      : (value.returnValue = false);
  }

  fieldExperienceValidation(field: string) {
    if (!this.formExperience.value[field]) {
      this.formExperience.get(field)?.patchValue(0);
    }
    if (this.formExperience.value[field] > 60) {
      this.formExperience.get(field)?.setErrors({ error: 'El número ingresado no es válido.' });
      return;
    }
  }

  pipeYears(year: number) {
    return year > 1 ? `${year} años` : `${year} año`;
  }
}
