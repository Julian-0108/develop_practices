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
            name: 'nombre del Certificado',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre del Certificado',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre del Certificado',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
        ],
        specificKnowledge: [
          {
            name: 'nombre del conocimiento',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre del conocimiento',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre del conocimiento',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
        ],
        rolResponsabilities: [
          {
            name: 'nombre de la función',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la función',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
          {
            name: 'nombre de la función',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          },
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
    ]
  }
}
