import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileTemplateService {
  constructor(private httpClient: HttpClient) {}
  async getDataCorporativeCompetences() {
    return {
        assertiveComunication: [
          {
            name: 'Comunicación Abierta',
            measureApproval: 50,
            id: 1,
          },
          {
            name: 'Comunicación Estricta',
            measureApproval: 30,
            id: 11,
          },
          {
            name: 'Retroalimentación',
            measureApproval: 90,
            id: 12,
          },
        ],
        achievementOrientation: [
          {
            name: 'Orientación al Resultado',
            measureApproval: 50,
            id: 1,
          },
          {
            name: 'Planeación',
            measureApproval: 30,
            id: 11,
          },
          {
            name: 'Atención al Detalle',
            measureApproval: 90,
            id: 12,
          },
          {
            name: 'Sentido de Urgencia',
            measureApproval: 90,
            id: 12,
          },
        ],
        serviceOrientation: [
          {
            name: 'Autocontrol',
            measureApproval: 50,
            id: 1,
          },
          {
            name: 'Habilidad Social',
            measureApproval: 30,
            id: 11,
          },
          {
            name: 'Compromiso Laboral',
            measureApproval: 90,
            id: 12,
          }
        ],
        teamwork: [
          {
            name: 'Adaptabilidad',
            measureApproval: 50,
            id: 1,
          },
          {
            name: 'Trabajo en Equipo',
            measureApproval: 30,
            id: 11,
          }
        ],
      }
  }

  async getData() {
    return [
      {
        objective:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto dolores, ratione vero aspernatur accusamus amet illo tenetur architecto vel est odio, sed sunt, dignissimos vitae adipisci quas. Expedita, animi.',
        professionalExperience: 2,
        chargeExperience: 1,
        securityResponsabilities: [
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
        ],
        education: [
          {
            _id: 1,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 2,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 3,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 4,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 5,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 6,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 7,
            name: 'nombre de la formación',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
        ],
        requiredCertificates: [
          {
             _id: 1,
            name: 'nombre del Certificado',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
             _id: 2,
            name: 'nombre del Certificado',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
             _id: 3,
            name: 'nombre del Certificado',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
        ],
        specificKnowledge: [
          {
            _id: 1,
            name: 'nombre del conocimiento',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 2,
            name: 'nombre del conocimiento',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 3,
            name: 'nombre del conocimiento',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
        ],
        rolResponsabilities: [
          {
            _id: 1,
            name: 'nombre de la función',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            _id: 2,
            name: 'nombre de la función',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          }
        ],
      },
    ];
  }

  async getAllEstudies(){
    return [
      {
        _id: 1,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 2,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 3,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 4,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 5,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 6,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 7,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 8,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 9,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 10,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 11,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 12,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 13,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 14,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 15,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 16,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 17,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 18,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 19,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 20,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 21,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 22,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 23,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 24,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 25,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 26,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 27,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 28,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 29,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 30,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 31,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 32,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 33,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 34,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 35,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 36,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 37,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 38,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 39,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 40,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 41,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 42,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 43,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ]
  }

  async getAllCertificates(){
    return [
      {
        _id: 1,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 2,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 3,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 4,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 5,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 6,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 7,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 8,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 9,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 10,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ]
  }

  async getAllKnowledge(){
    return [
      {
        _id: 1,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 2,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 3,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 4,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 5,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 6,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 7,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 8,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 9,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 10,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ]
  }

  async getAllFunctions(){
    return [
      {
        _id: 1,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 2,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 3,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 4,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 5,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 6,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 7,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 8,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 9,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        _id: 10,
        name: 'nombre de la formación',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ]
  }
}
