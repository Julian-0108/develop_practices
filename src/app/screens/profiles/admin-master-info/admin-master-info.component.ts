import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MasterInfoService } from "./services/master-info.service";
import { Master } from "./interfaces/master.interface";
import { MasterInfoComponent } from "./master-info/master-info.component";
import { Title } from "@angular/platform-browser";

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
    { name: "Modelos", url: "module" },
    { name: "Conocimientos especificos", url: "specific-knowledge" },
    { name: "Herramientas de trabajo", url: "work-tool" },
  ];
  public masterSeleted!: string;
  dataSource: Master[] = [];
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
      .then((res) => (this.dataSource = res));
  }
  openDialog(element?: Master) {
    const dialogRef = this.dialog.open(MasterInfoComponent, {
      width: "60%",
      data: {
        element,
        title: element ? 'Editar' : 'Agregar',
        url: this.masterSeleted
      },
    });
  }
}
