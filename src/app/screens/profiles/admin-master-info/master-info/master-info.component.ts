import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MasterInfoService } from '../services/master-info.service';
import { MasterInfoDialog, Masters } from '../interfaces/master-info-dialog';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { CustomValidatorService } from '@shared/utils/custom-validator.service';
import { ProfileOptionsService } from '../../profile-options/services/profile-options.service';
import { SnackOptionsInterface } from '@shared/interfaces/notification.interface';
import { MatSelect } from '@angular/material/select';
import { ProfileFormHistoryComponent } from '../../profile-template/profile-form-history/profile-form-history.component';
import { HistoryMastersService } from '../history/service/history-master.service';
import { GeneralMaster, Syllabi, Type } from './interfaces.interface';

@Component({
  selector: 'app-master-info',
  templateUrl: './master-info.component.html',
  styleUrls: ['./master-info.component.scss'],
})
export class MasterInfoComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('typeReference') typeReference: MatSelect | any;

  /* Rutas que manejan imagenes */
  public manage_images = ['modules', 'base-teams-categories','member-carousel'];
  private archivo!: string;
  private readonly DATE_FORM_CONTROL = 'yyyy-MM-dd';
  types: {name:string}[] | Type[] = [];
  platforms: Type[] = [];
  domains: GeneralMaster[] = [];
  skills: GeneralMaster[] = [];
  masters: Masters[] = [];
  knowledgeAreaList: Syllabi[] | Type[] = [];
  specificKnowledgeList: Syllabi[] = [];
  idSyllabi!: string;
  formationList = ['Específica', 'Básica'];
  private readonly CERTIFICATION = 'Certificación';

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private masterInfoService: MasterInfoService,
    private profileOptionsService: ProfileOptionsService,
    private customValidator: CustomValidatorService,
    private dialogRef: MatDialogRef<MasterInfoComponent>,
    private _dialog: MatDialog,
    private historyMastersService: HistoryMastersService,
    @Inject(MAT_DIALOG_DATA) public data: MasterInfoDialog
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.initForm();
    this.fillTypesList();
    this.fillPlatformList();
    this.fillSkillsList();
    this.fillDomainsList();
  }

  filerSelectList(source: string) {
    switch (source) {
      case 'dominioField':
        if (this.data.url !== 'syllabi') {
          this.masterInfoService.getSyllabiLists(this.form.value.idDomain).then((res: any) => {
            const allAreaKnowledgeWithOutDuplicates = res.filter(
              (obj: Syllabi, index: number, arraySource: Syllabi[]) =>
                arraySource.findIndex(
                  (element: Syllabi) => element.knowledgeArea === obj.knowledgeArea
                ) === index
            );
            this.knowledgeAreaList = allAreaKnowledgeWithOutDuplicates;
          });
          if (this.data.url !== 'functions') {
            this.notNullData('knowledgeArea');
          }
        } else {
          this.masterInfoService
            .getTypes(this.data)
            .then((response: Type[]) => {
              this.knowledgeAreaList = response;
            })
            .catch((err) => {
              this.notificationService.openSimpleSnackBar({
                title: 'Ha ocurrido un error',
                message: err.message,
                type: 'error',
              });
            });
          this.notNullData('knowledgeArea');
        }
        break;
      case 'knowledgeAreaField':
        if (this.data.url !== 'syllabi') {
          this.masterInfoService
            .getSyllabiLists(this.form.value.idDomain, this.form.value.knowledgeArea)
            .then((res: any) => {
              const allSpecificKnowledgeWithOutDuplicates = res.filter(
                (obj: Syllabi, index: number, arraySource: Syllabi[]) =>
                  arraySource.findIndex(
                    (element: Syllabi) => element.specificKnowledge === obj.specificKnowledge
                  ) === index
              );
              this.specificKnowledgeList = allSpecificKnowledgeWithOutDuplicates;
            });
          if (this.data.url !== 'courses-certifications') this.notNullData('specificKnowledge');
        }
        break;
      case 'specificKnowledgeField':
        this.masterInfoService
          .getSyllabiLists(
            this.form.value.idDomain,
            this.form.value.knowledgeArea,
            this.form.value.specificKnowledge
          )
          .then((res: any) => {
            this.idSyllabi = res[0]._id;
          });
        break;
    }
  }

  fillTypesList() {
    if (this.data.url === 'base-teams-categories') {
      this.types = [{name:'Habilidad'}, {name:'Subgrupo'}];
      return;
    }
    if (this.data.url === 'courses-certifications') {
      this.types = [{name: 'Curso'}, {name: 'Certificación'}];
      return;
    }
    this.masterInfoService
      .getTypes(this.data)
      .then((response: Type[]) => {
        this.types = response;
      })
      .catch((err) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Ha ocurrido un error',
          message: err.message,
          type: 'error',
        });
      });
  }

  fillPlatformList() {
    this.masterInfoService
      .getTypes(this.data)
      .then((response: Type[]) => {
        this.platforms = response;
      })
      .catch((err) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Ha ocurrido un error',
          message: err.message,
          type: 'error',
        });
      });
  }

  fillSkillsList() {
    this.masterInfoService.getSkills().then((response: any) => {
      this.skills = response;
    });
  }

  fillDomainsList() {
    this.masterInfoService.getDomains().then((response: any) => {
      this.domains = response;
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: new FormControl(),
      platform: new FormControl(null),
      technology: new FormControl(null),
      formation: new FormControl(null),
      name: new FormControl(''),
      description: new FormControl({
        value: '',
        disabled:
          this.data?.url === 'types' ||
          this.data?.url === 'security-responsabilities' ||
          this.data?.url === 'courses-certifications' ||
          this.data?.url == 'member-carousel'

      }),
      type: new FormControl({
        value: null,
        disabled:
          this.data?.url === 'education-area' ||
          this.data?.url === 'studies' ||
          this.data?.url === 'functions' ||
          this.data?.url === 'domain' ||
          this.data?.url === 'member-carousel'
      }),
      idDomain: new FormControl(null),
      knowledgeArea: new FormControl(null),
      specificKnowledge: new FormControl(null),
      masterReference: new FormControl(null),
      idParent: new FormControl({
        value: null,
        disabled: this.data?.url !== 'base-teams-categories' || true,
      }),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      url: new FormControl({ value: null, disabled: this.data?.url === 'base-teams-categories' || this.data?.url === 'member-carousel' }),
      status: new FormControl(''),
      submenu: new FormControl({
        value: null,
        disabled: this.data?.url !== 'base-teams-categories'
      }),
      imagePath: new FormControl({ value: '', disabled: true }),
    });
  }

  formValidations() {
    if (
      this.data.element &&
      this.data.element.type !== 'Habilidad' &&
      this.data?.url === 'base-teams-categories'
    ) {
      this.form.get('submenu')?.disable();
      this.form.get('idParent')?.enable();
    }
    if (this.data.url !== 'syllabi') {
      this.form.controls.name?.setValidators([Validators.required]);
      this.form.controls.name?.updateValueAndValidity();
    }
    if (this.data.url !== 'member-carousel') {
      this.form.controls.name?.setValidators([Validators.required]);
      this.form.controls.name?.updateValueAndValidity();
    }
    if (this.data.url !== 'types') {
      if (this.data.url !== 'syllabi') {
        this.form.controls.type?.setValidators([Validators.required]);
        this.form.controls.type?.updateValueAndValidity();
        this.form.controls.description?.setValidators([
          Validators.required,
          this.customValidator.noWhitespaceValidator,
        ]);
        this.form.controls.description?.updateValueAndValidity();
        this.form.controls.masterReference?.clearValidators();
        if (this.data.url === 'security-responsabilities') {
          this.form.controls.description?.clearValidators();
          this.form.controls.description?.updateValueAndValidity();
        }
      }
      if (this.data.url === 'functions') {
        this.form.controls.idDomain?.setValidators([Validators.required]);
        this.form.controls.idDomain?.updateValueAndValidity();
      } else {
        this.form.controls.idDomain?.clearValidators();
      }
      if (this.data.url === 'courses-certifications') {
        this.form.controls.idDomain?.setValidators([Validators.required]);
        this.form.controls.idDomain?.updateValueAndValidity();
        this.form.controls.knowledgeArea?.setValidators([Validators.required]);
        this.form.controls.knowledgeArea?.updateValueAndValidity();
        this.form.controls.specificKnowledge?.clearValidators();
        // this.form.controls.specificKnowledge?.setValidators([Validators.required]);
        // this.form.controls.specificKnowledge?.updateValueAndValidity();
        this.form.controls.platform?.setValidators([Validators.required]);
        this.form.controls.platform?.updateValueAndValidity();
      } else {
        this.form.controls.idDomain?.clearValidators();
        this.form.controls.knowledgeArea?.clearValidators();
        // this.form.controls.specificKnowledge?.clearValidators();
        this.form.controls.platform?.clearValidators();
        this.form.controls.formation?.clearValidators();
      }
      if (this.data.url === 'syllabi') {
        this.form.controls.name?.clearValidators();
        this.form.controls.idDomain?.setValidators([Validators.required]);
        this.form.controls.idDomain?.updateValueAndValidity();
        this.form.controls.knowledgeArea?.setValidators([Validators.required]);
        this.form.controls.knowledgeArea?.updateValueAndValidity();
        this.form.controls.specificKnowledge?.setValidators([Validators.required]);
        this.form.controls.specificKnowledge?.updateValueAndValidity();
      } else {
        this.form.controls.knowledgeArea?.clearValidators();
        this.form.controls.specificKnowledge?.clearValidators();
        this.form.controls.idDomain?.clearValidators();
      }
    } else {
      console.log(this.data.masters);
      this.masters = this.data.masters.filter((master) => master.haveTypeField);
      this.form.controls.masterReference?.setValidators([Validators.required]);
      this.form.controls.masterReference?.updateValueAndValidity();
      this.form.controls.type?.clearValidators();
      this.form.controls.description?.clearValidators();
    }
  }

  notNullData(field: any) {
    if (
      this.form.value[`field`] === null ||
      this.form.value[`field`] === undefined ||
      this.form.value[`field`] === ''
    ) {
      this.form.get(field)?.setErrors({ error: 'Campo obligatorio' });
    }
  }
  notNullImage(field: any) {
    if (
      this.form.value[`field`] === null ||
      this.form.value[`field`] === undefined ||
      this.form.value[`field`] === ''
    ) {
      this.form.get(field)?.setErrors({ error: 'Campo obligatorio' });
    }
  }

  initForm(): void {
    this.formValidations();
    if (this.data?.element) {
      /**
       * Si entra por este condicional, llena los campos del formulario, con la información
       * que venga de la fila que se va a editar.
       */
      if (this.data.element.syllabi) {
        this.form.get('idDomain')?.patchValue(this.data.element.syllabi[0].idDomain);
        this.filerSelectList('dominioField');
        this.form.get('knowledgeArea')?.patchValue(this.data.element.syllabi[0].knowledgeArea);
        this.filerSelectList('knowledgeAreaField');
        this.form
          .get('specificKnowledge')
          ?.patchValue(this.data.element.syllabi[0].specificKnowledge);
        this.filerSelectList('specificKnowledgeField');
      } else if (this.data.element.domain) {
        this.form.get('idDomain')?.patchValue(this.data.element.domain[0]._id);
        this.filerSelectList('dominioField');
      }

      this.form.patchValue(this.data.element);
      this.platformValidation(this.form.get('type')?.value === this.CERTIFICATION);
      this.form
        .get('createdAt')
        ?.patchValue(this.datePipe.transform(this.data.element.createdAt, this.DATE_FORM_CONTROL));
      this.form
        .get('updatedAt')
        ?.patchValue(this.datePipe.transform(this.data.element.updatedAt, this.DATE_FORM_CONTROL));
      return;
    }

    this.form.get('status')?.patchValue(true);
    this.form.get('submenu')?.patchValue(null);

    this.form
      .get('createdAt')
      ?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
    this.form
      .get('updatedAt')
      ?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
  }

  platformValidation(validation: boolean) {
    if (this.data.url !== 'courses-certifications') return;
    if (validation) {
      this.form.get('platform')?.reset();
      this.form.get('platform')?.disable();
      this.form.controls.platform?.clearValidators();
    } else {
      this.form.controls.platform?.setValidators([Validators.required]);
      this.form.controls.platform?.updateValueAndValidity();
      this.form.get('platform')?.enable();
    }
  }

  /* Para enviar las imagenes */
  createFormData() {
    const data = new FormData();
    data.append('image', this.archivo);
    data.append('body', JSON.stringify(this.form.getRawValue()));
    return data;
  }

  showNotification(response: any) {
    this.notificationService.openSimpleSnackBar({
      title: 'Acción exitosa',
      message: response?.message,
      type: 'success',
    });
    this.onClose({ data: response.payload });
  }

  addRegisterWithImageToMaster() {
    this.masterInfoService
      .addRegisterToMasterWithImages(this.data.url, this.createFormData())
      .then((response: any) => this.showNotification(response))
      .catch((err) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Error Inesperado',
          message: err.message,
          type: 'error',
        });
      });
  }

  addRegisterToMaster() {
    if (this.data.url === 'courses-certifications') {
      this.form.value.idSyllabi = this.idSyllabi;
    }
    this.form.value.name = this.removeWhiteSpaces(this.form.value.name);
    this.masterInfoService
      .addRegisterToMaster(this.data.url, this.form.value)
      .then((response: any) => this.showNotification(response))
      .catch((err) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Error Inesperado',
          message: err.message,
          type: 'error',
        });
      });
  }

  removeWhiteSpaces(element: string){
    return element.trim()
  }

  updateRegisterToMaster() {
    this.updateRegister(false);
  }
  updateRegisterWithImageToMaster() {
    this.updateRegister(true);
  }

  updateRegister(haveImage: boolean) {
    const saveHistorial: SnackOptionsInterface = {
      title: 'Guardar en Historial',
      message: '¿Desea que el registro de los cambios se guarde en el historial?',
      type: 'warning',
      action: 'Con historial',
      contraryAction: 'Sin historial',
    };
    this.notificationService
      .openComplexSnackBar(saveHistorial)
      .afterClosed()
      .subscribe((resp) => {
        if (resp === 'close') return;
        if (resp) {
          this.onUpdatewithHistory(this.data.element._id, this.createFormData(), haveImage);
        } else {
          this.onUpdateWithOutHistory(haveImage);
        }
      });
  }
  onUpdatewithHistory(id: any, data: any, withImage: boolean) {
    /*
     * Se abre el formulario donde se ingresa la descripción de los cambios,
     * que se guardarán en el historial.
     */
    this._dialog
      .open(ProfileFormHistoryComponent, {
        data: {
          ...data,
        },
        autoFocus: false,
      })
      .afterClosed()
      .subscribe(async (resp: any) => {
        if (resp === 'close') return;
        let domainName: any;
        /*
         * Acciones que se activan al dar click en el botón "guardar" del formulario.
         */
        if (this.form.value.idDomain !== null) {
          domainName = await this.masterInfoService.getDomain(this.form.value.idDomain);
        }
        // resp = domainName.name
        resp = {
          ...resp,
          idMaster: id,
          ...(withImage ? this.form.getRawValue() : this.form.value),
          idDomain: this.form.value.idDomain !== null ? domainName.name : null,
        };
        delete resp[`_id`];
        delete resp[`updatedAt`];
        delete resp[`createdAt`];
        /*
         * Se Guarda la información en historial y se actualiza la información del
         * perfil.
         */
        if (this.data.url === 'courses-certifications') {
          this.form.value.idSyllabi = this.idSyllabi;
        }
        this.form.value.name = this.removeWhiteSpaces(this.form.value.name);
        if (withImage) {
          this.masterInfoService
            .updateToMasterWithImages(this.data.url, this.data.element._id, this.createFormData())
            ?.then(() => {
              this.historyMastersService.hitoryActionsAdminMaster('post', id, resp);
            })
            .then((response: any) => {
              this.notificationService.openSimpleSnackBar({
                title: 'Operación Finalizada',
                message: 'La información se ha actualizado con éxito y su historial fue creado.',
                type: 'success',
              });
              this.onClose();
            })
            .catch((error) => {
              this.notificationService.openSimpleSnackBar({
                title: 'Ocurrió un Error',
                message: error.message,
                type: 'error',
              });
            });
        } else {
          this.masterInfoService
            .updateRegisterToMaster(this.data.url, this.data.element._id, this.form.value)
            ?.then(() => {
              this.historyMastersService.hitoryActionsAdminMaster('post', id, resp);
            })
            .then((response: any) => {
              this.notificationService.openSimpleSnackBar({
                title: 'Operación Finalizada',
                message: 'La información se ha actualizado con éxito y su historial fue creado.',
                type: 'success',
              });
              this.onClose();
            })
            .catch((error) => {
              this.notificationService.openSimpleSnackBar({
                title: 'Ocurrió un Error',
                message: error.message,
                type: 'error',
              });
            });
        }
      });
  }

  onUpdateWithOutHistory(withImage: boolean) {
    if (this.data.url === 'courses-certifications') {
      this.form.value.idSyllabi = this.idSyllabi;
    }
    this.form.value.name = this.removeWhiteSpaces(this.form.value.name);
    if (withImage) {
      this.masterInfoService
        .updateToMasterWithImages(this.data.url, this.data.element._id, this.createFormData())
        .then((response: any) => this.showNotification(response))
        .catch((err) => {
          this.notificationService.openSimpleSnackBar({
            title: 'Error Inesperado',
            message: err.message,
            type: 'error',
          });
        });
    } else {
      this.masterInfoService
        .updateRegisterToMaster(this.data.url, this.data.element._id, this.form.value)
        .then((response: any) => this.showNotification(response))
        .catch((err) => {
          this.notificationService.openSimpleSnackBar({
            title: 'Error Inesperado',
            message: err.message,
            type: 'error',
          });
        });
    }
  }
  onFileChange(event: any) {
    this.form.get('imagePath')?.patchValue(event.target.files[0].name);


    if (
      event.target.files.length > 0 &&
      ['jpg', 'png', 'svg'].includes(event.target.files[0].name.split('.')[1])
    ) {
      this.archivo = event.target.files[0];
      return;
    }
    this.notificationService.openSimpleSnackBar({
      title: 'Imagen seleccionada',
      message: 'El archivo debe de tener extensión .jpg .png .svg',
      type: 'error',
    });
  }

  onClose(data: any = {}): void {
    this.dialogRef.close(data);
  }

  onSubmit() {

    console.log();

    if (this.data.url === 'member-carousel' &&
    this.form.get('imagePath')?.value == ''
    ){
      this.notificationService.openSimpleSnackBar({
        title: 'Campo Obligatorio',
        message: 'Inserte una imagen para guardad.',
        type: 'error',
      });
      return;
    }


    if (
      this.form.get('submenu')?.value === null &&
      this.data.url === 'base-teams-categories' &&
      this.form.value.type === 'Habilidad'
    ) {
      this.notificationService.openSimpleSnackBar({
        title: 'Campo Obligatorio',
        message: 'El campo "Subgrupo" debe estar marcado.',
        type: 'error',
      });
      return;
    }

    if (this.form.invalid) {
      console.log(this.form);

      this.form.markAllAsTouched();
      this.notificationService.openSimpleSnackBar({
        title: 'Campos obligatorios',
        message: 'Revisa la información del formulario',
        type: 'error',
      });
      return;
    }

    if (this.data?.element) {
      this.manage_images.includes(this.data.url)
        ? this.updateRegisterWithImageToMaster()
        : this.updateRegisterToMaster();
      return;
    }

    this.manage_images.includes(this.data.url)
      ? this.addRegisterWithImageToMaster()
      : this.addRegisterToMaster();
  }

  submenuDisabled(ev: any) {
    if (ev.value !== 'Habilidad') {
      this.form.get('submenu')?.disable();
      this.form.get('submenu')?.patchValue(false);
      this.form.get('idParent')?.enable();
      this.form.controls.idParent?.setValidators([Validators.required]);
      this.form.controls.idParent?.updateValueAndValidity();
      return;
    }
    this.form.get('idParent')?.patchValue(null);
    this.form.get('submenu')?.enable();
    this.form.get('idParent')?.disable();
    this.form.controls.idParent?.clearValidators();
  }

  changeSubgroupOption(event: any) {
    if (this.data.element) {
      const id: any = this.data.element._id;
      this.profileOptionsService.getSubBaseTeams(id).then((res: any) => {
        if (res.map((item: any) => item.status === true).length !== 0 && !event.value) {
          this.notificationService.openSimpleSnackBar({
            title: 'Acción no Válida',
            message:
              'No puede cambiar el valor de "Subgrupo", porque la habilidad ya tiene subgrupos asignados.',
            type: 'error',
          });
          this.form.get('submenu')?.patchValue(true);
        }
      });
    }
  }

  changeStatusOption(event: any) {
    if (this.data.element) {
      this.masterInfoService.getData(this.data.url, this.data.element.idParent).then((res: any) => {
        if (this.form.value.type === 'Subgrupo') {
          if (res.type !== 'Habilidad' || !res.submenu) {
            this.notificationService.openSimpleSnackBar({
              title: 'Acción no Válida',
              message:
                'No puede cambiar el valor del estado. La habilidad a la que pertenecía el subgrupo no está disponible o no incluye subgrupos.',
              type: 'error',
            });
            this.form.get('status')?.patchValue(false);
          }
        }
      });
    }
  }

  typeValidation(ev: any) {
    if (this.data.url === 'base-teams-categories') {
      /**
       * Si data.element es diferente de vacío, significa que la función
        fue activada desde el botón editar y la información que hay en element,
        es la información de la fila que se está editando.
      */
      if (this.data.element) {
        const id: any = this.data.element._id;
        if (ev.value === 'Subgrupo') {
          this.profileOptionsService.getSubBaseTeams(id).then((res: any) => {
            if (res.map((item: any) => item.status === true).length !== 0) {
              this.notificationService
                .openComplexSnackBar({
                  title: 'Cambiar Tipo',
                  message:
                    'La habilidad que está tratando de cambiar, ya tiene subgrupos asignados; debe inhabilitarlos para continuar.',
                  type: 'error',
                  action: 'Aceptar',
                  contraryAction: 'Cancelar',
                })
                .afterClosed()
                .subscribe((resp: boolean | string) => {
                  if (resp === 'close') return;
                  if (resp) return;
                });
              this.typeReference.value = 'Habilidad';
              return;
            }
            this.skills = this.skills.filter((el: any) => el._id !== this.data.element._id);
            this.submenuDisabled(ev);
          });
        } else if (ev.value === 'Habilidad') {
          this.form.get('idParent')?.patchValue(null);
          this.submenuDisabled(ev);
        }
      } else {
        this.submenuDisabled(ev);
      }
      return;
    }
    this.platformValidation(ev.value === this.CERTIFICATION);
    this.form.get('submenu')?.disable();
    this.form.get('idParent')?.disable();
  }

  showOrHide(field: string) {
    const URL = this.data?.url;
    switch (field) {
      case 'name':
        if (URL !== 'syllabi') return true;
        break;
      case 'platform':
        if (URL === 'courses-certifications') return true;
        break;
      case 'technology':
        if (URL === 'courses-certifications') return true;
        break;
      case 'formation':
        if (URL === 'courses-certifications') return true;
        break;
      case 'description':
        if (
          URL !== 'security-responsabilities' &&
          URL !== 'courses-certifications' &&
          URL !== 'syllabi'
        )
          return true;
        break;
      case 'idDomain':
        if (URL === 'courses-certifications' || URL === 'functions' || URL === 'syllabi')
          return true;
        break;
      case 'masterReference':
        if (URL === 'types') return true;
        break;
      case 'type':
        if (URL !== 'types' && URL !== 'functions' && URL !== 'syllabi') return true;
        break;
      case 'knowledgeArea':
        if (URL === 'syllabi' || URL === 'courses-certifications') return true;
        break;
      case 'specificKnowledge':
        if (URL === 'syllabi') return true;
        break;
    }
  }
}
