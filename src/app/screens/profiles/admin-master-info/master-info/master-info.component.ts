import { Component, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MasterInfoService } from '../services/master-info.service';
import { MasterInfoDialog, Masters } from '../interfaces/master-info-dialog';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { CustomValidatorService } from '@shared/utils/custom-validator.service';

@Component({
  selector: 'app-master-info',
  templateUrl: './master-info.component.html',
  styleUrls: ['./master-info.component.scss'],
})
export class MasterInfoComponent implements OnInit {
  form!: FormGroup;

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
    private customValidator: CustomValidatorService,
    private dialogRef: MatDialogRef<MasterInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MasterInfoDialog
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.initForm();
    this.fillTypesList();
    this.fillSkillsList();
  }


  fillTypesList() {
    this.masterInfoService
      .getTypes(this.data)
      .then((response: any) => {
        if (response.length === 0 && this.data.url === 'base-teams-categories') {
          this.types = [{ name: 'Habilidad' },{ name: 'Subgrupo' }];
          return;
        }
        this.types = response;
      })
      .catch((err) => {});
  }

  fillSkillsList() {
    this.masterInfoService
    .getSkills()
    .then((response: any) => {
      this.skills = response;
    })
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: new FormControl(),
      name: new FormControl('', [Validators.required, this.customValidator.noWhitespaceValidator]),
      description: new FormControl({ value: '', disabled: this.data?.url === 'types' || this.data?.url === 'security-responsabilities' }),
      type: new FormControl({ value: '', disabled: this.data?.url === 'security-responsabilities'}),
      masterReference: new FormControl(null),
      idParent: new FormControl({ value: '', disabled: true }),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      url: new FormControl({ value: null, disabled: this.data?.url === 'base-teams-categories' }),
      status: new FormControl(''),
      submenu: new FormControl(''),
      imagePath: new FormControl({ value: '', disabled: true }),
    });
  }

  initForm(): void {
    console.log(this.data)
    if (this.data.element && this.data.element.type !== 'Habilidad') {
      this.form.get('submenu')?.disable();
      this.form.get('idParent')?.enable();

    }
    if (this.data.url !== 'types') {
      this.form.controls.type?.setValidators([Validators.required]);
      this.form.controls.type?.updateValueAndValidity();
      this.form.controls.description?.setValidators([Validators.required, this.customValidator.noWhitespaceValidator]);
      this.form.controls.description?.updateValueAndValidity();
      this.form.controls.masterReference?.clearValidators();
      if (this.data.url === 'security-responsabilities') {
        this.form.controls.description?.clearValidators();
        this.form.controls.description?.updateValueAndValidity();
      }
    } else {
      this.masters = this.data.masters.filter(master => master.name !== 'Tipos');
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
    data.append('body', JSON.stringify(this.form.value));
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

  updateRegisterWithImageToMaster() {
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

  onClose(data: any = null): void {
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
        message: 'El campo "SubMenú" debe estar marcado.',
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
    if (this.data.url === 'base-teams-categories') {
      if (ev.value !== 'Habilidad') {
        this.form.get('submenu')?.disable();
        this.form.get('idParent')?.enable();

        this.form.controls.idParent?.setValidators([Validators.required]);
        this.form.controls.idParent?.updateValueAndValidity();
        return;
      }
      this.form.get('submenu')?.enable();
      this.form.get('idParent')?.disable();

      this.form.controls.idParent?.clearValidators();
      return;
    }
    this.form.get('submenu')?.disable();
    this.form.get('idParent')?.disable();

  }
}
