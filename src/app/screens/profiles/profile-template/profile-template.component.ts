import { Component, OnInit, ViewChild, ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Tables } from '@app/shared/interfaces/profile-competences.interface';
import { ProfileTemplateService } from './services/profile-template.service';
import { MatSelectionList } from '@angular/material/list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormHistoryComponent } from './profile-form-history/profile-form-history.component';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileTemplateComponent implements OnInit {
  @ViewChild('education') education!: MatSelectionList;
  @ViewChild('requiredCertificates') requiredCertificates!: MatSelectionList;
  @ViewChild('specificKnowledge') specificKnowledge!: MatSelectionList;
  @ViewChild('rolResponsabilities') rolResponsabilities!: MatSelectionList;
  @ViewChild('securityResp') securityResp!: MatSelectionList;
  @ViewChild('assertiveComSlider') assertiveComSlider!: MatSlider;
  dataAssertiveComunication!: MatTableDataSource<Tables>;
  dataAchievementOrientation!: MatTableDataSource<Tables>;
  dataServiceOrientation!: MatTableDataSource<Tables>;
  dataTeamwork!: MatTableDataSource<Tables>;
  percent!: any;
  data!: any;
  securityResponsabilitiesData!: any;
  getAllData: any;

  contentPagesEducation: any;
  contentPagesSecurityResp: any;
  contentPagesSpecificKnowledge: any;
  contentPagesRequiredCertificates: any;
  contentPagesRolResponsabilities: any;
  contentPagesSecurityResponsabilities: any;
  isEditable = false;
  nextPageButtonDisabledEducation = false;
  nextPageButtonDisabledRequiredCertificates = false;
  nextPageButtonDisabledSpecificKnowledge = false;
  nextPageButtonDisabledRolResponsabilities = false;
  nextPageButtonDisabledSecurityResp: any;
  beforePageButtonDisabledSecurityResp: any;
  beforePageButtonDisabledEducation = true;
  beforePageButtonDisabledRequiredCertificates = true;
  beforePageButtonDisabledSpecificKnowledge = true;
  beforePageButtonDisabledRolResponsabilities = true;
  selectedOptions: any = [];
  public tabIndexEducation = 0;
  public tabIndexSpecificKnowledge = 0;
  public tabIndexRequiredCertificates = 0;
  public tabIndexRolResponsabilities = 0;
  public tabIndexSecurityResp = 0;

  formObjective = new FormGroup({
    objective: new FormControl(null, [Validators.required]),
  });
  formExperience = new FormGroup({
    professionalExperience: new FormControl(null),
    chargeExperience: new FormControl(null),
  });
  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  sendInformation = {};
  value = 0;
  /* Errors */
  educationError = false;
  requiredCertificatesError = false;
  specificKnowledgeError = false;
  rolResponsabilitiesError = false;

  historyId!: string;
  existentDate!: string;
  historyFilter: any = [];
  onHistory = false;
  history = [
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2021-01-13',
      id: 456,
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2021-01-15',
      id: 123,
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2021-01-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-12-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-12-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-12-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-12-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-11-12',
      id: 'id3',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '2020-11-12',
      id: 'id3',
    },
  ];

  constructor(
    private profileTemplateService: ProfileTemplateService,
    private notificationService: NotificationService,
    private _dialog: MatDialog
    // private cd: ChangeDetectorRef
  ) {}
  // refresh() {
  //   this.cd.detectChanges();
  // }
  ngOnInit(): void {
    this.getData();
    this.history.sort((a, b) => (a.date < b.date ? 1 : -1));
    this.historyFilter = this.history
  }

  x(ev: MatSliderChange, id: any) {
    this.percent = ev.value;
    console.log(ev.source._elementRef.nativeElement.id);
  }


  async onPreview(id: any, drawer: any){
    const showProfileHistory: any = await this.profileTemplateService.getAllData();
    this.data = showProfileHistory.filter((profile: any) => profile._id === id)[0];
    this.onHistory = true;
    drawer.toggle();
  }

  onSelectStartDate(event: any) {
    const startDate = moment.default(event.value).format('YYYY-MM-DD');
    const endDate =
      this.formFilterHistory.value.endDate === null
        ? moment.default(new Date()).format('YYYY-MM-DD')
        : moment.default(this.formFilterHistory.value.endDate).format('YYYY-MM-DD');

    this.historyFilter = this.history.filter(
      (item: any) =>
        moment.default(item.date).isSameOrAfter(startDate) &&
        moment.default(item.date).isSameOrBefore(endDate)
    );
  }

  onSelectEndDate(event: any) {
    const endDate = moment.default(event.value).format('YYYY-MM-DD');
    const startDate = moment.default(this.formFilterHistory.value.startDate).format('YYYY-MM-DD');
    console.log(
      this.history.filter(
        (item: any) =>
          moment.default(item.date).isSameOrAfter(startDate) &&
          moment.default(item.date).isSameOrBefore(endDate)
      )
    );
    this.historyFilter = this.history.filter(
      (item: any) =>
        moment.default(item.date).isSameOrAfter(startDate) &&
        moment.default(item.date).isSameOrBefore(endDate)
    );
  }

  exitHistory(drawer: any){
    this.getData();
    this.onHistory = false;
    drawer.toggle();
  }

  nextTab(length: any, section: string) {
    switch (section) {
      case 'education':
        this.tabIndexEducation = this.tabIndexEducation + 1;
        if (this.tabIndexEducation > 0) {
          this.beforePageButtonDisabledEducation = false;
        }
        if (this.tabIndexEducation === length - 1) {
          this.nextPageButtonDisabledEducation = true;
        }
        break;
      case 'requiredCertificates':
        this.tabIndexRequiredCertificates = this.tabIndexRequiredCertificates + 1;
        if (this.tabIndexRequiredCertificates > 0) {
          this.beforePageButtonDisabledRequiredCertificates = false;
        }
        if (this.tabIndexRequiredCertificates === length - 1) {
          this.nextPageButtonDisabledRequiredCertificates = true;
        }
        break;
      case 'specificKnowledge':
        this.tabIndexSpecificKnowledge = this.tabIndexSpecificKnowledge + 1;
        if (this.tabIndexSpecificKnowledge > 0) {
          this.beforePageButtonDisabledSpecificKnowledge = false;
        }
        if (this.tabIndexSpecificKnowledge === length - 1) {
          this.nextPageButtonDisabledSpecificKnowledge = true;
        }
        break;
      case 'rolResponsabilities':
        this.tabIndexRolResponsabilities = this.tabIndexRolResponsabilities + 1;
        if (this.tabIndexRolResponsabilities > 0) {
          this.beforePageButtonDisabledRolResponsabilities = false;
        }
        if (this.tabIndexRolResponsabilities === length - 1) {
          this.nextPageButtonDisabledRolResponsabilities = true;
        }
        break;
      case 'securityResponsabilities':
        this.tabIndexSecurityResp = this.tabIndexSecurityResp + 1;
        if (this.tabIndexSecurityResp > 0) {
          this.beforePageButtonDisabledSecurityResp = false;
        }
        if (this.tabIndexSecurityResp === length - 1) {
          this.nextPageButtonDisabledSecurityResp = true;
        }
        break;
    }
  }
  beforeTab(section: string) {
    switch (section) {
      case 'education':
        this.tabIndexEducation = this.tabIndexEducation - 1;
        this.nextPageButtonDisabledEducation = false;
        if (this.tabIndexEducation === 0) {
          this.beforePageButtonDisabledEducation = true;
        }
        break;
      case 'requiredCertificates':
        this.tabIndexRequiredCertificates = this.tabIndexRequiredCertificates - 1;
        this.nextPageButtonDisabledRequiredCertificates = false;
        if (this.tabIndexRequiredCertificates === 0) {
          this.beforePageButtonDisabledRequiredCertificates = true;
        }
        break;
      case 'specificKnowledge':
        this.tabIndexSpecificKnowledge = this.tabIndexSpecificKnowledge - 1;
        this.nextPageButtonDisabledSpecificKnowledge = false;
        if (this.tabIndexSpecificKnowledge === 0) {
          this.beforePageButtonDisabledSpecificKnowledge = true;
        }
        break;
      case 'rolResponsabilities':
        this.tabIndexRolResponsabilities = this.tabIndexRolResponsabilities - 1;
        this.nextPageButtonDisabledRolResponsabilities = false;
        if (this.tabIndexRolResponsabilities === 0) {
          this.beforePageButtonDisabledRolResponsabilities = true;
        }
        break;
      case 'securityResponsabilities':
        this.tabIndexSecurityResp = this.tabIndexSecurityResp - 1;
        this.nextPageButtonDisabledSecurityResp = false;
        if (this.tabIndexSecurityResp === 0) {
          this.beforePageButtonDisabledSecurityResp = true;
        }
        break;
    }
  }
  displayedColumns(table: string) {
    return [table, 'measureApproval'];
  }

  getData() {
    this.profileTemplateService.getData().then((res: any) => {
      this.data = res[0];
      this.dataAssertiveComunication = new MatTableDataSource(res[0].corporativeCompetences.assertiveComunication);
      this.dataAchievementOrientation = new MatTableDataSource(res[0].corporativeCompetences.achievementOrientation);
      this.dataServiceOrientation = new MatTableDataSource(res[0].corporativeCompetences.serviceOrientation);
      this.dataTeamwork = new MatTableDataSource(res[0].corporativeCompetences.teamwork);
    });
    this.getSecurityResponsabilities();
  }

  getSecurityResponsabilities() {
    this.profileTemplateService.getAllSecurityResponsabilities().then((res: any) => {
      this.securityResponsabilitiesData = res;
    });
  }

  onEdit() {
    /* Objective */
    this.formObjective.get('objective')?.patchValue(this.data.objective);
    /* Experience */
    this.formExperience.get('professionalExperience')?.patchValue(this.data.professionalExperience);
    this.formExperience.get('chargeExperience')?.patchValue(this.data.chargeExperience);
    /* Education */
    this.profileTemplateService.getAllEstudies().then((res: any) => {
      this.buildPagesAndColumnsList(res, 'education');
    });
    /* Required Certificates */
    this.profileTemplateService.getAllCertificates().then((res: any) => {
      this.buildPagesAndColumnsList2(res, 'requiredCertificates');
    });
    /* Specific Knowledge */
    this.profileTemplateService.getAllKnowledge().then((res: any) => {
      this.buildPagesAndColumnsList(res, 'specificKnowledge');
    });
    /* Rol Responsabilities */
    this.profileTemplateService.getAllFunctions().then((res: any) => {
      this.buildPagesAndColumnsList2(res, 'rolResponsabilities');
    });
    /* Security Responsabilities */
    this.profileTemplateService.getAllSecurityResponsabilities().then((res: any) => {
      this.buildPagesAndColumnsList(res, 'securityResponsabilities');
    });

    this.isEditable = true;
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

  buildPagesAndColumnsList(res: any, section: string) {
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
    switch (section) {
      case 'education':
        this.contentPagesEducation = finalArrayPages;
        break;
      case 'specificKnowledge':
        this.contentPagesSpecificKnowledge = finalArrayPages;
        break;
      case 'securityResponsabilities':
        this.contentPagesSecurityResponsabilities = finalArrayPages;
        // console.log(this.contentPagesSecurityResponsabilities);

        break;
    }
  }
  buildPagesAndColumnsList2(res: any, section: string) {
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
    // this.contentPages = finalArrayPages;
    switch (section) {
      case 'requiredCertificates':
        this.contentPagesRequiredCertificates = finalArrayPages;
        break;
      case 'rolResponsabilities':
        this.contentPagesRolResponsabilities = finalArrayPages;
        break;
    }
  }

  onInitList(item: any, section: string) {
    for (const i of this.data[section]) {
      if (i._id === item._id) {
        return true;
      }
    }
  }
  onSave() {
    this.onSaveObjective();
    this.onSaveEperience();
    this.onSaveeEucation();
    this.onSaveRequiredCertificates();
    this.onSaveSpecificKnowledge();
    this.onSavErolResponsabilities();
    const saveHistorial = {
      title: 'Guardar en Historial',
      message: '¿Desea que el registro de los cambios se guarde en el historial?',
      type: 'warning',
    };
    this.notificationService
      .openComplexSnackBar(saveHistorial)
      .afterClosed()
      .subscribe((resp) => {
        console.log(this.sendInformation);
        console.log(resp);
        if (resp) {
          this._dialog.open(ProfileFormHistoryComponent, {
            data: {
              profileDate: this.data
            },
            autoFocus: false
          }).afterClosed().subscribe((resp: any) => {
            console.log('reporte Historial', resp);
          });
        }
      });
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
    this.sendInformation = {
      ...this.sendInformation,
      objective: this.formObjective.value.objective,
    };
    // console.log(this.formObjective.value.objective);
    return true;
  }
  onSaveEperience() {
    if (this.formExperience.invalid) {
      this.formExperience.markAllAsTouched();
      return;
    }
    this.sendInformation = {
      ...this.sendInformation,
      professionalExperience: this.formExperience.value.professionalExperience,
      chargeExperience: this.formExperience.value.chargeExperience,
    };
    // console.log(this.formExperience.value.professionalExperience);
    // console.log(this.formExperience.value.chargeExperience);
    return true;
  }
  onSaveeEucation() {
    if (this.education.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista de "Formación Académica".',
        type: 'error',
      });
      this.educationError = true;
      return;
    }
    this.educationError = false;
    this.sendInformation = {
      ...this.sendInformation,
      education: this.education.selectedOptions.selected.map((value) => value.value),
    };
    // console.log(this.education.selectedOptions.selected.map((value) => value.value));
    return true;
  }
  onSaveRequiredCertificates() {
    if (this.requiredCertificates.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista de "Certificaciones Requeridas". ',
        type: 'error',
      });
      this.requiredCertificatesError = true;
      return;
    }
    this.requiredCertificatesError = false;
    this.sendInformation = {
      ...this.sendInformation,
      requiredCertificates: this.requiredCertificates.selectedOptions.selected.map(
        (value) => value.value
      ),
    };
    // console.log(this.requiredCertificates.selectedOptions.selected.map((value) => value.value));
    return true;
  }
  onSaveSpecificKnowledge() {
    if (this.specificKnowledge.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista de "Conocimientos Específicos".',
        type: 'error',
      });
      this.specificKnowledgeError = true;
      return;
    }
    this.specificKnowledgeError = false;
    this.sendInformation = {
      ...this.sendInformation,
      specificKnowledge: this.specificKnowledge.selectedOptions.selected.map(
        (value) => value.value
      ),
    };
    // console.log(this.specificKnowledge.selectedOptions.selected.map((value) => value.value));
    return true;
  }
  onSavErolResponsabilities() {
    if (this.rolResponsabilities.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista de "Funciones del Rol".',
        type: 'error',
      });
      this.rolResponsabilitiesError = true;
      return;
    }
    this.rolResponsabilitiesError = false;
    this.sendInformation = {
      ...this.sendInformation,
      rolResponsabilities: this.rolResponsabilities.selectedOptions.selected.map(
        (value) => value.value
      ),
    };
    // console.log(this.rolResponsabilities.selectedOptions.selected.map((value) => value.value));
    return true;
  }

  onCancel() {
    this.sendInformation = {};
    this.isEditable = false;
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

  onStepClicked(id: any) {
    // this.historyId = this.history[id.selectedIndex].id;
  }

  showDate(date: string) {
    const dateTransformad = moment.default(date).format('YYYY-MM');
    if (this.existentDate !== dateTransformad) {
      this.existentDate = dateTransformad;
      return this.onTransformDate(date);
    } else {
      return null;
    }
  }

  onTransformDate(date: string) {
    switch (new Date(date).getMonth() + 1) {
      case 1:
        return `Enero ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 2:
        return `Febrero ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 3:
        return `Marzo ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 4:
        return `Abril ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 5:
        return `Mayo ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 6:
        return `Junio ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 7:
        return `Julio ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 8:
        return `Agosto ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 9:
        return `Septiembre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 10:
        return `Octubre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 11:
        return `Noviembre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      case 12:
        return `Diciembre ${String(new Date(date).getMonth() + 1).padStart(2, '0')} ${new Date(
          date
        ).getFullYear()}`;
      default:
        break;
    }
  }
}
