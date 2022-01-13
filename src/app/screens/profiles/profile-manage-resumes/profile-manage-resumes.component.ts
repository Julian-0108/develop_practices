import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Search } from './interfaces/manege-resumes.interface';
import { AddResumeComponent } from './add-resume/add-resume.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-manage-resumes',
  templateUrl: './profile-manage-resumes.component.html',
  styleUrls: ['./profile-manage-resumes.component.scss'],
})
export class ProfileManageResumesComponent implements OnInit {
  title = 'Gestión HV';

  public displayedColumns: string[] = [
    'name',
    'documentNumber',
    'tool',
    'processStatus',
    'wageAspiration',
  ];

  ELEMENT_DATA: Search[] = [
    {
      name: 'Andres Duque Palacio',
      documentNumber: 1193125683,
      tool: 'Angular',
      processStatus: 'Seleccionado',
      wageAspiration: 3000000,
    }
  ];

  dataSource = new MatTableDataSource<Search>(this.ELEMENT_DATA);

  constructor(
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialogAdd(){
    const dialogRef = this.dialog.open(AddResumeComponent, {
      width: '60%',
      height: '80%'
    });
  }
}
