import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public qrData: any = null;

  form: FormGroup;

  data: any
  json: any

  constructor(private fb: FormBuilder) {
    this.qrData = 'hello world!'
  }

  sedes: any = []


  ngOnInit() {
    this.form = this.fb.group({
      sede: '',
    })
  }

  onSubmit(form: FormGroup) {
    this.data = {
      "user": form.value.user,
      "email": form.value.email,
      "position": form.value.position
    };
    // this.qrData = JSON.stringify(this.data)
  }
}
