import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exist-register',
  templateUrl: './dialog-exist-register.component.html',
  styleUrls: ['./dialog-exist-register.component.scss']
})
export class DialogExistRegisterComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogExistRegisterComponent>) { }

  ngOnInit(): void {
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }
}
