import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ManageProfileService } from './services/manage-profile.service';
import { Master } from '@shared/interfaces/master.interface';

@Component({
  selector: 'app-adminprofiles',
  templateUrl: './adminprofiles.component.html',
  styleUrls: ['./adminprofiles.component.scss']
})
export class AdminprofilesComponent implements OnInit {
  public cards!: Master[];
  constructor(
    private titleService: Title,
    private manageProfileService: ManageProfileService
  ) {
    this.titleService.setTitle('Mundo SETI - administrar perfiles');
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.manageProfileService.getData()
    .then( response => this.cards = response)
    .catch( err => console.log('error'));
  }

}
