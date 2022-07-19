import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-availability',
  templateUrl: './dialog-availability.component.html',
  styleUrls: ['./dialog-availability.component.scss']
})
export class DialogAvailabilityComponent implements OnInit {
  myFilter = (d: Date): boolean => {
    let view = true;
    console.log(d.getDate());
    
    // Prevent Saturday and Sunday from being selected.
    if (d.getFullYear() > new Date().getFullYear()){
      view = false;
    }
    else if (d.getMonth() > new Date().getMonth()) {
      if (d.getFullYear() == new Date().getFullYear()) {
        view = false;
      }
    }
    else if (d.getDate() > new Date().getDate()) {
      if (d.getMonth() == new Date().getMonth() && d.getFullYear() == new Date().getFullYear()){
        view = false;
      }
    }
    return view;
  };
  
  constructor(public dialogRef: MatDialogRef<DialogAvailabilityComponent>) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
