import { Component, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MasterInfoService } from '../services/master-info.service';
import { MasterInfoDialog } from '../interfaces/master-info-dialog';
import { NotificationService } from '@shared/components/notification/services/notification.service';

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
  types: any;
  masters: any;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private masterInfoService: MasterInfoService,
    private dialogRef: MatDialogRef<MasterInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MasterInfoDialog
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.createForm();
    this.initForm();
    this.fillTypesList();
    this.fillMastersList();
  }

  inputTypeValidator() {
    if (this.form.value.type === 'EQUIPO_BASE') {
      this.form.get('submenu')?.enable();
    } else if (
      this.data.url === 'base-teams-categories' &&
      this.form.value.type !== 'EQUIPO_BASE' &&
      this.form.value.type !== null
    ) {
      this.notificationService.openSimpleSnackBar({
        title: 'Contenido Incorrecto',
        message: 'El contenido del campo "Tipo" es incorrecto.',
        type: 'error',
      });
      return;
    } else {
      this.form.get('submenu')?.disable();
    }
  }

  inputMasterValidator() {
    if (
      !this.masters.includes(this.form.value.masterReference) &&
      this.form.value.masterReference !== null
    ) {
      this.notificationService.openSimpleSnackBar({
        title: 'Contenido Incorrecto',
        message: 'El contenido del campo "Maestra" es incorrecto.',
        type: 'error',
      });
      return;
    }
  }

  async fillMastersList() {
    const masters = await this.masterInfoService.getData(this.data.url);
    let masterReferenceArray: any = [];
    masters.forEach((item: any) => {
      if (!masterReferenceArray.includes(item.masterReference)) {
        masterReferenceArray = [...masterReferenceArray, item.masterReference];
      }
    });
    this.masters = masterReferenceArray;
  }
  fillTypesList() {
    this.masterInfoService
      .getTypes(this.data)
      .then((response: any) => {
        if (response.length === 0 && this.data.url === 'base-teams-categories') {
          this.types = [{ name: 'EQUIPO_BASE' }];
          return;
        }
        this.types = response;
      })
      .catch((err) => {});
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      type: new FormControl(null),
      description: new FormControl({ value: '', disabled: this.data?.url === 'types' }),
      masterReference: new FormControl(null),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      url: new FormControl({ value: null, disabled: this.data?.url === 'base-teams-categories' }),
      status: new FormControl(''),
      submenu: new FormControl(''),
      imagePath: new FormControl({ value: '', disabled: true }),
    });
  }

  initForm(): void {
    if (this.data.url !== 'types') {
      this.form.controls.type?.setValidators([Validators.required]);
      this.form.controls.type?.updateValueAndValidity();
      this.form.controls.description?.setValidators([Validators.required]);
      this.form.controls.description?.updateValueAndValidity();
      this.form.controls.masterReference?.clearValidators();
    } else {
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
    console.log(event.target.files[0].name);
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
        this.form.value.type === 'EQUIPO_BASE'
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

  submenuDisabled() {
    if (this.data.url === 'base-teams-categories') {
      if (this.data.element && this.data.element.type !== 'EQUIPO_BASE') {
        return true;
      }
      return false;
    }
    return true;
  }
}
