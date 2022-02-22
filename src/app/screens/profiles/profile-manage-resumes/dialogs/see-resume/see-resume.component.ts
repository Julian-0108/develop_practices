import { Component, Inject, OnInit } from '@angular/core';
import { AddResumeService } from '../../add-resume/service/add-resume.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-see-resume',
  templateUrl: './see-resume.component.html',
  styleUrls: ['./see-resume.component.scss']
})
export class SeeResumeComponent implements OnInit {

  info_Candidate:any;

  constructor(private service:AddResumeService,@Inject(MAT_DIALOG_DATA) public data:{datakey:number}) { }


  ngOnInit(): void {
    this.getInfoDocument();
  }

  getInfoDocument(){
    this.service.getDataExist(this.data.datakey)
    .then(data=> {
      this.info_Candidate = data[0];
    }).catch(error => {
      console.log(error);
    });
  }

}