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

@Component({
  selector: 'app-master-info',
  templateUrl: './master-info.component.html',
  styleUrls: ['./master-info.component.scss'],
})
export class MasterInfoComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('ej') ej: MatSelect | any;

  /* Rutas que manejan imagenes */
  public manage_images = ['modules', 'base-teams-categories'];
  private archivo!: string;
  private readonly DATE_FORM_CONTROL = 'yyyy-MM-dd';
  types: any[] = [];
  skills: any[] = [];
  masters: Masters[] = [];

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
    this.fillSkillsList();
    console.log(this.data)
  }

  fillTypesList() {
    this.masterInfoService
      .getTypes(this.data)
      .then((response: any) => {
        if (response.length === 0 && this.data.url === 'base-teams-categories') {
          this.types = [{ name: 'Habilidad' }, { name: 'Subgrupo' }];
          return;
        }
        this.types = response;
      })
      .catch((err) => {});
  }

  fillSkillsList() {
    this.masterInfoService.getSkills().then((response: any) => {
      this.skills = response;
    });
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: new FormControl(),
      name: new FormControl('', [Validators.required, this.customValidator.noWhitespaceValidator]),
      description: new FormControl({
        value: '',
        disabled: this.data?.url === 'types' || this.data?.url === 'security-responsabilities',
      }),
      type: new FormControl(null),
      masterReference: new FormControl(null),
      idParent: new FormControl({value: null, disabled: this.data?.url !== 'base-teams-categories' || true}),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      url: new FormControl({ value: null, disabled: this.data?.url === 'base-teams-categories' }),
      status: new FormControl(''),
      submenu: new FormControl({value: null, disabled: this.data?.url !== 'base-teams-categories'}),
      imagePath: new FormControl({ value: '', disabled: true }),
    });
  }

  initForm(): void {
    console.log(this.data);
    if (this.data.element && this.data.element.type !== 'Habilidad' && this.data?.url === 'base-teams-categories') {
      this.form.get('submenu')?.disable();
      this.form.get('idParent')?.enable();
    }
    if (this.data.url !== 'types') {
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
    } else {
      this.masters = this.data.masters.filter((master) => master.name !== 'Tipos');
      this.form.controls.masterReference?.setValidators([Validators.required]);
      this.form.controls.masterReference?.updateValueAndValidity();
      this.form.controls.type?.clearValidators();
      this.form.controls.description?.clearValidators();
    }

    if (this.data?.element) {
      this.form.patchValue(this.data.element);
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

  /* Para enviar las imagenes */
  createFormData() {
    const data = new FormData();
    data.append('image', this.archivo);
    data.append('body', JSON.stringify(this.form.getRawValue()));
    console.log(JSON.stringify(this.form.value));
    console.log(JSON.stringify(this.form.getRawValue()));
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
    console.log(this.data.url, this.form.value);
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
    console.log(this.data.url, this.form.value);
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

  updateRegisterToMaster() {
  this.updateRegister(false);
  }
  updateRegisterWithImageToMaster() {
    this.updateRegister(true);
  }

  updateRegister(haveImage: boolean) {
    console.log(this.data.url, this.data.element._id, this.createFormData());
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
      .subscribe((resp: any) => {
        /*
         * Acciones que se activan al dar click en el botón "guardar" del formulario.
         */
        resp = {
          ...resp,
          idMaster: id,
          ...withImage ? this.form.getRawValue() : this.form.value,
        };
        delete resp[`_id`];
        delete resp[`updatedAt`];
        delete resp[`createdAt`];
        /*
         * Se Guarda la información en historial y se actualiza la información del
         * perfil.
         */
        if (withImage){
          this.masterInfoService
            .updateToMasterWithImages(this.data.url, this.data.element._id, this.createFormData())
            ?.then(() => {
              this.historyMastersService.hitoryActionsAdminMaster('post', id, resp);
            })
            .then((response: any) => {
              console.log(response);
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
            console.log(response);
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
      console.log('FORM', this.form.value);
      console.log('FORM2', this.form.getRawValue());
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
              this.ej.value = 'Habilidad';
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
    this.form.get('submenu')?.disable();
    this.form.get('idParent')?.disable();
  }
}
