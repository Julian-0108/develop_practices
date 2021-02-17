import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Master } from '@shared/interfaces/master.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileTemplateService {
  constructor(private httpClient: HttpClient) {}
  async getAllData() {
    return [
      {
        title: 'Bases de datos: Consultor Especialista N1',
        _id: '5ff47ac0e14f12b999abecc9',
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
          },
        ],
        corporativeCompetences: {
          assertiveComunication: [
            {
              name: 'Comunicación Abierta',
              measureApproval: 50,
              id: 1,
            },
            {
              name: 'Comunicación Estricta',
              measureApproval: 30,
              id: 2,
            },
            {
              name: 'Retroalimentación',
              measureApproval: 90,
              id: 3,
            },
          ],
          achievementOrientation: [
            {
              name: 'Orientación al Resultado',
              measureApproval: 50,
              id: 4,
            },
            {
              name: 'Planeación',
              measureApproval: 30,
              id: 5,
            },
            {
              name: 'Atención al Detalle',
              measureApproval: 90,
              id: 6,
            },
            {
              name: 'Sentido de Urgencia',
              measureApproval: 90,
              id: 7,
            },
          ],
          serviceOrientation: [
            {
              name: 'Autocontrol',
              measureApproval: 50,
              id: 8,
            },
            {
              name: 'Habilidad Social',
              measureApproval: 30,
              id: 8,
            },
            {
              name: 'Compromiso Laboral',
              measureApproval: 90,
              id: 9,
            },
          ],
          teamwork: [
            {
              name: 'Adaptabilidad',
              measureApproval: 50,
              id: 10,
            },
            {
              name: 'Trabajo en Equipo',
              measureApproval: 30,
              id: 11,
            },
          ],
        },
      },
      {
        title: 'Bases de datos: Consultor Especialista N2',
        _id: 456,
        objective:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto dolores, ratione vero aspernatur accusamus amet illo tenetur architecto vel est odio, sed sunt, dignissimos vitae adipisci quas. Expedita, animi.',
        professionalExperience: 3,
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
          },
        ],
        corporativeCompetences: {
          assertiveComunication: [
            {
              name: 'Comunicación Abierta',
              measureApproval: 50,
              id: 1,
            },
            {
              name: 'Comunicación Estricta',
              measureApproval: 30,
              id: 2,
            },
            {
              name: 'Retroalimentación',
              measureApproval: 90,
              id: 3,
            },
          ],
          achievementOrientation: [
            {
              name: 'Orientación al Resultado',
              measureApproval: 50,
              id: 4,
            },
            {
              name: 'Planeación',
              measureApproval: 30,
              id: 5,
            },
            {
              name: 'Atención al Detalle',
              measureApproval: 90,
              id: 6,
            },
            {
              name: 'Sentido de Urgencia',
              measureApproval: 90,
              id: 7,
            },
          ],
          serviceOrientation: [
            {
              name: 'Autocontrol',
              measureApproval: 50,
              id: 8,
            },
            {
              name: 'Habilidad Social',
              measureApproval: 30,
              id: 8,
            },
            {
              name: 'Compromiso Laboral',
              measureApproval: 90,
              id: 9,
            },
          ],
          teamwork: [
            {
              name: 'Adaptabilidad',
              measureApproval: 50,
              id: 10,
            },
            {
              name: 'Trabajo en Equipo',
              measureApproval: 30,
              id: 11,
            },
          ],
        },
      },
    ];
  }

  async getAllEstudies() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/studies?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  async getAllCertificates() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/courses-certifications?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllKnowledge() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/specific-knowledge?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllFunctions() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/functions?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllTalents() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/skills?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllSecurityResponsabilities() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/security-responsabilities?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  historyPreview(id: any) {
    return this.httpClient
      .get(`${environment.API_BASE_PROFILES}/historical-records/${id}`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  historyActions(action: string, idProfile: string, data?: any) {
    if (action === 'get') {
      return this.httpClient
        .get(`${environment.API_BASE_PROFILES}/historical-records?idBaseProfile=${idProfile}`)
        .pipe(pluck('payload'))
        .toPromise();
    } else if (action === 'post') {
      return this.httpClient
        .post(`${environment.API_BASE_PROFILES}/historical-records`, data)
        .pipe(pluck('payload'))
        .toPromise();
    }
  }

  async getData(idProfile: string) {
    return await this.httpClient
      .get(`${environment.API_BASE_PROFILES}/bases-profiles/${idProfile}`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async updateProfile(id: any, body: any) {
    return await this.httpClient
      .put(`${environment.API_BASE_PROFILES}/bases-profiles/${id}`, body)
      .pipe(pluck('payload'))
      .toPromise();
  }
}
