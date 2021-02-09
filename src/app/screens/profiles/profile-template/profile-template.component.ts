import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Tables } from '@app/shared/interfaces/profile-competences.interface';
import { ProfileTemplateService } from './services/profile-template.service';
import { MatSelectionList } from '@angular/material/list';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { ProfileFormHistoryComponent } from './profile-form-history/profile-form-history.component';
import { SnackOptionsInterface } from '@shared/interfaces/notification.interface';
import { ActivatedRoute } from '@angular/router';

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
  @ViewChild('talents') talents!: MatSelectionList;
  @ViewChild('securityResp') securityResp!: MatSelectionList;
  // @ViewChild('assertiveComunicationTable') assertiveComunicationTable!: CdkTable<Tables>;
  dataAssertiveComunication!: MatTableDataSource<Tables>;
  dataAchievementOrientation!: MatTableDataSource<Tables>;
  dataServiceOrientation!: MatTableDataSource<Tables>;
  dataTeamwork!: MatTableDataSource<Tables>;
  percent: any = {};
  data: any = [];
  securityResponsabilitiesData!: any;
  getAllData: any;

  contentPagesEducation = [];
  // contentPagesSecurityResp: any;
  contentPagesSpecificKnowledge = [];
  contentPagesRequiredCertificates = [];
  contentPagesRolResponsabilities = [];
  contentPagesTalents = [];
  contentPagesSecurityResponsabilities = [];
  isEditable = false;
  nextPageButtonDisabledEducation = false;
  nextPageButtonDisabledRequiredCertificates = false;
  nextPageButtonDisabledSpecificKnowledge = false;
  nextPageButtonDisabledRolResponsabilities = false;
  nextPageButtonDisabledTalents = false;
  nextPageButtonDisabledSecurityResp: any;
  beforePageButtonDisabledSecurityResp: any;
  beforePageButtonDisabledEducation = true;
  beforePageButtonDisabledRequiredCertificates = true;
  beforePageButtonDisabledSpecificKnowledge = true;
  beforePageButtonDisabledRolResponsabilities = true;
  beforePageButtonDisabledTalents = true;
  selectedOptions: any = [];
  public tabIndexEducation = 0;
  public tabIndexSpecificKnowledge = 0;
  public tabIndexRequiredCertificates = 0;
  public tabIndexRolResponsabilities = 0;
  public tabIndexTalents = 0;
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
  /* Errors */
  educationError = false;
  requiredCertificatesError = false;
  specificKnowledgeError = false;
  rolResponsabilitiesError = false;
  talentsError = false;
  idBaseTeam = this.activatedRoute.snapshot.params.idBaseTeam;
  charge = this.activatedRoute.snapshot.params.charge;
  level = this.activatedRoute.snapshot.params.level;
  /* History */
  i: any;
  historyId!: string;
  existentDate!: string;
  historyFilter: any = [];
  onHistory = false;
  history: any = [];
  // history = [
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2021-01-13',
  //     id: 456,
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2021-01-15',
  //     id: 123,
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2021-01-12',
  //     id: 'id3',
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2020-12-12',
  //     id: 'id3',
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2020-12-12',
  //     id: 'id3',
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2020-12-12',
  //     id: 'id3',
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2020-12-12',
  //     id: 'id3',
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2020-11-12',
  //     id: 'id3',
  //   },
  //   {
  //     name: 'Lina Jaramillo',
  //     description:
  //       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
  //     date: '2020-11-12',
  //     id: 'id3',
  //   },
  // ];

  constructor(
    private profileTemplateService: ProfileTemplateService,
    private notificationService: NotificationService,
    private _dialog: MatDialog, // private cd: ChangeDetectorRef
    private activatedRoute: ActivatedRoute
  ) {
  }
  // refresh() {
  //   this.cd.detectChanges();
  // }
  ngOnInit(): void {
    this.getData();
  }

  getTotalPercent(table: any) {
    switch (table) {
      case 'assertiveCommunication':
        return this.dataAssertiveComunication.filteredData
          .map((item) => item.measureApproval)
          .reduce(
            (acc, value) =>
              Math.round(acc + value / this.dataAssertiveComunication.filteredData.length),
            0
          );
      case 'achievementOrientation':
        return this.dataAchievementOrientation.filteredData
          .map((item) => item.measureApproval)
          .reduce(
            (acc, value) =>
              Math.round(acc + value / this.dataAchievementOrientation.filteredData.length),
            0
          );
      case 'serviceOrientation':
        return this.dataServiceOrientation.filteredData
          .map((item) => item.measureApproval)
          .reduce(
            (acc, value) =>
              Math.round(acc + value / this.dataServiceOrientation.filteredData.length),
            0
          );
      case 'teamwork':
        return this.dataTeamwork.filteredData
          .map((item) => item.measureApproval)
          .reduce(
            (acc, value) => Math.round(acc + value / this.dataTeamwork.filteredData.length),
            0
          );
    }
  }

  onChangeSliderValue(ev: MatSliderChange, id: any, element: any) {
    this.percent[id] = ev.value;
    element.measureApproval = this.percent[element._id];
  }

  /**
   * @autor Hanna
   * @description Función que muestra como estaba el perfil en determinado tiempo,
   * dependiendo de lo que se selecione es la sección historial.
   */
  async onPreview(id: any, drawer: any) {
    this.profileTemplateService.historyActions('get')?.then((res: any) => {
      this.data = res.filter((profile: any) => profile.idBaseProfile === id)[0];
    });
    console.log(this.data);
    // this.data = showProfileHistory.filter((profile: any) => profile._id === id)[0];
    this.onHistory = true;
    drawer.toggle();
  }
  /**
   * @autor Hanna
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
        moment.default(item.createdAt).isSameOrAfter(startDate) &&
        moment.default(item.createdAt).isSameOrBefore(endDate)
    );
  }
  /**
   * @autor Hanna
   * @description Función que filtra el contenido del historial con la
   * fecha inicial digitada y la fecha final digitada.
   */
  onSelectEndDate(event: any) {
    const endDate = moment.default(event.value).format('YYYY-MM-DD');
    const startDate = moment.default(this.formFilterHistory.value.startDate).format('YYYY-MM-DD');
    this.historyFilter = this.history.filter(
      (item: any) =>
        moment.default(item.createdAt).isSameOrAfter(startDate) &&
        moment.default(item.createdAt).isSameOrBefore(endDate)
    );
  }

  exitHistory(drawer: any) {
    this.getData();
    this.onHistory = false;
    drawer.toggle();
  }
  /**
   * @autor Hanna
   * @description Las funciones "nextTab" & "beforeTab", son funciones que
   * controlan la navegación de los tabs, en las listas en cada sección.
   */
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
      case 'talents':
        this.tabIndexTalents = this.tabIndexTalents + 1;
        if (this.tabIndexTalents > 0) {
          this.beforePageButtonDisabledTalents = false;
        }
        if (this.tabIndexTalents === length - 1) {
          this.nextPageButtonDisabledTalents = true;
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
      case 'talents':
        this.tabIndexTalents = this.tabIndexTalents - 1;
        this.nextPageButtonDisabledTalents = false;
        if (this.tabIndexTalents === 0) {
          this.beforePageButtonDisabledTalents = true;
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
   * @autor Hanna
   * @description Esta función consulta el json de la información de la aplicación y
   * la asigna a sus respectivas variables.
   */
  getData() {
    this.profileTemplateService.getData(this.idBaseTeam, this.charge, this.level ? this.level : null).then((res: any) => {
      console.log(res);
      this.data = res[0];
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
    this.profileTemplateService.historyActions('get')?.then((res: any) => {
      this.history = res.map((item: any) => {
        item.createdAt = moment.default(item.createdAt).format('YYYY-MM-DD');
        item.showDate = this.showDate(item.createdAt);
        return item;
      });
      this.history.sort((a: any, b: any) => (a.createdAt < b.createdAt ? 1 : -1));
      this.historyFilter = this.history;
    });
    // this.getSecurityResponsabilities();
  }
  /**
   * @autor Hanna
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
  // getSecurityResponsabilities() {
  //   this.profileTemplateService.getAllSecurityResponsabilities().then((res: any) => {
  //     this.securityResponsabilitiesData = res;
  //   });
  // }

  /**
   * @autor Hanna
   * @description Función que asigna los valores actuales a cada sección, cuando
   * está en el estado de editar.
   */
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
    /* Talents */
    this.profileTemplateService.getAllTalents().then((res: any) => {
      this.buildPagesAndColumnsList2(res, 'talents');
    });
    /* Security Responsabilities */
    // this.profileTemplateService.getAllSecurityResponsabilities().then((res: any) => {
    //   this.buildPagesAndColumnsList(res, 'securityResponsabilities');
    // });

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
  /**
   * @autor Hanna
   * @description Función que construye las columnas de las opciones que se mostrarán en
   * cada página o tab de las secciones que contengan listas.Esta función arma un máximo
   * de 3 columnas. La función "buildPagesAndColumnsList2", por ser secciones de menor tamaño,
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
    if (newarrayPages.length !== 0) {
      finalArrayPages = [...finalArrayPages, newarrayPages];
    }
    console.log(finalArrayPages);
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

  /**
   * @autor Hanna
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
  onSave() {
    if (
      this.onSaveObjective() === true &&
      this.onSaveEperience() === true &&
      this.onSaveeEucation() === true &&
      this.onSaveRequiredCertificates() === true &&
      this.onSaveSpecificKnowledge() === true &&
      this.onSaveRolResponsabilities() === true &&
      this.onSaveTalents() === true &&
      this.onSaveCorporativeCompetences() === true
    ) {
      const saveHistorial: SnackOptionsInterface = {
        title: 'Guardar en Historial',
        message: '¿Desea que el registro de los cambios se guarde en el historial?',
        type: 'warning',
      };
      this.notificationService
        .openComplexSnackBar(saveHistorial)
        .afterClosed()
        .subscribe((resp) => {
          if (resp) {
            this._dialog
              .open(ProfileFormHistoryComponent, {
                data: {
                  ...this.sendInformation,
                },
                autoFocus: false,
              })
              .afterClosed()
              .subscribe((resp: any) => {
                resp = {
                  ...resp,
                  idBaseTeam: this.data.idBaseTeam,
                  idBaseProfile: this.data.idBaseProfile,
                  charge: this.data.charge,
                  nameBaseTeam: this.data.teamName,
                  securityResponsabilities: this.data.securityResponsabilities,
                };
                console.log('reporte Historial', resp);
                this.profileTemplateService.historyActions('post', resp)?.then((res: any) => {
                  console.log(res);
                  this.notificationService.openSimpleSnackBar({
                    title: 'Operación Finalizada',
                    message:
                      'La información se ha actualizado con éxito y su historial fue creado.',
                    type: 'success',
                  });
                  this.getData();
                  this.isEditable = false;
                });
              });
          } else {
            this.sendInformation = {
              ...this.sendInformation,
              idBaseTeam: this.data.idBaseTeam,
              idBaseProfile: this.data.idBaseProfile,
              charge: this.data.charge,
              nameBaseTeam: this.data.teamName,
              securityResponsabilities: this.data.securityResponsabilities,
              status: this.data.status,
            };
            this.profileTemplateService
              .updateProfile(this.data.idBaseProfile, this.sendInformation)
              .then((res: any) => {
                this.notificationService.openSimpleSnackBar({
                  title: 'Operación Finalizada',
                  message: 'La información se ha actualizado con éxito.',
                  type: 'success',
                });
                this.getData();
                this.isEditable = false;
              });
          }
        });
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
    console.log(this.education.selectedOptions.selected.map((value) => value.value));
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
    // console.log(this.rolResponsabilities.selectedOptions.selected.map((value) => value.value));
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
    console.log(this.talents.selectedOptions.selected.map((value) => value.value));
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

  onCancel() {
    this.sendInformation = {};
    this.isEditable = false;
  }
  /**
   * @autor Hanna
   * @description Esta función limita los campos a que solo reciban números,
   * impidiendo al usuario escribir letras.
   */
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

  /**
   * @autor Hanna
   * @description Esta función le da un formato más diciente, a las fechas de
   * la sección de historial.
   */
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
