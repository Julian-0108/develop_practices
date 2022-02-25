import { Component, OnInit, Inject } from '@angular/core';
import { AddResumeService } from '../../add-resume/service/add-resume.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  constructor(private service:AddResumeService, @Inject(MAT_DIALOG_DATA) public data:{datakey:number}) { }

  tools: any;

  ngOnInit(): void {
    this.consultCandidate();
  }

  consultCandidate(){
    this.service.getDataExist(this.data.datakey)
      .then((dataValue: { knowledgeCharge: string; }[]) => {
        this.tools = dataValue[0].knowledgeCharge;
      }).catch((error: any) => {
        console.log('error',error);
      })
  }

}
