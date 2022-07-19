import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-knowledge',
  templateUrl: './dialog-knowledge.component.html',
  styleUrls: ['./dialog-knowledge.component.scss']
})
export class DialogKnowledgeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogKnowledgeComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
