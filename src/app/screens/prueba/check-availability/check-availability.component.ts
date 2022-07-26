import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAvailabilityComponent } from '../dialog-availability/dialog-availability.component';
import { DialogKnowledgeComponent } from '../dialog-knowledge/dialog-knowledge.component';

import { DialogViewComponent } from '../dialog-view/dialog-view.component';
import { ICheckAvailability, IFliterCheckAvailability, ILeaderList } from '../interfaces/ICheckAvailability';


@Component({
  selector: 'app-check-availability',
  templateUrl: './check-availability.component.html',
  styleUrls: ['./check-availability.component.scss'],
})
export class CheckAvailabilityComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  filterAll = new Map<string, string>();

  // Información y/o configuracion de los inputs de daet
  formGroupFilter = new FormGroup({
    leaderToppings: new FormControl(),
  });
  maxDate: Date = new Date();
  minDate!: Date;

  dataCheckAvailable: ICheckAvailability[] = [
    {
      _id: "100",
      name: "Julio",
      identifation: 1072744262,
      name_team: "Capa 8",
      cargo: "Development",
      _id_leader: "1",
      leader_name: "Doncey Velasquez",
      date_start: "11/07/2022",
      date_end: "12/07/2022",
      hoursD: 9,
      total_hoursD: 18,
      id_status: 1,
      status_name: "Activo",
      knowledge: {
        platforms: [
          {
            domains: "Medium",
            tecnology: "ExpoGo",
            version: "3.5"
          }
        ],
        tools: [
          {
            domains: "Full",
            tecnology: "Postman",
            tool_option: "Postman",
            version: "15.5",
            levelKnowledge: 12,
            exp: 20,
          }
        ],
        knowledgesSpecify: [
          "ReactJS",
        ]
      }
    },
    {
      _id: "101",
      name: "Kevin",
      identifation: 1072744263,
      name_team: "Capa 8",
      cargo: "Development",
      _id_leader: "2",
      leader_name: "Lina Jaramillo",
      date_start: "10/07/2022",
      date_end: "13/07/2022",
      hoursD: 9,
      total_hoursD: 27,
      id_status: 1,
      status_name: "Activo",
      knowledge: {
        platforms: [
          {
            domains: "Hight",
            tecnology: "ExpoGo",
            version: "3.5"
          }
        ],
        tools: [
          {
            domains: "Hight",
            tecnology: "Postman",
            tool_option: "Postman",
            version: "15.5",
            levelKnowledge: 8,
            exp: 10,
          }
        ],
        knowledgesSpecify: [
          "ReactJS",
          "PostgressSql",
          "MySql",
        ]
      }
    },
    {
      _id: "102",
      name: "Juan",
      identifation: 1072744263,
      name_team: "Capa 8",
      cargo: "Development",
      _id_leader: "2",
      leader_name: "Lina Jaramillo",
      date_start: "10/07/2022",
      date_end: "13/07/2022",
      hoursD: 9,
      total_hoursD: 27,
      id_status: 1,
      status_name: "Activo",
      knowledge: {
        platforms: [
          {
            domains: "Hight",
            tecnology: "ExpoGo",
            version: "3.5"
          }
        ],
        tools: [
          {
            domains: "Hight",
            tecnology: "Postman",
            tool_option: "Postman",
            version: "15.5",
            levelKnowledge: 8,
            exp: 10,
          }
        ],
        knowledgesSpecify: [
          "ReactJS",
          "PostgressSql",
          "MySql",
        ]
      }
    },
    {
      _id: "103",
      name: "Dilan",
      identifation: 1072744263,
      name_team: "Capa 8",
      cargo: "Development",
      _id_leader: "4",
      leader_name: "Kevin Tangarife",
      date_start: "10/07/2022",
      date_end: "13/07/2022",
      hoursD: 9,
      total_hoursD: 27,
      id_status: 1,
      status_name: "Activo",
      knowledge: {
        platforms: [
          {
            domains: "Hight",
            tecnology: "ExpoGo",
            version: "3.5"
          }
        ],
        tools: [
          {
            domains: "Hight",
            tecnology: "Postman",
            tool_option: "Postman",
            version: "15.5",
            levelKnowledge: 8,
            exp: 10,
          }
        ],
        knowledgesSpecify: [
          "ReactJS",
          "PostgressSql",
          "MySql",
        ]
      }
    },
  ];

  displayedColumns: string[] = [
    'i',
    'name',
    'identifation',
    'name_team',
    'cargo',
    'leader',
    'date_start',
    'date_end',
    'hoursD',
    'total_hoursD',
    'status',
    'knowledge',
    'actions'
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataCheckAvailable);

    this.dataSource.filterPredicate = (record, filter) => {
      if (filter.length == 0) return true;
      const filterObj = JSON.parse(filter);
      let filterDataVerify = {
        leader: false,
        dateInit: false,
        dateEnd: false,
      };

      for (let itemFilter of filterObj) {
        if (itemFilter[0] === "_id_leader" && itemFilter[1].length > 0) {
          for (let itemFilterLeader of itemFilter[1]) {
            console.log(itemFilterLeader == record._id_leader)
            if (itemFilterLeader == record._id_leader) return true;
          }
        }
      }

      /*
      if (filterObj.length === 0) return true;
      for (let item of filterObj) {
        if (item.type === 'leadersId') {
          if (item.value === record._id_leader) return true;
        }
      }
      return false;
      */
     return false;
    }
  }

  openDialog(direction: string,id:string): void {
    switch (direction){
      case 'add':{
      const dialogRef = this.dialog.open(DialogKnowledgeComponent, {
        width: '600px',
        height: '400px'
      });
      break;
      }
      case 'view':{
        console.log(id);
        
        const dialogRef = this.dialog.open(DialogViewComponent, {
          width: '600px',
          height: '400px'
        });
        break;
      }
    }
  }

  selectedLeaderChangedHandler() {
    const idSelecteds = this.formGroupFilter.get('leaderToppings')?.value;

    let filter = "";

    if (idSelecteds.length > 0) filter = this.applyFilterHandler('_id_leader', idSelecteds);
    this.dataSource.filter = filter;
    /*
    const idSelecteds = this.formGroupFilter.get('leaderToppings')?.value;
    let filter: any[] = [];
    if (idSelecteds.length > 0) {
      idSelecteds.map((id: number) => filter.push({ type: 'leadersId', value: id, }));
    }
    this.dataSource.filter = JSON.stringify(filter);
    */
  }

  applyFilterHandler(ob: string, value: any): string {
    this.filterAll.set(ob, value)
    return JSON.stringify(Array.from(this.filterAll.entries()));
  }

  dateStartHandler(event: HTMLInputElement) {
    const dateStat = new Date(event.value);
    if (!dateStat) return;
    // this.minDate = ;

    let filter: any[] = [];


  }


  leaderList: ILeaderList[] = [
    {
      _id: "1",
      name: 'Doncey Velasquez',
      active: false,
    },
    {
      _id: "2",
      name: 'Lina Jaramillo',
      active: false,
    },
    {
      _id: "3",
      name: 'Julio Cifuentes',
      active: false,
    },
    {
      _id: "4",
      name: 'Kevin Tangarife',
      active: false,
    },
  ];

  // leaderToppings = new FormControl('');
}
