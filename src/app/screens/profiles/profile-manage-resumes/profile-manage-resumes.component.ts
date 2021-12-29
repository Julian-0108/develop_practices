import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-profile-manage-resumes',
  templateUrl: './profile-manage-resumes.component.html',
  styleUrls: ['./profile-manage-resumes.component.scss'],
})
export class ProfileManageResumesComponent implements OnInit {
  title = 'Gestion HV';

  public cards: any[] = [
    {
      name: 'Agregar HV',
      description: 'Inserción de nuevas hojas de vida',
      url: '/underConstruction',
      imagePath: '',
    },
  ];

  public API_MASTER_INFO: string = environment.API_MASTER_INFO;

  constructor() {}

  ngOnInit(): void {}
}
