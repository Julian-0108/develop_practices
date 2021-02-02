import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { ManageBaseTeamsService } from '../service/manage-base-teams.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  date: Date = new Date();
  private readonly DATE_FORM_CONTROL = 'yyyy-MM-dd';

  form: FormGroup;
  CoursesCertifications!: any;
  specificKnowledge!: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private manageBaseTeamsService: ManageBaseTeamsService
  ) {

    this.form = fb.group({
      _id: [''],
      charge: ['', Validators.required],
      level: ['', Validators.required],
      createdAt: [''],
      updatedAt: [''],
      status: ['', Validators.required],
    });

    this.editForm();

  }

  ngOnInit(): void {
  }

  editForm() {

    this.form.get('status')?.patchValue(true);
    this.form.get('updatedAt')?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
    this.form.get('createdAt')?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));

    if (this.data?.element) {
      this.form.patchValue(this.data.element);

      this.form.get('updatedAt')?.patchValue(this.datePipe.transform(this.data.element.updatedAt, this.DATE_FORM_CONTROL));
      this.form.get('createdAt')?.patchValue(this.datePipe.transform(this.data.element.createdAt, this.DATE_FORM_CONTROL));

    }

  }

  onSubmit() {

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.notificationService.openSimpleSnackBar({
        title: '¿no sabe llenar un formulario?',
        message: 'LLena el formulario ome',
        type: 'info'
      });
      return;
    }

    this.data?.element ? this.updateProfile(this.form.get('_id')?.value, this.form.value) : this.addProfile(this.form.value);

  }

  addProfile(formData: any) {
    const data = {...formData, idBaseTeam: this.data.idBaseTeams};
    delete data['_id'];
    this.manageBaseTeamsService.addProfile(data)
      .then((response : any)=> {
        this.notificationService.openSimpleSnackBar({
          title: 'Proceso exitoso',
          message: response.message,
          type: 'success'
        });
      })
      .catch(console.log)
  }

  updateProfile(id: any, formData: any) {
    const data = {...formData, idBaseTeam: this.data.idBaseTeams};
    this.manageBaseTeamsService.updateProfile(id, data)
      .then((response:any) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Proceso exitoso',
          message: response.message,
          type: 'success'
        });
      })
      .catch(console.log)
  }

}