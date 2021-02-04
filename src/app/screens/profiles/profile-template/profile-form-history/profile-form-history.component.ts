import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-profile-form-history',
  templateUrl: './profile-form-history.component.html',
  styleUrls: ['./profile-form-history.component.scss']
})
export class ProfileFormHistoryComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileFormHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  formHistory = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl(''),
    description: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    console.log(this.data)
    this.formHistory.get('date')?.setValue(moment(new Date()).format('YYYY-MM-DD'));
  }

  onSave() {
    this.dialogRef.close({...this.formHistory.value, idProfile: this.data.profileDate._id});
  }


}
