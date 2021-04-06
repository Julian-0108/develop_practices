import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-responsabilities-desc',
  templateUrl: './responsabilities-desc.component.html',
  styleUrls: ['./responsabilities-desc.component.scss']
})
export class ResponsabilitiesDescComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResponsabilitiesDescComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
