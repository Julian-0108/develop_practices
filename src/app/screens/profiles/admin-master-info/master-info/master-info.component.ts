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
    } else {
      this.form.get('submenu')?.disable();
    }
  }

  async fillMastersList() {
    const x = await this.masterInfoService.getData(this.data.url);
    let masterReferenceArray: any = [];
    x.forEach((item: any) => {
      if (!masterReferenceArray.includes(item.masterReference)) {
        masterReferenceArray = [...masterReferenceArray, item.masterReference];
      }
    });
    this.masters = masterReferenceArray;
  }
  fillTypesList() {
    this.masterInfoService
      .getTypes(this.data)
      .then((response: any) => (this.types = response))
      .catch((err) => {});
  }
  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      description: new FormControl({ value: '', disabled: this.data?.url === 'types' }),
      masterReference: new FormControl(''),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      url: new FormControl(),
      type: new FormControl(''),
      status: new FormControl(''),
      submenu: new FormControl(''),
      imagePath: new FormControl({ value: '', disabled: true }),
    });
  }

  initForm(): void {
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
      .catch((err) => {});
  }

  addRegisterToMaster() {
    console.log(this.data.url);
    console.log(this.form.value);
    this.masterInfoService
      .addRegisterToMaster(this.data.url, this.form.value)
      .then((response: any) => this.showNotification(response))
      .catch((err) => {});
  }

  updateRegisterToMaster() {
    this.masterInfoService
      .updateRegisterToMaster(this.data.url, this.data.element._id, this.form.value)
      .then((response: any) => this.showNotification(response))
      .catch((err) => {});
  }

  updateRegisterWithImageToMaster() {
    this.masterInfoService
      .updateToMasterWithImages(this.data.url, this.data.element._id, this.createFormData())
      .then((response: any) => this.showNotification(response))
      .catch((err) => {});
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
