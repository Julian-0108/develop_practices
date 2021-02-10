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
  // async getDataCorporativeCompetences() {
  //   return {
  //     assertiveComunication: [
  //       {
  //         name: 'Comunicación Abierta',
  //         measureApproval: 50,
  //         id: 1,
  //       },
  //       {
  //         name: 'Comunicación Estricta',
  //         measureApproval: 30,
  //         id: 2,
  //       },
  //       {
  //         name: 'Retroalimentación',
  //         measureApproval: 90,
  //         id: 3,
  //       },
  //     ],
  //     achievementOrientation: [
  //       {
  //         name: 'Orientación al Resultado',
  //         measureApproval: 50,
  //         id: 4,
  //       },
  //       {
  //         name: 'Planeación',
  //         measureApproval: 30,
  //         id: 5,
  //       },
  //       {
  //         name: 'Atención al Detalle',
  //         measureApproval: 90,
  //         id: 6,
  //       },
  //       {
  //         name: 'Sentido de Urgencia',
  //         measureApproval: 90,
  //         id: 7,
  //       },
  //     ],
  //     serviceOrientation: [
  //       {
  //         name: 'Autocontrol',
  //         measureApproval: 50,
  //         id: 8,
  //       },
  //       {
  //         name: 'Habilidad Social',
  //         measureApproval: 30,
  //         id: 8,
  //       },
  //       {
  //         name: 'Compromiso Laboral',
  //         measureApproval: 90,
  //         id: 9,
  //       },
  //     ],
  //     teamwork: [
  //       {
  //         name: 'Adaptabilidad',
  //         measureApproval: 50,
  //         id: 10,
  //       },
  //       {
  //         name: 'Trabajo en Equipo',
  //         measureApproval: 30,
  //         id: 11,
  //       },
  //     ],
  //   };
  // }

  // async getData() {
  //   return [
  //     {
  //       idBaseTeam: '5ff62eac9105420011077a42',
  //       idBaseProfile: '5ff47ac0e14f12b999abecc9',
  //       charge: 'Profesional en formación',
  //       objective: 'Aprender sobre el cargo',
  //       professionalExperience: 2,
  //       chargeExperience: 1,
  //       nameBaseTeam: 'Base de datos',
  //       status: true,
  //       requiredCertificates: [
  //         {
  //           _id: '5fe48f999dbcfc54208991d4',
  //           name: 'Angular v8',
  //           description: 'Desarrollo de aplicaciones de angular 9 y 10',
  //         },
  //         {
  //           _id: '5fe9dbf55588f75dbcd9efd6',
  //           name: 'Oracle',
  //           description: 'Ejemplo descripción 2',
  //         },
  //       ],
  //       rolResponsabilities: [
  //         {
  //           _id: '5fedcc99137e9b0dc4faf8fd',
  //           name: 'funciones 3',
  //           description: 'funciones 3',
  //         },
  //       ],
  //       talents: [
  //         {
  //           _id: '601be82f56245e0011006582',
  //           name: 'Test',
  //           description: 'test',
  //         },
  //         {
  //           _id: '5ff48334e14f12b999abece2',
  //           name: 'nombre 1',
  //           description: 'desc',
  //         },
  //       ],
  //       assertiveComunication: [
  //         {
  //           _id: '6020a0aa25c1f20012ea49bd',
  //           name: 'Comunicación Abierta',
  //           measureApproval: 50,
  //         },
  //         {
  //           _id: '6020a0aa25c1f20012ea49bd',
  //           name: 'Comunicación Estricta',
  //           measureApproval: 30,
  //         },
  //         {
  //           _id: '6020a0aa25c1f20012ea49bd',
  //           name: 'Retroalimentación',
  //           measureApproval: 90,
  //         },
  //       ],
  //       achievementOrientation: [
  //         {
  //           name: 'Orientación al Resultado',
  //           measureApproval: 50,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //         {
  //           name: 'Planeación',
  //           measureApproval: 30,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //         {
  //           name: 'Atención al Detalle',
  //           measureApproval: 90,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //         {
  //           name: 'Sentido de Urgencia',
  //           measureApproval: 90,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //       ],
  //       serviceOrientation: [
  //         {
  //           name: 'Autocontrol',
  //           measureApproval: 50,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //         {
  //           name: 'Habilidad Social',
  //           measureApproval: 30,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //         {
  //           name: 'Compromiso Laboral',
  //           measureApproval: 90,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //       ],
  //       teamwork: [
  //         {
  //           name: 'Adaptabilidad',
  //           measureApproval: 50,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //         {
  //           name: 'Trabajo en Equipo',
  //           measureApproval: 30,
  //           _id: '6020a0aa25c1f20012ea49bd',
  //         },
  //       ],
  //       securityResponsabilities: [
  //         {
  //           _id: '6012db947bf8de2408d20d41',
  //           description: 'Procurar el cuidado integral de su salud',
  //         },
  //         {
  //           _id: '6012dbd27bf8de2408d20d42',
  //           description: 'Suministrar información clara, completa y veraz sobre su estado de salud',
  //         },
  //         {
  //           _id: '6012dc337bf8de2408d20d43',
  //           description: 'Conocer y tener clara la política de seguridad y salud en el trabajo',
  //         },
  //         {
  //           _id: '6012dc557bf8de2408d20d44',
  //           description:
  //             'Participar en la prevención de riesgos laborales mediante las actividades que se realicen en la empresa',
  //         },
  //         {
  //           _id: '6012dc8b7bf8de2408d20d45',
  //           description:
  //             'Participar y contribuir al cumplimiento de los objetivos del sistema de seguridad y salud en el trabajo',
  //         },
  //         {
  //           _id: '6012dc9b7bf8de2408d20d46',
  //           description: 'Cumplir las normas de seguridad e higiene propias de la empresa',
  //         },
  //         {
  //           _id: '6012dcb37bf8de2408d20d47',
  //           description: 'Reportar inmediatamente todo accidente de trabajo o incidente',
  //         },
  //         {
  //           _id: '6012dd407bf8de2408d20d48',
  //           description: 'Informar las condiciones de riesgo detectadas al jefe inmediato',
  //         },
  //       ],
  //       education: [
  //         {
  //           _id: '5ff48fa7a945a743b4ece500',
  //           description: 'creacion paginas web',
  //         },
  //         {
  //           _id: '5ff4b0bda945a743b4ece501',
  //           description: 'Servicios',
  //         },
  //       ],
  //       specificKnowledge: [
  //         {
  //           _id: '5fec8c276163a73868145257',
  //           description: 'Especificacion tecnica 1',
  //         },
  //         {
  //           _id: '5fec8cf36163a73868145258',
  //           description: 'Especificacion tecnica 2',
  //         },
  //       ],
  //     },
  //     // {
  //     //   title: 'Bases de datos: Consultor Especialista N1',
  //     //   _id: 123,
  //     //   objective:
  //     //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iusto dolores, ratione vero aspernatur accusamus amet illo tenetur architecto vel est odio, sed sunt, dignissimos vitae adipisci quas. Expedita, animi.',
  //     //   professionalExperience: 2,
  //     //   chargeExperience: 1,
  //     //   securityResponsabilities: [
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //   ],
  //     //   education: [
  //     //     {
  //     //       _id: 1,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 2,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 3,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 4,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 5,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 6,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 7,
  //     //       name: 'nombre de la formación',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //   ],
  //     //   requiredCertificates: [
  //     //     {
  //     //       _id: 1,
  //     //       name: 'nombre del Certificado',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 2,
  //     //       name: 'nombre del Certificado',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 3,
  //     //       name: 'nombre del Certificado',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //   ],
  //     //   specificKnowledge: [
  //     //     {
  //     //       _id: 1,
  //     //       name: 'nombre del conocimiento',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 2,
  //     //       name: 'nombre del conocimiento',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 3,
  //     //       name: 'nombre del conocimiento',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //   ],
  //     //   rolResponsabilities: [
  //     //     {
  //     //       _id: 1,
  //     //       name: 'nombre de la función',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //     {
  //     //       _id: 2,
  //     //       name: 'nombre de la función',
  //     //       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  //     //     },
  //     //   ],
  //     //   corporativeCompetences: {
  //     //     assertiveComunication: [
  //     //       {
  //     //         name: 'Comunicación Abierta',
  //     //         measureApproval: 50,
  //     //         id: 1,
  //     //       },
  //     //       {
  //     //         name: 'Comunicación Estricta',
  //     //         measureApproval: 30,
  //     //         id: 2,
  //     //       },
  //     //       {
  //     //         name: 'Retroalimentación',
  //     //         measureApproval: 90,
  //     //         id: 3,
  //     //       },
  //     //     ],
  //     //     achievementOrientation: [
  //     //       {
  //     //         name: 'Orientación al Resultado',
  //     //         measureApproval: 50,
  //     //         id: 4,
  //     //       },
  //     //       {
  //     //         name: 'Planeación',
  //     //         measureApproval: 30,
  //     //         id: 5,
  //     //       },
  //     //       {
  //     //         name: 'Atención al Detalle',
  //     //         measureApproval: 90,
  //     //         id: 6,
  //     //       },
  //     //       {
  //     //         name: 'Sentido de Urgencia',
  //     //         measureApproval: 90,
  //     //         id: 7,
  //     //       },
  //     //     ],
  //     //     serviceOrientation: [
  //     //       {
  //     //         name: 'Autocontrol',
  //     //         measureApproval: 50,
  //     //         id: 8,
  //     //       },
  //     //       {
  //     //         name: 'Habilidad Social',
  //     //         measureApproval: 30,
  //     //         id: 8,
  //     //       },
  //     //       {
  //     //         name: 'Compromiso Laboral',
  //     //         measureApproval: 90,
  //     //         id: 9,
  //     //       },
  //     //     ],
  //     //     teamwork: [
  //     //       {
  //     //         name: 'Adaptabilidad',
  //     //         measureApproval: 50,
  //     //         id: 10,
  //     //       },
  //     //       {
  //     //         name: 'Trabajo en Equipo',
  //     //         measureApproval: 30,
  //     //         id: 11,
  //     //       },
  //     //     ],
  //     //   }
  //     // },
  //   ];
  // }
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
    console.log();
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/studies?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    // return [
    //   {
    //     _id: 1,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 2,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 3,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 4,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 5,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 6,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 7,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 8,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 9,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 10,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 11,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 12,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 13,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 14,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 15,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 16,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 17,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 18,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 19,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 20,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 21,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 22,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 23,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 24,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 25,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 26,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 27,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 28,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 29,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 30,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 31,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 32,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 33,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 34,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 35,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 36,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 37,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 38,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 39,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 40,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 41,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 42,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 43,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    // ];
  }

  async getAllCertificates() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/courses-certifications?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    // return [
    //   {
    //     _id: 1,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 2,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 3,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 4,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 5,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 6,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 7,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 8,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 9,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 10,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    // ];
  }

  async getAllKnowledge() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/specific-knowledge?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    // return [
    //   {
    //     _id: 1,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 2,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 3,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 4,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 5,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 6,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 7,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 8,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 9,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 10,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 11,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 12,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 13,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 14,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 15,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 16,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 17,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 18,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 19,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 20,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 21,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 22,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    // ];
  }

  async getAllFunctions() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/functions?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    // return [
    //   {
    //     _id: 1,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 2,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 3,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 4,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 5,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 6,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 7,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 8,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 9,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 10,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    // ];
  }
  async getAllTalents() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/skills?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    // return [
    //   {
    //     _id: 1,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 2,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 3,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 4,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 5,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 6,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 7,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 8,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 9,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    //   {
    //     _id: 10,
    //     name: 'nombre de la formación',
    //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    //   },
    // ];
  }

  async getAllSecurityResponsabilities(){
    return await this.httpClient
    .get(`${environment.API_MASTER_INFO}/security-responsabilities?status=true`)
    .pipe(pluck('payload'))
    .toPromise();
  }

  historyActions(action: string, data?: any) {
    if (action === 'get') {
      return this.httpClient
        .get(`${environment.API_MASTER_INFO}/historical-records`)
        .pipe(pluck('payload'))
        .toPromise();
    } else if (action === 'post') {
      // console.log(data)
      return this.httpClient
        .post(`${environment.API_MASTER_INFO}/historical-records`, data)
        .pipe(pluck('payload'))
        .toPromise();
    }
  }

  async getData(idProfile: string) {
    // if (idBaseTeam && charge) {
      return await this.httpClient
        .get(
          `${environment.API_BASE_PROFILES}/bases-profiles/${idProfile}`
        )
        .pipe(pluck('payload'))
        .toPromise();
    // } else if (idProfile){
    //   return await this.httpClient
    //     .get(
    //       `${environment.API_BASE_PROFILES}/bases-profiles?idBaseTeam=${idProfile}`
    //     )
    //     .pipe(pluck('payload'))
    //     .toPromise();
    // }
  }
  async updateProfile(id: any, body: any) {
    console.log('ID =>', id, 'BODY =>', body);
    return await this.httpClient
    .put(`${environment.API_MASTER_INFO}/bases-profiles/${id}`, body)
    .pipe(pluck('payload'))
    .toPromise();
  }
}
