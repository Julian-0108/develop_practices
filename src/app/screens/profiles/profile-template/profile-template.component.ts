import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Tables } from '@app/shared/interfaces/profile-competences.interface';
import { ProfileTemplateService } from './services/profile-template.service';
import { MatSelectionList } from '@angular/material/list';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { MatSliderChange } from '@angular/material/slider';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormHistoryComponent } from './profile-form-history/profile-form-history.component';
import { SnackOptionsInterface } from '@shared/interfaces/notification.interface';
import { ActivatedRoute } from '@angular/router';
import { OnlyNumbers } from '@shared/functions/onlyNumbers';
import { BehaviorSubject } from 'rxjs';
import { ResponsabilitiesDescComponent } from './responsabilitiesDesc/responsabilities-desc.component';

export interface AcademicEducationTable {
  education: string;
  area: Array<{ _id: string; name: string }>;
}
export interface AcademicEducation {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  type?: string;
  updatedAt: string;
  createdAt: string;
}
@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.scss'],
})
export class ProfileTemplateComponent implements OnInit {
  @ViewChild('educationTable') _educationTable!: MatTable<any>;
  @ViewChild('requiredCertificates') requiredCertificates!: MatSelectionList;
  @ViewChild('specificKnowledge') specificKnowledge!: MatSelectionList;
  @ViewChild('rolResponsabilities') rolResponsabilities!: MatSelectionList;
  @ViewChild('talents') talents!: MatSelectionList;
  @ViewChild('securityResponsabilities') securityResponsabilities!: MatSelectionList;
  dataAssertiveComunication!: MatTableDataSource<Tables>;
  dataAchievementOrientation!: MatTableDataSource<Tables>;
  dataServiceOrientation!: MatTableDataSource<Tables>;
  dataTeamwork!: MatTableDataSource<Tables>;
  percent: any = {};
  data: any = [];
  securityResponsabilitiesData!: any;

  contentPagesEducation = [];
  educationList: AcademicEducation[] = [];
  areasList: AcademicEducation[] = [];
  contentPagesSpecificKnowledge = [];
  contentPagesRequiredCertificates = [];
  contentPagesRolResponsabilities = [];
  contentPagesTalents = [];
  contentPagesTalentsReadOnly = [];
  contentPagesSecurityResponsabilities = [];
  isEditable = false;
  nextPageButtonDisabledRequiredCertificates = false;
  nextPageButtonDisabledSpecificKnowledge = false;
  nextPageButtonDisabledRolResponsabilities = false;
  nextPageButtonDisabledTalents = false;
  nextPageButtonDisabledTalentsReadOnly = false;
  nextPageButtonDisabledSecurityResp: any;
  beforePageButtonDisabledSecurityResp: any;
  beforePageButtonDisabledRequiredCertificates = true;
  beforePageButtonDisabledSpecificKnowledge = true;
  beforePageButtonDisabledRolResponsabilities = true;
  beforePageButtonDisabledTalents = true;
  beforePageButtonDisabledTalentsReadOnly = true;
  selectedOptions: any = [];
  public tabIndexSpecificKnowledge = 0;
  public tabIndexRequiredCertificates = 0;
  public tabIndexRolResponsabilities = 0;
  public tabIndexTalents = 0;
  public tabIndexTalentsReadOnly = 0;
  public tabIndexSecurityResp = 0;
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

  formObjective = new FormGroup({
    objective: new FormControl(null, [Validators.required]),
  });
  formExperience = new FormGroup({
    professionalExperience: new FormControl(0),
    chargeExperience: new FormControl(0),
  });
  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  sendInformation = {};
  /* Errors */
  educationError = false;
  requiredCertificatesError = false;
  specificKnowledgeError = false;
  rolResponsabilitiesError = false;
  talentsError = false;
  securityRespError = false;
  idProfile = this.activatedRoute.snapshot.params.idProfile;
  onlyNumbers = new OnlyNumbers();
  /* History */
  historyId!: string;
  existentDate!: string;
  historyFilter: any = [];
  onHistory = false;
  history: any = [];

  exampleForm!: FormGroup;
  selected: any;
  educationDataSource = new BehaviorSubject<AbstractControl[]>([]);
  public educationColumns: string[] = ['education', 'area', 'actions'];
  public rows: FormArray = this.formBuilder.array([]);
  public form: FormGroup = this.formBuilder.group({ academicEducation: this.rows });
  readOnlyEducationDatasource!: MatTableDataSource<AcademicEducationTable>;
  public responsabilitySeleted = '';
  showEducationFilter = true;
  showNotFoundMessage = false;
  corporativeRespList: string[] = [];

  constructor(
    private profileTemplateService: ProfileTemplateService,
    private notificationService: NotificationService,
    private _dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.getData();
  }

  ngOnInit(): void {}

  addRowIntoEducationTable(d?: AcademicEducationTable, noUpdate?: boolean) {
    const row = this.formBuilder.group({
      education: [d && d.education ? d.education : null, []],
      area: [d && d.area ? d.area.map((area: any) => area._id) : null, []],
    });
    this.rows.push(row);
    if (!noUpdate) {
      this.refreshEducationTable();
    }
  }

  refreshEducationTable() {
    this.educationDataSource.next(this.rows.controls);
  }
  /**
   * @author Hanna
   * @description Esta función inicializa las listas, marcando visualmente las opciones
   * que ya se están usando.
   */
  onInitList(item: any, section: string) {
    for (const i of this.data[section]) {
      if (i._id === item._id) {
        return true;
      }
    }
  }

  removeRow(index: number) {
    const control = this.form.controls.academicEducation as FormArray;
    control.removeAt(index);
    this._educationTable.renderRows();
  }

  getTotalPercent(table: any) {
    switch (table) {
      case 'assertiveCommunication':
        if (this.dataAssertiveComunication) {
          return this.dataAssertiveComunication.filteredData
            .map((item) => item.measureApproval)
            .reduce(
              (acc, value) =>
                Math.round(acc + value / this.dataAssertiveComunication.filteredData.length),
              0
            );
        }
        break;
      case 'achievementOrientation':
        if (this.dataAchievementOrientation) {
          return this.dataAchievementOrientation.filteredData
            .map((item) => item.measureApproval)
            .reduce(
              (acc, value) =>
                Math.round(acc + value / this.dataAchievementOrientation.filteredData.length),
              0
            );
        }
        break;

      case 'serviceOrientation':
        if (this.dataServiceOrientation) {
          return this.dataServiceOrientation.filteredData
            .map((item) => item.measureApproval)
            .reduce(
              (acc, value) =>
                Math.round(acc + value / this.dataServiceOrientation.filteredData.length),
              0
            );
        }
        break;

      case 'teamwork':
        if (this.dataTeamwork) {
          return this.dataTeamwork.filteredData
            .map((item) => item.measureApproval)
            .reduce(
              (acc, value) => Math.round(acc + value / this.dataTeamwork.filteredData.length),
              0
            );
        }
        break;
    }
  }

  onChangeSliderValue(ev: MatSliderChange, id: any, element: any) {
    this.percent[id] = ev.value;
    element.measureApproval = this.percent[element._id];
  }

  /**
   * @author Hanna
   * @description Función que muestra como estaba el perfil en determinado tiempo,
   * dependiendo de lo que se selecione es la sección historial.
   */
  async onPreview(id: any, drawer: any) {
    this.profileTemplateService.historyPreview(id).then((res: any) => {
      this.data = res;
    });
    this.onHistory = true;
    drawer.toggle();
  }
  /**
   * @author Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y como fecha final, la fecha actual por defecto.
   */
  onSelectStartDate(event: any) {
    const startDate = moment.default(event.value).format('YYYY-MM-DD');
    const endDate =
      this.formFilterHistory.value.endDate === null
        ? moment.default(new Date()).format('YYYY-MM-DD')
        : moment.default(this.formFilterHistory.value.endDate).format('YYYY-MM-DD');

    this.historyFilter = this.history.filter(
      (item: any) =>
        moment.default(item.updatedAt).isSameOrAfter(startDate) &&
        moment.default(item.updatedAt).isSameOrBefore(endDate)
    );
  }
  /**
   * @author Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y la fecha final digitada.
   */
  onSelectEndDate(event: any) {
    const endDate = moment.default(event.value).format('YYYY-MM-DD');
    const startDate = moment.default(this.formFilterHistory.value.startDate).format('YYYY-MM-DD');
    this.historyFilter = this.history.filter(
      (item: any) =>
        moment.default(item.updatedAt).isSameOrAfter(startDate) &&
        moment.default(item.updatedAt).isSameOrBefore(endDate)
    );
  }

  exitHistory(drawer: any) {
    this.getData();
    this.onHistory = false;
    drawer.toggle();
  }
  /**
   * @author Hanna
   * @description Las funciones "nextTab" & "beforeTab", son funciones que
   * controlan la navegación de los tabs, en las listas en cada sección.
   */
  nextTab(length: any, section: string) {
    switch (section) {
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
      case 'talents':
        this.tabIndexTalents = this.tabIndexTalents + 1;
        if (this.tabIndexTalents > 0) {
          this.beforePageButtonDisabledTalents = false;
        }
        if (this.tabIndexTalents === length - 1) {
          this.nextPageButtonDisabledTalents = true;
        }
        break;
      case 'talentsReadOnly':
        this.tabIndexTalentsReadOnly = this.tabIndexTalentsReadOnly + 1;
        if (this.tabIndexTalentsReadOnly > 0) {
          this.beforePageButtonDisabledTalentsReadOnly = false;
        }
        if (this.tabIndexTalentsReadOnly === length - 1) {
          this.nextPageButtonDisabledTalentsReadOnly = true;
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
      case 'talents':
        this.tabIndexTalents = this.tabIndexTalents - 1;
        this.nextPageButtonDisabledTalents = false;
        if (this.tabIndexTalents === 0) {
          this.beforePageButtonDisabledTalents = true;
        }
        break;
      case 'talentsReadOnly':
        this.tabIndexTalentsReadOnly = this.tabIndexTalentsReadOnly - 1;
        this.nextPageButtonDisabledTalentsReadOnly = false;
        if (this.tabIndexTalentsReadOnly === 0) {
          this.beforePageButtonDisabledTalentsReadOnly = true;
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
  /**
   * @author Hanna
   * @description Esta función consulta el json de la información de la aplicación y
   * la asigna a sus respectivas variables.
   */
  async getData() {
    await this.profileTemplateService.getData(this.idProfile).then((res: any) => {
      this.data = res[0];
      if (res[0].educationAndAreaMerge.length === 0) {
        this.showEducationFilter = false;
      }
      this.readOnlyEducationDatasource = new MatTableDataSource(res[0].educationAndAreaMerge);
      this.profileTemplateService.getAllEstudies().then((resp: AcademicEducation[]) => {
        this.educationList = resp;
      });
      this.buildTalentsReadOnly(this.data);
      this.dataAssertiveComunication = new MatTableDataSource(res[0].assertiveComunication);
      res[0].assertiveComunication.forEach((el: any) => {
        this.percent[el._id] = el.measureApproval;
      });
      this.dataAchievementOrientation = new MatTableDataSource(res[0].achievementOrientation);
      res[0].achievementOrientation.forEach((el: any) => {
        this.percent[el._id] = el.measureApproval;
      });
      this.dataServiceOrientation = new MatTableDataSource(res[0].serviceOrientation);
      res[0].serviceOrientation.forEach((el: any) => {
        this.percent[el._id] = el.measureApproval;
      });
      this.dataTeamwork = new MatTableDataSource(res[0].teamwork);
      res[0].teamwork.forEach((el: any) => {
        this.percent[el._id] = el.measureApproval;
      });
    });
    this.profileTemplateService.historyActions('get', this.idProfile)?.then((res: any) => {
      this.history.sort((a: any, b: any) => (a.updatedAt < b.updatedAt ? 1 : -1));
      this.history = res.map((item: any) => {
        item.updatedAt = moment.default(item.updatedAt).format('YYYY-MM-DD');
        item[`showDate`] = this.showDate(item.updatedAt);
        return item;
      });
      this.historyFilter = this.history;
    });
  }
  /**
   * @author Hanna
   * @description Esta función muestra las fechas en la sección de historial,
   * omitiendo los rangos de fechas que se repitan.
   */
  showDate(date: string) {
    const dateTransformad = moment.default(date).format('YYYY-MM');
    if (this.existentDate !== dateTransformad) {
      this.existentDate = dateTransformad;
      return this.onTransformDate(date);
    } else {
      return null;
    }
  }

  /**
   * @author Hanna
   * @description Función que asigna los valores actuales a cada sección, cuando
   * está en el estado de editar.
   */
  async onEdit() {
    /* Objective */
    this.formObjective.get('objective')?.patchValue(this.data.objective);
    /* Experience */
    this.formExperience.get('professionalExperience')?.patchValue(this.data.professionalExperience);
    this.formExperience.get('chargeExperience')?.patchValue(this.data.chargeExperience);
    /* Education */
    const control = this.form.controls.academicEducation as FormArray;
    control.clear();
    this.data.educationAndAreaMerge.forEach((el: AcademicEducationTable) =>
      this.addRowIntoEducationTable(el, false)
    );
    this.refreshEducationTable();
    /* Areas */
    await this.profileTemplateService.getAllAreas().then((res: AcademicEducation[]) => {
      this.areasList = res;
    });
    /* Required Certificates */
    this.profileTemplateService.getAllCertificates().then((res: any) => {
      this.buildPagesList(res, 'requiredCertificates');
    });
    /* Specific Knowledge */
    this.profileTemplateService.getAllKnowledge().then((res: any) => {
      this.buildPagesAndColumnsList(res, 'specificKnowledge');
    });
    /* Rol Responsabilities */
    this.profileTemplateService.getAllFunctions().then((res: any) => {
      this.buildPagesList(res, 'rolResponsabilities');
    });
    /* Talents */
    this.profileTemplateService.getAllTalents().then((res: any) => {
      this.buildPagesList(res, 'talents');
    });
    /* Corporative Responsabilities */
    this.profileTemplateService.getAllSecurityResponsabilities().then((res: any) => {
      this.buildPagesAndColumnsList(res, 'securityResponsabilities');
      res.forEach((responsability: any) => {
        if (!this.corporativeRespList.includes(responsability.type)) {
          this.corporativeRespList.push(responsability.type);
        }
      });
    });

    this.isEditable = true;
  }

  buildTalentsReadOnly(data: any) {
    let newarray: any = [];
    let finalArray: any = [];
    data.talents.forEach((element: any) => {
      newarray = [...newarray, element];
      if (newarray.length === 12) {
        finalArray = [...finalArray, newarray];
        newarray = [];
      }
    });
    if (newarray.length !== 0) {
      finalArray = [...finalArray, newarray];
    }
    this.contentPagesTalentsReadOnly = finalArray;
  }
  /**
   * @author Hanna
   * @description Función que construye las columnas de las opciones que se mostrarán en
   * cada página o tab de las secciones que contengan listas.Esta función arma un máximo
   * de 3 columnas. La función "buildPagesList", por ser secciones de menor tamaño,
   * arma solo una columna con listas de máximo 6 items.
   */

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

    switch (section) {
      case 'specificKnowledge':
        this.contentPagesSpecificKnowledge = finalArrayPages;
        break;
      case 'securityResponsabilities':
        this.contentPagesSecurityResponsabilities = finalArrayPages;

        break;
    }
  }
  buildPagesList(res: any, section: string) {
    let newarrayPages: any = [];
    let finalArrayPages: any = [];
    res.forEach((element: any) => {
      newarrayPages = [...newarrayPages, element];
      if (newarrayPages.length === 6) {
        finalArrayPages = [...finalArrayPages, newarrayPages];
        newarrayPages = [];
      }
    });
    if (newarrayPages.length !== 0) {
      finalArrayPages = [...finalArrayPages, newarrayPages];
    }
    switch (section) {
      case 'requiredCertificates':
        this.contentPagesRequiredCertificates = finalArrayPages;
        break;
      case 'rolResponsabilities':
        this.contentPagesRolResponsabilities = finalArrayPages;
        break;
      case 'talents':
        this.contentPagesTalents = finalArrayPages;
        break;
    }
  }

  onSave() {
    if (
      this.onSaveObjective() &&
      this.onSaveEperience() &&
      this.onSaveeEucation() &&
      this.onSaveRequiredCertificates() &&
      this.onSaveSpecificKnowledge() &&
      this.onSaveRolResponsabilities() &&
      this.onSaveTalents() &&
      this.onSaveSecurityResp() &&
      this.onSaveCorporativeCompetences()
    ) {
      const saveHistorial: SnackOptionsInterface = {
        title: 'Guardar en Historial',
        message: '¿Desea que el registro de los cambios se guarde en el historial?',
        type: 'warning',
        action: 'Con Historial',
        contraryAction: 'Sin Historial',
      };
      this.notificationService
        .openComplexSnackBar(saveHistorial)
        .afterClosed()
        .subscribe((resp) => {
          if (resp === 'close') return;
          if (resp) {
            this.onSavewithHistory();
          } else {
            this.onSaveWithOutHistory();
          }
        });
    }
  }

  onSavewithHistory() {
    /*
     * Se abre el formulario donde se ingresa la descripción de los cambios,
     * que se guardarán en el historial.
     */
    this._dialog
      .open(ProfileFormHistoryComponent, {
        data: {
          ...this.sendInformation,
        },
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((resp: any) => {
        /*
         * Acciones que se activan al dar click en el botón "guardar" del formulario.
         */
        resp = {
          ...resp,
          idBaseTeam: this.data.idBaseTeam,
          idBaseProfile: this.data._id,
          name: this.data.charge,
          charge: this.data.charge,
          teamName: this.data.teamName,
          status: this.data.status,
        };
        delete resp[`_id`];
        /*
         * Se Guarda la información en historial y se actualiza la información del
         * perfil.
         */
        this.profileTemplateService
          .updateProfile(this.idProfile, resp)
          ?.then(() => this.profileTemplateService.historyActions('post', this.idProfile, resp))
          .then(() => {
            this.notificationService.openSimpleSnackBar({
              title: 'Operación Finalizada',
              message: 'La información se ha actualizado con éxito y su historial fue creado.',
              type: 'success',
            });
            this.existentDate = '';
            this.getData();
            this.isEditable = false;
          })
          .catch((error) => {
            this.notificationService.openSimpleSnackBar({
              title: 'Ocurrió un Error',
              message: error.message,
              type: 'error',
            });
          });
      });
  }
  onSaveWithOutHistory() {
    this.sendInformation = {
      ...this.sendInformation,
      idBaseTeam: this.data.idBaseTeam,
      idBaseProfile: this.data._id,
      name: this.data.charge,
      charge: this.data.charge,
      teamName: this.data.teamName,
      status: this.data.status,
    };
    /*
     *Actualiza la información del perfil.
     */
    this.profileTemplateService.updateProfile(this.idProfile, this.sendInformation).then(() => {
      this.notificationService.openSimpleSnackBar({
        title: 'Operación Finalizada',
        message: 'La información se ha actualizado con éxito.',
        type: 'success',
      });
      this.existentDate = '';
      this.getData();
      this.isEditable = false;
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
    return true;
  }
  onSaveEperience() {
    if (this.formExperience.invalid) {
      this.formExperience.markAllAsTouched();
      return;
    }
    this.sendInformation = {
      ...this.sendInformation,
      professionalExperience: Number(this.formExperience.value.professionalExperience),
      chargeExperience: Number(this.formExperience.value.chargeExperience),
    };
    return true;
  }
  onSaveeEucation() {
    let emptyFields: object[] = [];
    for (const i of this.form.value.academicEducation) {
      if (i.education === null || i.area === null) {
        emptyFields.push(i);
      }
    }
    if (this.duplicatedEducationItems().length !== 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Información Duplicada',
        message: 'No se pueden repetir las formaciones académicas.',
        type: 'error',
      });
      this.educationError = true;
      return;
    }
    if (this.form.value.academicEducation.length === 0 || emptyFields.length !== 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'La sección de "Formación Académica" no puede estar vacía.',
        type: 'error',
      });
      this.educationError = true;
      return;
    }

    this.educationError = false;
    this.sendInformation = {
      ...this.sendInformation,
      education: [
        {
          _id: '60550ac03571872db47680f8',
          name: 'Tecnólogo 2',
          description: 'Tecnico',
          type: 'ejemplo',
          status: true,
          createdAt: '2021-03-19T20:34:08.646Z',
          updatedAt: '2021-03-25T21:49:24.517Z',
        },
      ],
    };
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
    return true;
  }
  onSaveRolResponsabilities() {
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
    return true;
  }
  onSaveTalents() {
    if (this.talents.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message: 'Debe seccionar al menos un item de la lista de "Talentos".',
        type: 'error',
      });
      this.talentsError = true;
      return;
    }
    this.talentsError = false;
    this.sendInformation = {
      ...this.sendInformation,
      talents: this.talents.selectedOptions.selected.map((value) => value.value),
    };
    return true;
  }
  onSaveSecurityResp() {
    if (this.securityResponsabilities.selectedOptions.selected.length === 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Acción Incorrecta',
        message:
          'Debe seccionar al menos un item de la lista de "Responsabilidades para Seguridad y Salud en el Trabajo".',
        type: 'error',
      });
      this.securityRespError = true;
      return;
    }
    this.securityRespError = false;
    this.sendInformation = {
      ...this.sendInformation,
      securityResponsabilities: this.securityResponsabilities.selectedOptions.selected.map(
        (value) => value.value
      ),
    };
    return true;
  }
  onSaveCorporativeCompetences() {
    this.sendInformation = {
      ...this.sendInformation,
      corporativeCompetences: {
        assertiveComunication: this.dataAssertiveComunication.filteredData,
        achievementOrientation: this.dataAchievementOrientation.filteredData,
        serviceOrientation: this.dataServiceOrientation.filteredData,
        teamwork: this.dataTeamwork.filteredData,
      },
    };
    return true;
  }
    /**
   * @author Hanna
   * @description Esta función valida los campos de formación académica que se repiten y
   * los devuelve en una lista.
   */
  duplicatedEducationItems() {
    const busqueda = this.form.value.academicEducation.reduce((accumulator: any, obj: any) => {
      accumulator[obj.education] = ++accumulator[obj.education] || 0;
      return accumulator;
    }, {});

    const duplicados = this.form.value.academicEducation.filter((obj: any) => {
      return busqueda[obj.education];
    });
    return duplicados;
  }

  onCancel() {
    this.sendInformation = {};
    this.isEditable = false;
  }

  fieldExperienceValidation(field: string) {
    if (!this.formExperience.value[field]) {
      this.formExperience.get(field)?.patchValue(0);
    }
    if (this.formExperience.value[field] > 60) {
      this.formExperience.get(field)?.setErrors({ error: 'El número ingresado no es válido.' });
      return;
    }
    this.formExperience.value[field] = Number(this.formExperience.value[field]);
  }

  pipeYears(year: number = 0) {
    return year > 1 || year === 0 ? `${year} años` : `${year} año`;
  }

  /**
   * @author Hanna
   * @description Esta función le da un formato más diciente, a las fechas de
   * la sección de historial. (ejemplo: Febrero 2021)
   */
  onTransformDate(date: string) {
    return `${this.monthNames[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`;
  }

  concatTableData(element: AcademicEducationTable[]) {
    const area = element.map((el: any) => el.name);
    return area.join(', ');
  }
  applyFilter(event: any) {
    this.readOnlyEducationDatasource.filter = event.value;
    if (this.readOnlyEducationDatasource.filteredData.length === 0) {
      this.showNotFoundMessage = true;
    } else {
      this.showNotFoundMessage = false;
    }
  }

  selectedResponsability(event: any) {
    event.content = event.content.filter((el: any) => el !== undefined);
    this._dialog
      .open(ResponsabilitiesDescComponent, {
        data: event,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((resp: any) => {});
  }

  selectAcademicEducationValidation(event: any) {
    const selectedValueIsDuplicated = this.duplicatedEducationItems().filter(
      (el: AcademicEducationTable) => el.education === event.value
    );
    if (selectedValueIsDuplicated.length !== 0) {
      this.notificationService.openSimpleSnackBar({
        title: 'Información Duplicada',
        message: 'Ya existe esta formación académica.',
        type: 'warning',
      });
      this.educationError = true;
      return;
    }
  }
}
