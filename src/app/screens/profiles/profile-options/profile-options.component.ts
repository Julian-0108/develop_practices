import { Component, OnInit, HostListener, Directive } from "@angular/core";

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
        { profile: "Profesional en Formación", levels: [], id:'btn1'},
        { profile: "Consultor Junior", levels: ['N1','N2','N3'], id:'btn2'},
        { profile: "Consultor Especialista", levels: ['N1'], id:'btn3'},
        { profile: "Consultor Senior", levels: ['N1','N2'], id:'btn4'},
      ],
      image: "../../../assets/images/Grupo 756.svg",
    },
    {
      title: "Desarrollo de Producto",
      content: [
        { profile: "Profesional en Formación", levels: [], id:'btn5'},
        { profile: "Consultor Junior", levels: ['N1','N2','N3'], id:'btn6'},
        { profile: "Consultor Especialista", levels: ['N1'], id:'btn7'},
        { profile: "Consultor Senior", levels: ['N1','N2'], id:'btn8'},
      ],
      image: "../../../assets/images/Grupo 757.svg",
    },
    {
      title: "Bases de Datos",
      content: [
        { profile: "Profesional en Formación", levels: [], id:'btn9'},
        { profile: "Consultor Junior", levels: ['N1','N2','N3'], id:'btn10'},
        { profile: "Consultor Especialista", levels: ['N1'], id:'btn11'},
        { profile: "Consultor Senior", levels: ['N1','N2'], id:'btn12'},
      ],
      image: "../../../assets/images/Grupo 755.svg",
    },
  ];
  constructor() {}
  ngOnInit(): void {}

  y(element: any){
    console.log(element);

  }

}
