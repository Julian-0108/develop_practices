import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MasterInfoService } from '../services/master-info.service';

@Component({
  selector: 'app-master-info',
  templateUrl: './master-info.component.html',
  styleUrls: ['./master-info.component.scss'],
})
export class MasterInfoComponent implements OnInit {
  form!: FormGroup;
  private readonly DATE_FORM_CONTROL = 'yyyy-MM-dd';

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private masterInfoService: MasterInfoService,
    private dialogRef: MatDialogRef<MasterInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.initForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      _id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      url: new FormControl(),
      type: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  initForm(): void {
    if (this.data?.element) {
      this.form.patchValue(this.data.element);
      this.form
        .get('createdAt')
        ?.patchValue(
          this.datePipe.transform(
            this.data.element.createdAt,
            this.DATE_FORM_CONTROL
          )
        );
      this.form
        .get('updatedAt')
        ?.patchValue(
          this.datePipe.transform(
            this.data.element.updatedAt,
            this.DATE_FORM_CONTROL
          )
        );
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

  addRegisterToMaster() {
    this.masterInfoService
      .addRegisterToMaster(this.data.url, this.form.value)
      .then((response: any) => this.onClose({ data: response.payload }))
      .catch((err) => {});
  }

  updateRegisterToMaster() {

    this.masterInfoService
      .updateRegisterToMaster(this.data.url, this.form.value)
      .then((response: any) => this.onClose({ data: response.payload }))
      .catch((err) => {});
  }

  onClose(data: any=null): void {
    this.dialogRef.close(data);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.data?.element
      ? this.updateRegisterToMaster()
      : this.addRegisterToMaster();
  }
}
