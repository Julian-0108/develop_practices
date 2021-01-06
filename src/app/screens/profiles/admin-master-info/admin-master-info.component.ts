import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MasterInfoService } from "./services/master-info.service";
import { Master } from "./interfaces/master.interface";
import { MasterInfoComponent } from "./master-info/master-info.component";
import { Title } from "@angular/platform-browser";
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: "app-admin-master-info",
  templateUrl: "./admin-master-info.component.html",
  styleUrls: ["./admin-master-info.component.scss"],
})
export class AdminMasterInfoComponent implements OnInit {

  public readonly displayedColumns: string[] = [
    "name",
    "description",
    "type",
    "status",
    "createdAt",
    "updatedAt",
    "actions",
  ];

  public readonly masters = [
    { name: "Equipos base", url: "/base-teams-categories" },
    { name: "Cursos y certificaciones", url: "courses-certifications" },
    { name: "Habilidades", url: "skills" },
    { name: "Funciones", url: "function" },
    { name: "Módulos", url: "module" },
    { name: "Conocimientos especificos", url: "specific-knowledge" },
    { name: "Nivel educativo", url: "study" },
    { name: "Herramientas de trabajo", url: "work-tool" },
  ];

  public masterSeleted!: string;
  dataSource!: MatTableDataSource<Master>;
  constructor(
    private title: Title,
    private masterInfoService: MasterInfoService,
    private dialog: MatDialog
  ) {
    this.title.setTitle("Mundo SETI - administrar maestros");
  }

  ngOnInit(): void {}

  getDataMaster() {
    this.masterInfoService
      .getData(this.masterSeleted)
      .then((res) => (this.dataSource =  new MatTableDataSource(res)));
  }


  addRegisterToMatTable(element: any) {
    this.dataSource.data = [element, ...this.dataSource.data];
  }

  updateRegisterToMatTable(element: Master) {
    const index = this.dataSource.data.findIndex((elementMaster) => elementMaster._id === element._id);
    if (index !== -1) {
      this.dataSource.data[index] = element;
      this.dataSource.data = [...this.dataSource.data];
    }
  }

  openDialog(element?: Master) {

    const dialogRef = this.dialog.open(MasterInfoComponent, {
      width: "60%",
      data: {
        element,
        title: element ? 'Editar' : 'Agregar',
        url: this.masterSeleted
      },
    }).afterClosed();

    dialogRef.toPromise().then((response: any) => {

      if (element && response?.data) {
        this.updateRegisterToMatTable(response.data);
      }

      if (!element && response?.data) {
        this.addRegisterToMatTable(response.data);
      }
    })
  }
}
