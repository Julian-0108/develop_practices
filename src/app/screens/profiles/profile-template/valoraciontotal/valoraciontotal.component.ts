import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-valoraciontotal',
  templateUrl: './valoraciontotal.component.html',
  styleUrls: ['./valoraciontotal.component.scss']
})
export class ValoraciontotalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ValoraciontotalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
