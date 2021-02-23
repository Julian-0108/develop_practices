import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-profile-form-history',
  templateUrl: './profile-form-history.component.html',
  styleUrls: ['./profile-form-history.component.scss'],
})
export class ProfileFormHistoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProfileFormHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private titleCasePipe: TitleCasePipe
  ) {}

  formHistory = new FormGroup({
    author: new FormControl('', [Validators.required]),
    date: new FormControl({ value: '', disabled: true }),
    descriptionChanges: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.formHistory.get('date')?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    const userName: any = JSON.parse(String(localStorage.getItem('MSauthData')));
    this.formHistory.get('author')?.patchValue(userName.user.displayName);
  }

  onSave() {
    this.formHistory
      .get('descriptionChanges')
      ?.patchValue(
        this.formHistory.value.descriptionChanges[0].toUpperCase() +
          this.formHistory.value.descriptionChanges.substr(1).toLowerCase()
      );
    this.dialogRef.close({...this.formHistory.value, ...this.data});
  }
}
