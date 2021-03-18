import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { ManageBaseTeamsService } from '../service/manage-base-teams.service';
import { NotificationService } from '@shared/components/notification/services/notification.service';
import { ProfileFormHistoryComponent } from '../../profile-template/profile-form-history/profile-form-history.component';
import { SnackOptionsInterface } from '@app/shared/interfaces/notification.interface';
import { HistoryBaseTeamsService } from '../history/services/history-base-team.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  date: Date = new Date();
  private readonly DATE_FORM_CONTROL = 'yyyy-MM-dd';

  form: FormGroup;
  CoursesCertifications!: any;
  specificKnowledge!: any;
  profiles!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private manageBaseTeamsService: ManageBaseTeamsService,
    private dialogRef: MatDialogRef<any>,
    private _dialog: MatDialog,
    private historyBaseTeamsService: HistoryBaseTeamsService
  ) {
    this.form = fb.group({
      _id: new FormControl(''),
      charge: new FormControl('', [Validators.required]),
      level: new FormControl(''),
      createdAt: new FormControl({ value: '', disabled: true }),
      updatedAt: new FormControl({ value: '', disabled: true }),
      status: new FormControl({ value: '' }, [Validators.required]),
    });

    this.editForm();
  }

  ngOnInit(): void {}

  /**
   * @author Wilmer
   * @description se asignan los valores a los inputs del formulario
   */
  editForm() {
    this.form.get('status')?.patchValue(true);
    this.form
      .get('updatedAt')
      ?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));
    this.form
      .get('createdAt')
      ?.patchValue(this.datePipe.transform(new Date(), this.DATE_FORM_CONTROL));

    if (this.data?.element) {
      this.form.patchValue(this.data.element);

      this.form
        .get('updatedAt')
        ?.patchValue(this.datePipe.transform(this.data.element.updatedAt, this.DATE_FORM_CONTROL));
      this.form
        .get('createdAt')
        ?.patchValue(this.datePipe.transform(this.data.element.createdAt, this.DATE_FORM_CONTROL));
    }
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    /**
     * @author Wilmer
     * @description se valida que no se cree un registro que ya existe comparando los registros del servicio con los inputs del formulario
     */
    const alreadyExist = this.data.profiles.some(
      (profile: any) =>
        profile.charge.toLowerCase() == this.form.value.charge.toLowerCase() &&
        profile.level.toLowerCase() == this.form.value.level.toLowerCase() &&
        profile.status == this.form.value.status
    );
    if (alreadyExist) {
      this.notificationService.openSimpleSnackBar({
        title: 'Error.',
        message: 'este registro ya fue creado',
        type: 'error',
      });
      return;
    }

    this.data?.element
      ? this.updateProfile(this.form.get('_id')?.value, this.form.value)
      : this.addProfile(this.form.value);
  }

  addProfile(formData: any) {
    const data = { ...formData, idBaseTeam: this.data.idBaseTeams };
    delete data['_id'];
    this.manageBaseTeamsService
      .addProfile(data)
      .then((response: any) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Proceso exitoso',
          message: response.message,
          type: 'success',
        });
        this.closeDialog({ data: response.payload });
      })
      .catch((response: any) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Error',
          message: response.message,
          type: 'error',
        });
      });
  }

  updateProfile(id: any, formData: any) {
    const data = { ...formData, idBaseTeam: this.data.idBaseTeams };
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
          this.onUpdatewithHistory(id, data);
        } else {
          this.onUpdateWithOutHistory(id, data);
        }
      });
  }

  closeDialog(data: any = {}) {
    this.dialogRef.close(data);
  }

  onUpdatewithHistory(id: any, data: any) {
    /*
     * Se abre el formulario donde se ingresa la descripción de los cambios,
     * que se guardarán en el historial.
     */
    console.log(data);
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
          idProfile: id,
          name: resp.charge,
        };
        delete resp[`_id`];
        /*
         * Se Guarda la información en historial y se actualiza la información del
         * perfil.
         */
        this.manageBaseTeamsService
          .updateProfile(id, resp)
          ?.then(() => {
            this.historyBaseTeamsService.hitoryActionsManageBaseProfiles('post', id, resp);
          })
          .then((response: any) => {
            console.log(response)
            this.notificationService.openSimpleSnackBar({
              title: 'Operación Finalizada',
              message: 'La información se ha actualizado con éxito y su historial fue creado.',
              type: 'success',
            });
            this.closeDialog();
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

  onUpdateWithOutHistory(id: any, data: any) {
    this.manageBaseTeamsService
      .updateProfile(id, data)
      .then((response: any) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Proceso exitoso',
          message: response.message,
          type: 'success',
        });
        this.closeDialog({ data: response.payload });
      })
      .catch((response: any) => {
        this.notificationService.openSimpleSnackBar({
          title: 'Error',
          message: response.message,
          type: 'error',
        });
      });
  }
}
