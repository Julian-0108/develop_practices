import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-valortotal',
  templateUrl: './valortotal.component.html',
  styleUrls: ['./valortotal.component.scss']
})
export class ValorTotalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ValorTotalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}