import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigTableServices } from '../services/configTable.services';
import { NotificationService } from '@app/shared/components/notification/services/notification.service';

@Component({
  selector: 'sites-app',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent implements OnInit {
  id_Site: any;
  url_Site: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { dataSite: any; subtitle: any },
    private fg: FormBuilder,
    private service: ConfigTableServices,
    private dialog: MatDialogRef<SitesComponent>,
    private notificationService: NotificationService
  ) {}

  sites = this.data.dataSite;
  subtitle = this.data.subtitle;

  // formUp!: FormGroup;
  formSities = this.fg.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    city: ['', Validators.required],
    status: ['', Validators.required],
  });

  ngOnInit(): void {
    this.formSities.patchValue(this.data.dataSite);
  }

  updateSites() {
    this.id_Site = this.data.dataSite._id;
    this.service
      .updateDataSites(this.id_Site, this.formSities.value)
      .then(() => {
        this.notificationService.openSimpleSnackBar({
          title: 'Sedes',
          message: 'Sede Actualizada Correctamente',
          type: 'success',
        });
      })
      .catch();
    this.dialog.close(true);
  }
}
