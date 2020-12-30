import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-options",
  templateUrl: "./profile-options.component.html",
  styleUrls: ["./profile-options.component.scss"],
})
export class ProfileOptionsComponent implements OnInit {
  title = "Equipos Base";
  x = false;
  description =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.Maxime, consequuntur assumenda";
  items = [
    {
      title: "Desarrollo de Operaciones",
      content: [
        { profile: "Profesional en Formación", leves: [] },
        { profile: "Consultor Junior", leves: ['N1','N2','N3'] },
        { profile: "Consultor Especialista", leves: ['N1','N2','N3'] },
        { profile: "Consultor Senior", leves: ['N1','N2','N3'] },
      ],
      image: "../../../assets/images/Grupo 756.svg",
    },
    {
      title: "Desarrollo de Producto",
      content: [
        { profile: "Profesional en Formación", leves: [] },
        { profile: "Consultor Junior", leves: ['N1','N2','N3'] },
        { profile: "Consultor Especialista", leves: ['N1','N2','N3'] },
        { profile: "Consultor Senior", leves: ['N1','N2','N3'] },
      ],
      image: "../../../assets/images/Grupo 757.svg",
    },
    {
      title: "Bases de Datos",
      content: [
        { profile: "Profesional en Formación", leves: [] },
        { profile: "Consultor Junior", leves: ['N1','N2','N3'] },
        { profile: "Consultor Especialista", leves: ['N1','N2','N3'] },
        { profile: "Consultor Senior", leves: ['N1','N2','N3'] },
      ],
      image: "../../../assets/images/Grupo 755.svg",
    },
  ];
  constructor() {}
  ngOnInit(): void {}

}
