import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KitsService } from './services/kits.service';
import { map } from 'rxjs/operators';
import { KitsModels } from './models/kits.models';
import { DatePipe } from '@angular/common';
import { Location} from '@angular/common';
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.scss']
})
export class KitsComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    'name','idCard', 'type','date'
  ];

  data:any[]=[
      {
          "_id": "5ebf2565dd2478001181cb8c",
          "nombre": "UPEGUI BORJA MATEO",
          "cedula": "1037668390",
          "entregado": "SI",
          "fecha": "2020-05-15T18:27:33.422Z",
          "__v": 0
      },
      {
          "_id": "5ebf2719dd2478001181cb8d",
          "nombre": "VASQUEZ GIRALDO DONCEY",
          "cedula": "8063471",
          "entregado": "SI",
          "fecha": "2020-05-15T18:34:49.553Z",
          "__v": 0
      },
      {
          "_id": "5ec29504dd2478001181cbae",
          "nombre": "SALDARRIAGA GOMEZ JUAN CARLOS",
          "cedula": "98594667",
          "entregado": "SI",
          "fecha": "2020-05-18T09:00:36.230Z",
          "__v": 0
      },
      {
          "_id": "5ec29585dd2478001181cbaf",
          "nombre": "VALBUENA FARFAN JORGE HUMBERTO",
          "cedula": "79523349",
          "entregado": "SI",
          "fecha": "2020-05-18T09:02:45.801Z",
          "__v": 0
      },
      {
          "_id": "5ec2b8fadd2478001181cbbc",
          "nombre": "CHIMBI ACOSTA OLGA YAZMIN",
          "cedula": "52301270",
          "entregado": "SI",
          "fecha": "2020-05-18T11:34:02.716Z",
          "__v": 0
      },
      {
          "_id": "5ec2c7aadd2478001181cbbf",
          "nombre": "VALBUENA FARFAN WILLIAM RENE",
          "cedula": "79329168",
          "entregado": "SI",
          "fecha": "2020-05-18T12:36:42.751Z",
          "__v": 0
      },
      {
          "_id": "5ec2f69ddd2478001181cbca",
          "nombre": "JARAMILLO ECHEVERRI LINA MARIA",
          "cedula": "43867018",
          "entregado": "SI",
          "fecha": "2020-05-18T15:57:01.938Z",
          "__v": 0
      },
      {
          "_id": "5ec7ce2834651700112d99c0",
          "nombre": "BEJARANO OCAMPO CARLOS ANDRES",
          "cedula": "1015438352",
          "entregado": "SI",
          "fecha": "2020-05-22T08:05:44.773Z",
          "__v": 0
      },
      {
          "_id": "5ec80bab34651700112d99ca",
          "nombre": "MUTIS GONZALEZ CLAUDIA PATRICIA",
          "cedula": "43740176",
          "entregado": "SI",
          "fecha": "2020-05-22T12:28:11.537Z",
          "__v": 0
      },
      {
          "_id": "5ecfb6d98b541a0019f5885c",
          "nombre": "VARELA BUITRAGO SONIA",
          "cedula": "31472343",
          "entregado": "SI",
          "fecha": "2020-05-28T08:04:25.281Z",
          "__v": 0
      },
      {
          "_id": "5ecfcdc48b541a0019f58863",
          "nombre": "LOMBANA SANCHEZ JOIS",
          "cedula": "53002566",
          "entregado": "SI",
          "fecha": "2020-05-28T09:42:12.969Z",
          "__v": 0
      },
      {
          "_id": "5ed1056f6342c50016c04b31",
          "nombre": "CHAVARRIAGA RESTREPO YULIAN CAMILO",
          "cedula": "1001744222",
          "entregado": "SI",
          "fecha": "2020-05-29T07:51:59.580Z",
          "__v": 0
      },
      {
          "_id": "5ed10be56342c50016c04b3a",
          "nombre": "ORTIZ RENDON MARIA ELIZABETH",
          "cedula": "1036601619",
          "entregado": "SI",
          "fecha": "2020-05-29T08:19:33.711Z",
          "__v": 0
      },
      {
          "_id": "5ed12a5c6342c50016c04b4b",
          "nombre": "VARELA BUITRAGO SONIA",
          "cedula": "31472343",
          "entregado": "SI",
          "fecha": "2020-05-29T10:29:32.232Z",
          "__v": 0
      },
      {
          "_id": "5ed508d1db227a00197d2c78",
          "nombre": "GOMEZ SALINAS BRIGGITH MARIA",
          "cedula": "1014201505",
          "entregado": "SI",
          "fecha": "2020-06-01T08:55:29.381Z",
          "__v": 0
      },
      {
          "_id": "5ed64eaed5daa00018e76a72",
          "nombre": "VELASQUEZ NOREÑA SANTIAGO",
          "cedula": "1039468140",
          "entregado": "SI",
          "fecha": "2020-06-02T08:05:50.658Z",
          "__v": 0
      },
      {
          "_id": "5ed68868d5daa00018e76a85",
          "nombre": "BETANCUR ESCOBAR PAULA ANDREA",
          "cedula": "32243223",
          "entregado": "SI",
          "fecha": "2020-06-02T12:12:08.177Z",
          "__v": 0
      },
      {
          "_id": "5ed9145712fac90011a410f1",
          "nombre": "MARTINEZ DAVILA YENNY PATRICIA",
          "cedula": "1069727281",
          "entregado": "SI",
          "fecha": "2020-06-04T10:33:43.904Z",
          "__v": 0
      },
      {
          "_id": "5ed9354812fac90011a410f3",
          "nombre": "CARDENAS CHALARCA CAROL VIVIANA",
          "cedula": "53089796",
          "entregado": "SI",
          "fecha": "2020-06-04T12:54:16.321Z",
          "__v": 0
      },
      {
          "_id": "5ede3e2332359f00187beb95",
          "nombre": "MUÑOZ PEREZ ESTEFANIA",
          "cedula": "1001328504",
          "entregado": "SI",
          "fecha": "2020-06-08T08:33:23.295Z",
          "__v": 0
      },
      {
          "_id": "5ede4f2532359f00187beba1",
          "nombre": "HERNANDEZ SUAREZ INGRID JULIETH",
          "cedula": "1073153394",
          "entregado": "SI",
          "fecha": "2020-06-08T09:45:57.332Z",
          "__v": 0
      },
      {
          "_id": "5ede737c32359f00187bebac",
          "nombre": "POSADA AGUDELO MARYLIN",
          "cedula": "1007238970",
          "entregado": "SI",
          "fecha": "2020-06-08T12:21:00.190Z",
          "__v": 0
      },
      {
          "_id": "5ede746132359f00187bebaf",
          "nombre": "HINCAPIE NARANJO DUMAR ALEXIS",
          "cedula": "98712111",
          "entregado": "SI",
          "fecha": "2020-06-08T12:24:49.634Z",
          "__v": 0
      },
      {
          "_id": "5edfd0033dc19100189a077b",
          "nombre": "CASTIBLANCO MORA JEIMMY ALEXANDRA",
          "cedula": "1010192836",
          "entregado": "SI",
          "fecha": "2020-06-09T13:08:03.329Z",
          "__v": 0
      },
      {
          "_id": "5ee13fafc1aa3c00129ba406",
          "nombre": "HERNANDEZ SUAREZ INGRID JULIETH",
          "cedula": "1073153394",
          "entregado": "SI",
          "fecha": "2020-06-10T15:16:47.476Z",
          "__v": 0
      },
      {
          "_id": "5ee225ecf6ae9b00189e1015",
          "nombre": "LUNA BOCANEGRA HILDA MILENA",
          "cedula": "39580143",
          "entregado": "SI",
          "fecha": "2020-06-11T07:39:08.432Z",
          "__v": 0
      },
      {
          "_id": "5ee2893df6ae9b00189e1026",
          "nombre": "TOLEDO FRANCO SANTIAGO ALBERTO",
          "cedula": "1089744389",
          "entregado": "SI",
          "fecha": "2020-06-11T14:42:53.521Z",
          "__v": 0
      },
      {
          "_id": "5ee902d3da77590011c2cd99",
          "nombre": "SANCHEZ QUINTERO JESUS ANDRES",
          "cedula": "1152460146",
          "entregado": "SI",
          "fecha": "2020-06-16T12:35:15.440Z",
          "__v": 0
      },
      {
          "_id": "5eea150ced314f00183fa4ce",
          "nombre": "DUQUE YARCE SUSANA",
          "cedula": "1017275479",
          "entregado": "SI",
          "fecha": "2020-06-17T08:05:16.529Z",
          "__v": 0
      },
      {
          "_id": "5eea205dda5e0500115b9e18",
          "nombre": "GAÑAN OSPINA MONICA ELIANA",
          "cedula": "1020434839",
          "entregado": "SI",
          "fecha": "2020-06-17T08:53:33.325Z",
          "__v": 0
      },
      {
          "_id": "5eea342ada5e0500115b9e1c",
          "nombre": "ESPITIA GONZALEZ VICTOR MIGUEL",
          "cedula": "1040741020",
          "entregado": "SI",
          "fecha": "2020-06-17T10:18:02.121Z",
          "__v": 0
      },
      {
          "_id": "5eea34cada5e0500115b9e1e",
          "nombre": "PATIÑO CIRO JHOAN ESTEBAN",
          "cedula": "1042062823",
          "entregado": "SI",
          "fecha": "2020-06-17T10:20:42.364Z",
          "__v": 0
      },
      {
          "_id": "5eecbda69f16400018a02261",
          "nombre": "MURILLO GRISALES LUIS GABRIEL",
          "cedula": "71294532",
          "entregado": "SI",
          "fecha": "2020-06-19T08:29:10.638Z",
          "__v": 0
      },
      {
          "_id": "5ef1f254377d45001111ca4f",
          "nombre": "HENAO OVIEDO NELLY ESTEFANIA",
          "cedula": "1017190440",
          "entregado": "SI",
          "fecha": "2020-06-23T07:15:16.263Z",
          "__v": 0
      },
      {
          "_id": "5efb67a5d305a800189fddb9",
          "nombre": "LOAIZA HOYOS DIANA MARIA",
          "cedula": "43990405",
          "entregado": "SI",
          "fecha": "2020-06-30T11:26:13.366Z",
          "__v": 0
      },
      {
          "_id": "5efc9df0e5f09500117c34bc",
          "nombre": "SANCHEZ QUINTERO JESUS ANDRES",
          "cedula": "1152460146",
          "entregado": "SI",
          "fecha": "2020-07-01T09:30:08.596Z",
          "__v": 0
      },
      {
          "_id": "5efceb90e5f09500117c34cf",
          "nombre": "LUNA BOCANEGRA HILDA MILENA",
          "cedula": "39580143",
          "entregado": "SI",
          "fecha": "2020-07-01T15:01:20.711Z",
          "__v": 0
      },
      {
          "_id": "5eff3136253a980011e37157",
          "nombre": "OJEDA PEÑA FRANCISCO JAVIER",
          "cedula": "73559966",
          "entregado": "SI",
          "fecha": "2020-07-03T08:23:02.330Z",
          "__v": 0
      },
      {
          "_id": "5eff31f1253a980011e37159",
          "nombre": "CASTILLO LOPEZ CHRISTIAN ALEXANDER",
          "cedula": "7174683",
          "entregado": "SI",
          "fecha": "2020-07-03T08:26:09.305Z",
          "__v": 0
      },
      {
          "_id": "5eff32f3253a980011e3715b",
          "nombre": "GAMBOA DIAZ JHONNATAN ARTURO",
          "cedula": "80187407",
          "entregado": "SI",
          "fecha": "2020-07-03T08:30:27.422Z",
          "__v": 0
      },
      {
          "_id": "5eff4897253a980011e3715d",
          "nombre": "DUCUARA CRUZ JUAN ERNESTO",
          "cedula": "11232341",
          "entregado": "SI",
          "fecha": "2020-07-03T10:02:47.889Z",
          "__v": 0
      },
      {
          "_id": "5f031594010669001848775d",
          "nombre": "RODRIGUEZ TRUJILLANO HUGO ARMANDO",
          "cedula": "6098516",
          "entregado": "SI",
          "fecha": "2020-07-06T07:14:12.532Z",
          "__v": 0
      },
      {
          "_id": "5f0315da0106690018487760",
          "nombre": "BARRERA ECHAVARRIA ANA MARIA",
          "cedula": "42878007",
          "entregado": "SI",
          "fecha": "2020-07-06T07:15:22.023Z",
          "__v": 0
      },
      {
          "_id": "5f0316430106690018487765",
          "nombre": "SIERRA RODRIGUEZ DIANA PATRICIA",
          "cedula": "51940570",
          "entregado": "SI",
          "fecha": "2020-07-06T07:17:07.267Z",
          "__v": 0
      },
      {
          "_id": "5f0317ed010669001848776e",
          "nombre": "SIERRA ZAPATA WILSON FERNANDO",
          "cedula": "98636925",
          "entregado": "SI",
          "fecha": "2020-07-06T07:24:13.293Z",
          "__v": 0
      },
      {
          "_id": "5f032058010669001848777e",
          "nombre": "VARGAS BETANCOURT LINA MARCELA",
          "cedula": "43614198",
          "entregado": "SI",
          "fecha": "2020-07-06T08:00:08.560Z",
          "__v": 0
      },
      {
          "_id": "5f03793501066900184877b1",
          "nombre": "CARVAJAL VARGAS VALERIA",
          "cedula": "1128282108",
          "entregado": "SI",
          "fecha": "2020-07-06T14:19:17.367Z",
          "__v": 0
      },
      {
          "_id": "5f04689073d4ca0011316fe7",
          "nombre": "ARBELAEZ GUTIERREZ MATEO",
          "cedula": "1039471166",
          "entregado": "SI",
          "fecha": "2020-07-07T07:20:32.055Z",
          "__v": 0
      },
      {
          "_id": "5f0468ba73d4ca0011316fea",
          "nombre": "AGUILAR RAMIREZ HUGO LEON",
          "cedula": "98564656",
          "entregado": "SI",
          "fecha": "2020-07-07T07:21:14.034Z",
          "__v": 0
      },
      {
          "_id": "5f046bee73d4ca0011316ffc",
          "nombre": "CORREA NAVARRO HENRY",
          "cedula": "80014564",
          "entregado": "SI",
          "fecha": "2020-07-07T07:34:54.040Z",
          "__v": 0
      },
      {
          "_id": "5f046bee73d4ca0011316ffd",
          "nombre": "CORREA NAVARRO HENRY",
          "cedula": "80014564",
          "entregado": "SI",
          "fecha": "2020-07-07T07:34:54.043Z",
          "__v": 0
      },
      {
          "_id": "5f0471f273d4ca001131700c",
          "nombre": "ASPRILLA MOSQUERA LUIS ALBERTO",
          "cedula": "1129045190",
          "entregado": "SI",
          "fecha": "2020-07-07T08:00:34.891Z",
          "__v": 0
      },
      {
          "_id": "5f04bcb373d4ca001131703c",
          "nombre": "GARCIA TORRES DIANA VANESA",
          "cedula": "1152202921",
          "entregado": "SI",
          "fecha": "2020-07-07T13:19:31.429Z",
          "__v": 0
      },
      {
          "_id": "5f0743c9a1e19900119e649c",
          "nombre": "COLORADO ZULUAGA LUIS FELIPE",
          "cedula": "3396832",
          "entregado": "SI",
          "fecha": "2020-07-09T11:20:25.443Z",
          "__v": 0
      },
      {
          "_id": "5f08ada997b06700188b04a9",
          "nombre": "UPEGUI BORJA MATEO",
          "cedula": "1037668390",
          "entregado": "SI",
          "fecha": "2020-07-10T13:04:25.577Z",
          "__v": 0
      },
      {
          "_id": "5f10b0b1d7b73f00118d6c1c",
          "nombre": "VALENZUELA GARZON ANDERSON FABIAN",
          "cedula": "1096255949",
          "entregado": "SI",
          "fecha": "2020-07-16T14:55:29.303Z",
          "__v": 0
      },
      {
          "_id": "5f1ec941facd1d0018fcaff6",
          "nombre": "GONZALEZ BOLAÑOS EDGAR ANDRES",
          "cedula": "80138911",
          "entregado": "SI",
          "fecha": "2020-07-27T07:32:01.863Z",
          "__v": 0
      },
      {
          "_id": "5f1ecc3efacd1d0018fcaffa",
          "nombre": "NEIRA SUAREZ JORGE",
          "cedula": "80425744",
          "entregado": "SI",
          "fecha": "2020-07-27T07:44:46.014Z",
          "__v": 0
      },
      {
          "_id": "5f1ed17bfacd1d0018fcb00b",
          "nombre": "SANTAMARIA SANTAMARIA ANDRES LEONARDO",
          "cedula": "80025657",
          "entregado": "SI",
          "fecha": "2020-07-27T08:07:07.991Z",
          "__v": 0
      },
      {
          "_id": "5f1ed17cfacd1d0018fcb00c",
          "nombre": "SANTAMARIA SANTAMARIA ANDRES LEONARDO",
          "cedula": "80025657",
          "entregado": "SI",
          "fecha": "2020-07-27T08:07:08.111Z",
          "__v": 0
      },
      {
          "_id": "5f284ca3b80b930018297a2e",
          "nombre": "HERNANDEZ SUAREZ INGRID JULIETH",
          "cedula": "1073153394",
          "entregado": "SI",
          "fecha": "2020-08-03T12:42:59.924Z",
          "__v": 0
      },
      {
          "_id": "5f284ca3b80b930018297a2f",
          "nombre": "HERNANDEZ SUAREZ INGRID JULIETH",
          "cedula": "1073153394",
          "entregado": "SI",
          "fecha": "2020-08-03T12:42:59.953Z",
          "__v": 0
      },
      {
          "_id": "5f284cc5b80b930018297a30",
          "nombre": "APONTE TORRES ERIC YESID",
          "cedula": "1032460549",
          "entregado": "SI",
          "fecha": "2020-08-03T12:43:33.481Z",
          "__v": 0
      },
      {
          "_id": "5f2857d7b80b930018297a3c",
          "nombre": "ROA SUAREZ JUAN DAVID",
          "cedula": "1075872331",
          "entregado": "SI",
          "fecha": "2020-08-03T13:30:47.373Z",
          "__v": 0
      },
      {
          "_id": "5f2ac8a2ce15df001174fae6",
          "nombre": "GOMEZ CORTES DAVID",
          "cedula": "1037637202",
          "entregado": "SI",
          "fecha": "2020-08-05T09:56:34.370Z",
          "__v": 0
      },
      {
          "_id": "5f2ac919ce15df001174fae7",
          "nombre": "URDANETA BRACHO DAYANA EMPERATRIZ",
          "cedula": "566805",
          "entregado": "SI",
          "fecha": "2020-08-05T09:58:33.684Z",
          "__v": 0
      },
      {
          "_id": "5f2ae8f3ce15df001174faef",
          "nombre": "BENJUMEA VARELA VICTOR AUGUSTO",
          "cedula": "71684367",
          "entregado": "SI",
          "fecha": "2020-08-05T12:14:27.404Z",
          "__v": 0
      },
      {
          "_id": "5f2c3b7e2d349d0018af3c1d",
          "nombre": "Hanna Maria Buelvas Maya",
          "cedula": "1001229204",
          "entregado": "SI",
          "fecha": "2020-08-06T12:18:54.814Z",
          "__v": 0
      },
      {
          "_id": "5f3153d2fc13570018805db5",
          "nombre": "Viviana Andrea Maldonado Beltran",
          "cedula": "1098735611",
          "entregado": "SI",
          "fecha": "2020-08-10T09:04:02.073Z",
          "__v": 0
      },
      {
          "_id": "5f315715fc13570018805db7",
          "nombre": "Liceth Dayana Muñoz Mesa",
          "cedula": "1214726789",
          "entregado": "SI",
          "fecha": "2020-08-10T09:17:57.990Z",
          "__v": 0
      },
      {
          "_id": "5f328dea9685240018b1e243",
          "nombre": "Norbey Dario Cortes Sierra",
          "cedula": "1128392867",
          "entregado": "SI",
          "fecha": "2020-08-11T07:24:10.206Z",
          "__v": 0
      },
      {
          "_id": "5f328f1b9685240018b1e24c",
          "nombre": "Laura Andrea Usma Herrera",
          "cedula": "1039023759",
          "entregado": "SI",
          "fecha": "2020-08-11T07:29:15.291Z",
          "__v": 0
      },
      {
          "_id": "5f32a52a9685240018b1e258",
          "nombre": "Juan David Aguirre Ramirez",
          "cedula": "1040739432",
          "entregado": "SI",
          "fecha": "2020-08-11T09:03:22.697Z",
          "__v": 0
      },
      {
          "_id": "5f32c6769685240018b1e26c",
          "nombre": "Juan Fernando Velez Brand",
          "cedula": "15349558",
          "entregado": "SI",
          "fecha": "2020-08-11T11:25:26.037Z",
          "__v": 0
      },
      {
          "_id": "5f3d65f1705a1f00116b8b4d",
          "nombre": "Daniela Gomez Vera",
          "cedula": "1152211293",
          "entregado": "SI",
          "fecha": "2020-08-19T12:48:33.074Z",
          "__v": 0
      },
      {
          "_id": "5f4cfbe2140b0d00189a0842",
          "nombre": "David Antonio Jaramillo Mejia",
          "cedula": "71765165",
          "entregado": "SI",
          "fecha": "2020-08-31T08:32:18.013Z",
          "__v": 0
      },
      {
          "_id": "5f5687ba283ed70018c74aae",
          "nombre": "Andres Felipe Berrio Ocampo",
          "cedula": "1214728880",
          "entregado": "SI",
          "fecha": "2020-09-07T14:19:22.957Z",
          "__v": 0
      },
      {
          "_id": "5f58f254589d6e001119451c",
          "nombre": "Yairu Alejandra Ramos Vargas",
          "cedula": "994873",
          "entregado": "SI",
          "fecha": "2020-09-09T10:18:44.363Z",
          "__v": 0
      },
      {
          "_id": "5f5a52262b249000185415a0",
          "nombre": "Edwyn Ivan Salamanca Macias",
          "cedula": "4086099",
          "entregado": "SI",
          "fecha": "2020-09-10T11:19:50.709Z",
          "__v": 0
      },
      {
          "_id": "5f5ba62f3f20320011630cba",
          "nombre": "Claudia Marcela Mendoza Castillo",
          "cedula": "39762036",
          "entregado": "SI",
          "fecha": "2020-09-11T11:30:39.351Z",
          "__v": 0
      },
      {
          "_id": "5f6cd60312913200119de6e2",
          "nombre": "Daniel Ricardo Mora Bello",
          "cedula": "1024532832",
          "entregado": "SI",
          "fecha": "2020-09-24T12:23:15.754Z",
          "__v": 0
      },
      {
          "_id": "5f6cffdb12913200119de6f8",
          "nombre": "Victor Julian Niño Vargas",
          "cedula": "1082993206",
          "entregado": "SI",
          "fecha": "2020-09-24T15:21:47.862Z",
          "__v": 0
      },
      {
          "_id": "5f7222095228bd00180534a1",
          "nombre": "Manuela Giraldo Vega",
          "cedula": "43222461",
          "entregado": "SI",
          "fecha": "2020-09-28T12:48:57.425Z",
          "__v": 0
      },
      {
          "_id": "5f734fc68dc94a00111a858a",
          "nombre": "Jose Luis Prada",
          "cedula": "832496",
          "entregado": "SI",
          "fecha": "2020-09-29T10:16:22.480Z",
          "__v": 0
      },
      {
          "_id": "5f75e8e5d5fc3600183667e3",
          "nombre": "Fredy Enrique Rodriguez Cruz",
          "cedula": "79593032",
          "entregado": "SI",
          "fecha": "2020-10-01T09:34:13.067Z",
          "__v": 0
      },
      {
          "_id": "5f85ab8c2c9bfe00118bbab8",
          "nombre": "Julieth Damaris Leal Poveda",
          "cedula": "1032475232",
          "entregado": "SI",
          "fecha": "2020-10-13T08:28:44.446Z",
          "__v": 0
      },
      {
          "_id": "5f85aba52c9bfe00118bbaba",
          "nombre": "Yedinson Calvo Barrios",
          "cedula": "1121853699",
          "entregado": "SI",
          "fecha": "2020-10-13T08:29:09.937Z",
          "__v": 0
      },
      {
          "_id": "5f85aec72c9bfe00118bbac3",
          "nombre": "John Alexander Medina Hernandez",
          "cedula": "1010213930",
          "entregado": "SI",
          "fecha": "2020-10-13T08:42:31.724Z",
          "__v": 0
      },
      {
          "_id": "5f85d5a12c9bfe00118bbacf",
          "nombre": "Liby Dayana Ramirez Hernandez",
          "cedula": "52657072",
          "entregado": "SI",
          "fecha": "2020-10-13T11:28:17.168Z",
          "__v": 0
      },
      {
          "_id": "5f85d8042c9bfe00118bbad4",
          "nombre": "Patricia Lourdes Veliz Mijares",
          "cedula": "403574",
          "entregado": "SI",
          "fecha": "2020-10-13T11:38:28.517Z",
          "__v": 0
      },
      {
          "_id": "5f85f7f32c9bfe00118bbb15",
          "nombre": "Kelly Johana Camargo Ordoñez",
          "cedula": "1106740258",
          "entregado": "SI",
          "fecha": "2020-10-13T13:54:43.325Z",
          "__v": 0
      },
      {
          "_id": "5f860c7c2c9bfe00118bbb1f",
          "nombre": "Julian David Perez Salinas",
          "cedula": "80035018",
          "entregado": "SI",
          "fecha": "2020-10-13T15:22:20.297Z",
          "__v": 0
      },
      {
          "_id": "5f874336fd298d0018f5fb6b",
          "nombre": "Jeisson Fabian Perez Rodriguez",
          "cedula": "1016021569",
          "entregado": "SI",
          "fecha": "2020-10-14T13:28:06.636Z",
          "__v": 0
      },
      {
          "_id": "5f874f9dfd298d0018f5fb7d",
          "nombre": "Sergio Andres Zambrano Arias",
          "cedula": "1001115655",
          "entregado": "SI",
          "fecha": "2020-10-14T14:21:01.733Z",
          "__v": 0
      },
      {
          "_id": "5f8891ea0d970a00116529a8",
          "nombre": "Yuset Mercado Vanegas",
          "cedula": "8787378",
          "entregado": "SI",
          "fecha": "2020-10-15T13:16:10.997Z",
          "__v": 0
      },
      {
          "_id": "5f8891eb0d970a00116529a9",
          "nombre": "Yuset Mercado Vanegas",
          "cedula": "8787378",
          "entregado": "SI",
          "fecha": "2020-10-15T13:16:11.076Z",
          "__v": 0
      },
      {
          "_id": "5f89a4bd97cf13001842562e",
          "nombre": "Oscar Ivan Romero Correa",
          "cedula": "79841906",
          "entregado": "SI",
          "fecha": "2020-10-16T08:48:45.394Z",
          "__v": 0
      },
      {
          "_id": "5f8db220934b6500182cfa68",
          "nombre": "Raul Andres Cajamarca Zea",
          "cedula": "1073230682",
          "entregado": "SI",
          "fecha": "2020-10-19T10:34:56.776Z",
          "__v": 0
      },
      {
          "_id": "5f96cb1b184afe00184e4f1a",
          "nombre": "Yulver Alexander Arias Gonzalez",
          "cedula": "1073695428",
          "entregado": "SI",
          "fecha": "2020-10-26T08:11:55.081Z",
          "__v": 0
      },
      {
          "_id": "5f96e976184afe00184e4f22",
          "nombre": "Kevin Armando Vargas Diaz",
          "cedula": "80927059",
          "entregado": "SI",
          "fecha": "2020-10-26T10:21:26.629Z",
          "__v": 0
      },
      {
          "_id": "5f9981b7c33623001861be98",
          "nombre": "Wilmer Esteban Contreras Garcia",
          "cedula": "1001062534",
          "entregado": "SI",
          "fecha": "2020-10-28T09:35:35.527Z",
          "__v": 0
      },
      {
          "_id": "5f999cdcc33623001861bea7",
          "nombre": "Luis Fernando Hernandez Londoño",
          "cedula": "80028744",
          "entregado": "SI",
          "fecha": "2020-10-28T11:31:24.675Z",
          "__v": 0
      },
      {
          "_id": "5f999cdcc33623001861bea8",
          "nombre": "Luis Fernando Hernandez Londoño",
          "cedula": "80028744",
          "entregado": "SI",
          "fecha": "2020-10-28T11:31:24.678Z",
          "__v": 0
      },
      {
          "_id": "5f999ce1c33623001861bea9",
          "nombre": "Maria Camila Hernandez Moya",
          "cedula": "1018488634",
          "entregado": "SI",
          "fecha": "2020-10-28T11:31:29.284Z",
          "__v": 0
      },
      {
          "_id": "5f99b449c33623001861bec9",
          "nombre": "Manuel Andres Diaz Bernal",
          "cedula": "1022347382",
          "entregado": "SI",
          "fecha": "2020-10-28T13:11:21.054Z",
          "__v": 0
      },
      {
          "_id": "5f9c18f824c3b1001871214a",
          "nombre": "Miguel Alexander Davalos Laverde",
          "cedula": "80150935",
          "entregado": "SI",
          "fecha": "2020-10-30T08:45:28.463Z",
          "__v": 0
      },
      {
          "_id": "5f9c242c24c3b1001871214d",
          "nombre": "Henry David Muñoz Rodriguez",
          "cedula": "1010180931",
          "entregado": "SI",
          "fecha": "2020-10-30T09:33:16.095Z",
          "__v": 0
      },
      {
          "_id": "5f9c242c24c3b1001871214e",
          "nombre": "Henry David Muñoz Rodriguez",
          "cedula": "1010180931",
          "entregado": "SI",
          "fecha": "2020-10-30T09:33:16.132Z",
          "__v": 0
      },
      {
          "_id": "5fa93344cf58a300180945ff",
          "nombre": "Luz Mireya Sarmiento Acosta",
          "cedula": "52020382",
          "entregado": "SI",
          "fecha": "2020-11-09T07:17:08.648Z",
          "__v": 0
      },
      {
          "_id": "5fb3c83d94efe400119cf89a",
          "nombre": "Alberto Herrera Medina",
          "cedula": "80912630",
          "entregado": "SI",
          "fecha": "2020-11-17T07:55:25.195Z",
          "__v": 0
      },
      {
          "_id": "5fb3c83d94efe400119cf899",
          "nombre": "Alberto Herrera Medina",
          "cedula": "80912630",
          "entregado": "SI",
          "fecha": "2020-11-17T07:55:25.193Z",
          "__v": 0
      },
      {
          "_id": "5fb3c8a894efe400119cf89b",
          "nombre": "Sebastian Melo Guevara",
          "cedula": "1032469336",
          "entregado": "SI",
          "fecha": "2020-11-17T07:57:12.814Z",
          "__v": 0
      },
      {
          "_id": "5fb3c8a894efe400119cf89c",
          "nombre": "Sebastian Melo Guevara",
          "cedula": "1032469336",
          "entregado": "SI",
          "fecha": "2020-11-17T07:57:12.870Z",
          "__v": 0
      },
      {
          "_id": "5fb3ce1094efe400119cf8ae",
          "nombre": "Jhon Alexander Giraldo Morales",
          "cedula": "1020803645",
          "entregado": "SI",
          "fecha": "2020-11-17T08:20:16.032Z",
          "__v": 0
      },
      {
          "_id": "5fb3ce7c94efe400119cf8b3",
          "nombre": "William David Sanchez Acevedo",
          "cedula": "1016087606",
          "entregado": "SI",
          "fecha": "2020-11-17T08:22:04.224Z",
          "__v": 0
      },
      {
          "_id": "5fb3ce7c94efe400119cf8b4",
          "nombre": "William David Sanchez Acevedo",
          "cedula": "1016087606",
          "entregado": "SI",
          "fecha": "2020-11-17T08:22:04.238Z",
          "__v": 0
      },
      {
          "_id": "5fb3d16c94efe400119cf8ba",
          "nombre": "Jefferson Efren Alonso Cardenas",
          "cedula": "80767816",
          "entregado": "SI",
          "fecha": "2020-11-17T08:34:36.387Z",
          "__v": 0
      },
      {
          "_id": "5fb3d16c94efe400119cf8bb",
          "nombre": "Jefferson Efren Alonso Cardenas",
          "cedula": "80767816",
          "entregado": "SI",
          "fecha": "2020-11-17T08:34:36.422Z",
          "__v": 0
      },
      {
          "_id": "5fb3d4dd94efe400119cf8bd",
          "nombre": "Heiner Martin Diaz Mendoza",
          "cedula": "1140845936",
          "entregado": "SI",
          "fecha": "2020-11-17T08:49:17.737Z",
          "__v": 0
      },
      {
          "_id": "5fb3d4dd94efe400119cf8be",
          "nombre": "Heiner Martin Diaz Mendoza",
          "cedula": "1140845936",
          "entregado": "SI",
          "fecha": "2020-11-17T08:49:17.739Z",
          "__v": 0
      },
      {
          "_id": "5fb3d4dd94efe400119cf8bf",
          "nombre": "Heiner Martin Diaz Mendoza",
          "cedula": "1140845936",
          "entregado": "SI",
          "fecha": "2020-11-17T08:49:17.875Z",
          "__v": 0
      },
      {
          "_id": "5fb41e6f94efe400119cf8fe",
          "nombre": "Alexander Rafael Suarez Martinez",
          "cedula": "1034314781",
          "entregado": "SI",
          "fecha": "2020-11-17T14:03:11.208Z",
          "__v": 0
      },
      {
          "_id": "5fb50787e2d0b5001813fe5e",
          "nombre": "Yeison Orlando Montaña D Alleman",
          "cedula": "1022365057",
          "entregado": "SI",
          "fecha": "2020-11-18T06:37:43.006Z",
          "__v": 0
      },
      {
          "_id": "5fb51968e2d0b5001813fe9e",
          "nombre": "Fabian Herrera Sanabria",
          "cedula": "4192672",
          "entregado": "SI",
          "fecha": "2020-11-18T07:54:00.683Z",
          "__v": 0
      },
      {
          "_id": "5fb51978e2d0b5001813fea0",
          "nombre": "Andres Humberto Fonseca Forero",
          "cedula": "1014187796",
          "entregado": "SI",
          "fecha": "2020-11-18T07:54:16.536Z",
          "__v": 0
      },
      {
          "_id": "5fb51ddde2d0b5001813feb5",
          "nombre": "Giovanny Andres Orjuela Melo",
          "cedula": "1110538682",
          "entregado": "SI",
          "fecha": "2020-11-18T08:13:01.698Z",
          "__v": 0
      },
      {
          "_id": "5fb51ddde2d0b5001813feb6",
          "nombre": "Giovanny Andres Orjuela Melo",
          "cedula": "1110538682",
          "entregado": "SI",
          "fecha": "2020-11-18T08:13:01.702Z",
          "__v": 0
      },
      {
          "_id": "5fb51e6ae2d0b5001813febb",
          "nombre": "Ismary Lisbeth Diaz Flores",
          "cedula": "973119",
          "entregado": "SI",
          "fecha": "2020-11-18T08:15:22.654Z",
          "__v": 0
      },
      {
          "_id": "5fb5214de2d0b5001813fec2",
          "nombre": "Wilson Andres Ruiz Suarez",
          "cedula": "79953533",
          "entregado": "SI",
          "fecha": "2020-11-18T08:27:41.438Z",
          "__v": 0
      },
      {
          "_id": "5fb532ede2d0b5001813fecd",
          "nombre": "Wilmar Santiago Rodriguez Maldonado",
          "cedula": "79704253",
          "entregado": "SI",
          "fecha": "2020-11-18T09:42:53.611Z",
          "__v": 0
      },
      {
          "_id": "5fb658da02fe930018dbc9c0",
          "nombre": "Alexander Enrique Galvis Carrasco",
          "cedula": "79745229",
          "entregado": "SI",
          "fecha": "2020-11-19T06:36:58.413Z",
          "__v": 0
      },
      {
          "_id": "5fb658fb02fe930018dbc9c1",
          "nombre": "Eder Mauricio Altamar Marimon",
          "cedula": "72288790",
          "entregado": "SI",
          "fecha": "2020-11-19T06:37:31.518Z",
          "__v": 0
      },
      {
          "_id": "5fb659d302fe930018dbc9c4",
          "nombre": "Eglin Eliani Torres Velasquez",
          "cedula": "883911",
          "entregado": "SI",
          "fecha": "2020-11-19T06:41:07.355Z",
          "__v": 0
      },
      {
          "_id": "5fb65a7e02fe930018dbc9c9",
          "nombre": "David Alejandro Hernandez Diaz",
          "cedula": "567327",
          "entregado": "SI",
          "fecha": "2020-11-19T06:43:58.282Z",
          "__v": 0
      },
      {
          "_id": "5fb65cdc02fe930018dbc9cc",
          "nombre": "Victor Javier Bautista Estupiñan",
          "cedula": "1098691676",
          "entregado": "SI",
          "fecha": "2020-11-19T06:54:04.985Z",
          "__v": 0
      },
      {
          "_id": "5fb6602102fe930018dbc9e3",
          "nombre": "Kevin Armando Vargas Diaz",
          "cedula": "80927059",
          "entregado": "SI",
          "fecha": "2020-11-19T07:08:01.932Z",
          "__v": 0
      },
      {
          "_id": "5fb6766b02fe930018dbca30",
          "nombre": "Javier Habacuc Paez Prieto",
          "cedula": "79164305",
          "entregado": "SI",
          "fecha": "2020-11-19T08:43:07.305Z",
          "__v": 0
      },
      {
          "_id": "5fb6768402fe930018dbca31",
          "nombre": "Oscar Andres Hurtado Osorio",
          "cedula": "1115083535",
          "entregado": "SI",
          "fecha": "2020-11-19T08:43:32.200Z",
          "__v": 0
      },
      {
          "_id": "5fb676c802fe930018dbca32",
          "nombre": "Milton Andres Diaz Castellanos",
          "cedula": "1018407189",
          "entregado": "SI",
          "fecha": "2020-11-19T08:44:40.613Z",
          "__v": 0
      },
      {
          "_id": "5fb6772d02fe930018dbca36",
          "nombre": "Napoleon Murcia Gomez",
          "cedula": "1053771851",
          "entregado": "SI",
          "fecha": "2020-11-19T08:46:21.089Z",
          "__v": 0
      },
      {
          "_id": "5fb6774002fe930018dbca38",
          "nombre": "Fernando Villamil Aldana",
          "cedula": "79578606",
          "entregado": "SI",
          "fecha": "2020-11-19T08:46:40.145Z",
          "__v": 0
      },
      {
          "_id": "5fb7b149c7b1ac00125d550b",
          "nombre": "Eric Jose Garcia Garcia",
          "cedula": "1034315717",
          "entregado": "SI",
          "fecha": "2020-11-20T07:06:33.149Z",
          "__v": 0
      },
      {
          "_id": "5fb7b1e1c7b1ac00125d550f",
          "nombre": "Juan Manuel Orellanos Mariño",
          "cedula": "1093753901",
          "entregado": "SI",
          "fecha": "2020-11-20T07:09:05.343Z",
          "__v": 0
      },
      {
          "_id": "5fb7b43fc7b1ac00125d5519",
          "nombre": "Jaime Andres Mariño Londoño",
          "cedula": "80021121",
          "entregado": "SI",
          "fecha": "2020-11-20T07:19:11.259Z",
          "__v": 0
      },
      {
          "_id": "5fb7b53ac7b1ac00125d551c",
          "nombre": "Andres Enrique Fuentes Gomez",
          "cedula": "80853013",
          "entregado": "SI",
          "fecha": "2020-11-20T07:23:22.660Z",
          "__v": 0
      },
      {
          "_id": "5fb7bba0c7b1ac00125d5534",
          "nombre": "Roberto Vladimir Bernal Hernandez",
          "cedula": "80757544",
          "entregado": "SI",
          "fecha": "2020-11-20T07:50:40.161Z",
          "__v": 0
      },
      {
          "_id": "5fb7bbe1c7b1ac00125d5536",
          "nombre": "Edward Andres Fonca Bejarano",
          "cedula": "1020776598",
          "entregado": "SI",
          "fecha": "2020-11-20T07:51:45.908Z",
          "__v": 0
      },
      {
          "_id": "5fb7bf1dc7b1ac00125d5545",
          "nombre": "Francisco Javier Obando De La Cruz",
          "cedula": "87064302",
          "entregado": "SI",
          "fecha": "2020-11-20T08:05:33.418Z",
          "__v": 0
      },
      {
          "_id": "5fb7bf6ac7b1ac00125d5547",
          "nombre": "Jose Johany Castro Cala",
          "cedula": "80131520",
          "entregado": "SI",
          "fecha": "2020-11-20T08:06:50.836Z",
          "__v": 0
      },
      {
          "_id": "5fb82408c7b1ac00125d558b",
          "nombre": "Francisco Jose Gutierrez Parrado",
          "cedula": "86077269",
          "entregado": "SI",
          "fecha": "2020-11-20T15:16:08.934Z",
          "__v": 0
      },
      {
          "_id": "5fb82c43c7b1ac00125d558f",
          "nombre": "Emilio Alfonso Pallares Navarrete",
          "cedula": "79947438",
          "entregado": "SI",
          "fecha": "2020-11-20T15:51:15.316Z",
          "__v": 0
      },
      {
          "_id": "5fbbacbb748bab0018b5af18",
          "nombre": "Fabian Alfonso Mejia Lemus",
          "cedula": "79375381",
          "entregado": "SI",
          "fecha": "2020-11-23T07:36:11.092Z",
          "__v": 0
      },
      {
          "_id": "5fbbb1f1748bab0018b5af2e",
          "nombre": "Luis Miguel Altahona Colpas",
          "cedula": "72309655",
          "entregado": "SI",
          "fecha": "2020-11-23T07:58:25.454Z",
          "__v": 0
      },
      {
          "_id": "5fbbb20b748bab0018b5af2f",
          "nombre": "Fabian Alfonso Mejia Lemus",
          "cedula": "79375381",
          "entregado": "SI",
          "fecha": "2020-11-23T07:58:51.868Z",
          "__v": 0
      },
      {
          "_id": "5fbbc3db748bab0018b5af3e",
          "nombre": "Jose Alberto Magdaleno Hernandez",
          "cedula": "512141",
          "entregado": "SI",
          "fecha": "2020-11-23T09:14:51.714Z",
          "__v": 0
      },
      {
          "_id": "5fbcf1d7e8f32400112c2221",
          "nombre": "Oscar Mauricio Franco Suarez",
          "cedula": "93410209",
          "entregado": "SI",
          "fecha": "2020-11-24T06:43:19.969Z",
          "__v": 0
      },
      {
          "_id": "5fbcf856e8f32400112c2242",
          "nombre": "Efigenia Monroy Villamarin",
          "cedula": "51966094",
          "entregado": "SI",
          "fecha": "2020-11-24T07:11:02.682Z",
          "__v": 0
      },
      {
          "_id": "5fbcff9ce8f32400112c2258",
          "nombre": "Juan Manuel Sanchez Bejarano",
          "cedula": "79123520",
          "entregado": "SI",
          "fecha": "2020-11-24T07:42:04.721Z",
          "__v": 0
      },
      {
          "_id": "5fbd035be8f32400112c2264",
          "nombre": "Daniel Ricardo Mora Bello",
          "cedula": "1024532832",
          "entregado": "SI",
          "fecha": "2020-11-24T07:58:03.543Z",
          "__v": 0
      },
      {
          "_id": "5fbd03c1e8f32400112c2265",
          "nombre": "Sergio Sanchez Barrera",
          "cedula": "1031161321",
          "entregado": "SI",
          "fecha": "2020-11-24T07:59:45.611Z",
          "__v": 0
      },
      {
          "_id": "5fbd0557e8f32400112c2271",
          "nombre": "Juan Manuel Torres Rodriguez",
          "cedula": "1075668517",
          "entregado": "SI",
          "fecha": "2020-11-24T08:06:31.801Z",
          "__v": 0
      },
      {
          "_id": "5fbd0872e8f32400112c227a",
          "nombre": "Edwin Ariostol Ramirez Gonzalez",
          "cedula": "80038832",
          "entregado": "SI",
          "fecha": "2020-11-24T08:19:46.626Z",
          "__v": 0
      },
      {
          "_id": "5fbd1957e8f32400112c2282",
          "nombre": "William Stephan Ramirez Neira",
          "cedula": "79455440",
          "entregado": "SI",
          "fecha": "2020-11-24T09:31:51.301Z",
          "__v": 0
      },
      {
          "_id": "5fbd30e7e8f32400112c228a",
          "nombre": "Edward Andres Parra Rodriguez",
          "cedula": "1032371453",
          "entregado": "SI",
          "fecha": "2020-11-24T11:12:23.447Z",
          "__v": 0
      },
      {
          "_id": "5fbd7f03e8f32400112c22b9",
          "nombre": "Nelson Andres Sora Mora",
          "cedula": "1013593990",
          "entregado": "SI",
          "fecha": "2020-11-24T16:45:39.183Z",
          "__v": 0
      },
      {
          "_id": "5fbe49959818b200187ed837",
          "nombre": "Ricardo Mario Andrade Muñiz",
          "cedula": "73578121",
          "entregado": "SI",
          "fecha": "2020-11-25T07:09:57.095Z",
          "__v": 0
      },
      {
          "_id": "5fbe49a29818b200187ed838",
          "nombre": "Sandra Milena Rojas Piedrahita",
          "cedula": "52504569",
          "entregado": "SI",
          "fecha": "2020-11-25T07:10:10.389Z",
          "__v": 0
      },
      {
          "_id": "5fbe4b109818b200187ed83c",
          "nombre": "Yanneth Yamir Gonzalez Poveda",
          "cedula": "1002674389",
          "entregado": "SI",
          "fecha": "2020-11-25T07:16:16.979Z",
          "__v": 0
      },
      {
          "_id": "5fbe4ca99818b200187ed842",
          "nombre": "Jorge Alberto Molina García",
          "cedula": "80740472",
          "entregado": "SI",
          "fecha": "2020-11-25T07:23:05.007Z",
          "__v": 0
      },
      {
          "_id": "5fbe52c29818b200187ed859",
          "nombre": "Alvaro Andres Avila Gordillo",
          "cedula": "1014205705",
          "entregado": "SI",
          "fecha": "2020-11-25T07:49:06.847Z",
          "__v": 0
      },
      {
          "_id": "5fbe54529818b200187ed85f",
          "nombre": "Antonio Rafael Galvez Horna",
          "cedula": "412485",
          "entregado": "SI",
          "fecha": "2020-11-25T07:55:46.401Z",
          "__v": 0
      },
      {
          "_id": "5fbe54529818b200187ed860",
          "nombre": "Antonio Rafael Galvez Horna",
          "cedula": "412485",
          "entregado": "SI",
          "fecha": "2020-11-25T07:55:46.412Z",
          "__v": 0
      },
      {
          "_id": "5fbe54529818b200187ed861",
          "nombre": "Antonio Rafael Galvez Horna",
          "cedula": "412485",
          "entregado": "SI",
          "fecha": "2020-11-25T07:55:46.413Z",
          "__v": 0
      },
      {
          "_id": "5fbe54529818b200187ed862",
          "nombre": "Antonio Rafael Galvez Horna",
          "cedula": "412485",
          "entregado": "SI",
          "fecha": "2020-11-25T07:55:46.416Z",
          "__v": 0
      },
      {
          "_id": "5fbe56c99818b200187ed870",
          "nombre": "Juan Carlos Gutierrez Morales",
          "cedula": "1016023183",
          "entregado": "SI",
          "fecha": "2020-11-25T08:06:17.738Z",
          "__v": 0
      },
      {
          "_id": "5fbe56c99818b200187ed871",
          "nombre": "Juan Carlos Gutierrez Morales",
          "cedula": "1016023183",
          "entregado": "SI",
          "fecha": "2020-11-25T08:06:17.741Z",
          "__v": 0
      },
      {
          "_id": "5fbe573f9818b200187ed878",
          "nombre": "Marisol Cabrera Carrasco",
          "cedula": "36312771",
          "entregado": "SI",
          "fecha": "2020-11-25T08:08:15.216Z",
          "__v": 0
      },
      {
          "_id": "5fbe59699818b200187ed880",
          "nombre": "Jhon Alexander Martinez Romero",
          "cedula": "1023900552",
          "entregado": "SI",
          "fecha": "2020-11-25T08:17:29.622Z",
          "__v": 0
      },
      {
          "_id": "5fbe61d39818b200187ed883",
          "nombre": "Jennyffer Karina Beltran Sanchez",
          "cedula": "53115330",
          "entregado": "SI",
          "fecha": "2020-11-25T08:53:23.081Z",
          "__v": 0
      },
      {
          "_id": "5fbe6ee49818b200187ed888",
          "nombre": "Jeisson Fabian Perez Rodriguez",
          "cedula": "1016021569",
          "entregado": "SI",
          "fecha": "2020-11-25T09:49:08.814Z",
          "__v": 0
      },
      {
          "_id": "5fbf942ea042a600111dd869",
          "nombre": "Alexander Sanchez Barbosa",
          "cedula": "1012406043",
          "entregado": "SI",
          "fecha": "2020-11-26T06:40:30.152Z",
          "__v": 0
      },
      {
          "_id": "5fbf9491a042a600111dd86a",
          "nombre": "Patricia Martinez Peñaloza",
          "cedula": "52172363",
          "entregado": "SI",
          "fecha": "2020-11-26T06:42:09.060Z",
          "__v": 0
      },
      {
          "_id": "5fbf94c3a042a600111dd86b",
          "nombre": "Aida Fabiola Hernandez Fajardo",
          "cedula": "52764595",
          "entregado": "SI",
          "fecha": "2020-11-26T06:42:59.457Z",
          "__v": 0
      },
      {
          "_id": "5fbf9522a042a600111dd86c",
          "nombre": "Gelber Adrian Perea Collazos",
          "cedula": "6107546",
          "entregado": "SI",
          "fecha": "2020-11-26T06:44:34.174Z",
          "__v": 0
      },
      {
          "_id": "5fbf9584a042a600111dd86e",
          "nombre": "Kelly Yohana Pescador Varon",
          "cedula": "1016050963",
          "entregado": "SI",
          "fecha": "2020-11-26T06:46:12.017Z",
          "__v": 0
      },
      {
          "_id": "5fbf98bea042a600111dd875",
          "nombre": "Niny Andrea Higuera Linares",
          "cedula": "1015393144",
          "entregado": "SI",
          "fecha": "2020-11-26T06:59:58.202Z",
          "__v": 0
      },
      {
          "_id": "5fbf9903a042a600111dd877",
          "nombre": "Lorena Pinilla Caro",
          "cedula": "1019084542",
          "entregado": "SI",
          "fecha": "2020-11-26T07:01:07.081Z",
          "__v": 0
      },
      {
          "_id": "5fbfa2d7a042a600111dd89a",
          "nombre": "Alba Carolina Delgado Bray",
          "cedula": "53088264",
          "entregado": "SI",
          "fecha": "2020-11-26T07:43:03.690Z",
          "__v": 0
      },
      {
          "_id": "5fbfa306a042a600111dd89d",
          "nombre": "Andres Ruge Gamba",
          "cedula": "1032415802",
          "entregado": "SI",
          "fecha": "2020-11-26T07:43:50.451Z",
          "__v": 0
      },
      {
          "_id": "5fbfa604a042a600111dd8b0",
          "nombre": "Charles Alexander Moncada Salazar",
          "cedula": "79892945",
          "entregado": "SI",
          "fecha": "2020-11-26T07:56:36.077Z",
          "__v": 0
      },
      {
          "_id": "5fbfa8d2a042a600111dd8bc",
          "nombre": "Diana Lorena Quintero Castañeda",
          "cedula": "1053768424",
          "entregado": "SI",
          "fecha": "2020-11-26T08:08:34.745Z",
          "__v": 0
      },
      {
          "_id": "5fbfa8d2a042a600111dd8bd",
          "nombre": "Diana Lorena Quintero Castañeda",
          "cedula": "1053768424",
          "entregado": "SI",
          "fecha": "2020-11-26T08:08:34.747Z",
          "__v": 0
      },
      {
          "_id": "5fbfaed8a042a600111dd8c9",
          "nombre": "Edicson Ferley Sanchez Rojas",
          "cedula": "1013600960",
          "entregado": "SI",
          "fecha": "2020-11-26T08:34:16.218Z",
          "__v": 0
      },
      {
          "_id": "5fbfaed8a042a600111dd8ca",
          "nombre": "Edicson Ferley Sanchez Rojas",
          "cedula": "1013600960",
          "entregado": "SI",
          "fecha": "2020-11-26T08:34:16.675Z",
          "__v": 0
      },
      {
          "_id": "5fc0e60662cc5000185eadad",
          "nombre": "Fredy Correa Corredor",
          "cedula": "79601496",
          "entregado": "SI",
          "fecha": "2020-11-27T06:41:58.683Z",
          "__v": 0
      },
      {
          "_id": "5fc0e72c62cc5000185eadb1",
          "nombre": "Miguel Alejandro Bazurto Ortiz",
          "cedula": "80502894",
          "entregado": "SI",
          "fecha": "2020-11-27T06:46:52.406Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2d62cc5000185eadbc",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:57.977Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadbd",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.128Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadbe",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.130Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadbf",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.131Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadc0",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.133Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadc1",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.134Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadc2",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.135Z",
          "__v": 0
      },
      {
          "_id": "5fc0eb2e62cc5000185eadc3",
          "nombre": "Maira Julieth Aviles Ramirez",
          "cedula": "1110461986",
          "entregado": "SI",
          "fecha": "2020-11-27T07:03:58.154Z",
          "__v": 0
      },
      {
          "_id": "5fc0efa362cc5000185eadd5",
          "nombre": "Jennifer Ospina Castañeda",
          "cedula": "52751017",
          "entregado": "SI",
          "fecha": "2020-11-27T07:22:59.406Z",
          "__v": 0
      },
      {
          "_id": "5fc0efe362cc5000185eadda",
          "nombre": "Wendy Paola Forero Ochoa",
          "cedula": "1022421056",
          "entregado": "SI",
          "fecha": "2020-11-27T07:24:03.972Z",
          "__v": 0
      },
      {
          "_id": "5fc0f2fd62cc5000185eade1",
          "nombre": "Francisco Javier Celis Alvarez",
          "cedula": "79406596",
          "entregado": "SI",
          "fecha": "2020-11-27T07:37:17.812Z",
          "__v": 0
      },
      {
          "_id": "5fc0f60262cc5000185eadef",
          "nombre": "Oscar Fabian Prieto Hernandez",
          "cedula": "1032419467",
          "entregado": "SI",
          "fecha": "2020-11-27T07:50:10.144Z",
          "__v": 0
      },
      {
          "_id": "5fc0f7e462cc5000185eadfa",
          "nombre": "Cesar Andres Robayo Robayo",
          "cedula": "80222855",
          "entregado": "SI",
          "fecha": "2020-11-27T07:58:12.998Z",
          "__v": 0
      },
      {
          "_id": "5fc0f87462cc5000185eadfc",
          "nombre": "Karen Lorena Naranjo Villegas",
          "cedula": "1014253249",
          "entregado": "SI",
          "fecha": "2020-11-27T08:00:36.695Z",
          "__v": 0
      },
      {
          "_id": "5fc0f87462cc5000185eadfd",
          "nombre": "Karen Lorena Naranjo Villegas",
          "cedula": "1014253249",
          "entregado": "SI",
          "fecha": "2020-11-27T08:00:36.767Z",
          "__v": 0
      },
      {
          "_id": "5fc0fa9662cc5000185eae0e",
          "nombre": "Jonathan Enrique Molina Lugo",
          "cedula": "80189973",
          "entregado": "SI",
          "fecha": "2020-11-27T08:09:42.942Z",
          "__v": 0
      },
      {
          "_id": "5fc0fedb62cc5000185eae1c",
          "nombre": "Juan Alejandro Cardona Lopez",
          "cedula": "4416480",
          "entregado": "SI",
          "fecha": "2020-11-27T08:27:55.285Z",
          "__v": 0
      },
      {
          "_id": "5fc0ff4762cc5000185eae1e",
          "nombre": "Eduard Alejandro Sanchez Lopera",
          "cedula": "1045107607",
          "entregado": "SI",
          "fecha": "2020-11-27T08:29:43.457Z",
          "__v": 0
      },
      {
          "_id": "5fc0ff4762cc5000185eae1f",
          "nombre": "Eduard Alejandro Sanchez Lopera",
          "cedula": "1045107607",
          "entregado": "SI",
          "fecha": "2020-11-27T08:29:43.497Z",
          "__v": 0
      },
      {
          "_id": "5fc10c7a62cc5000185eae23",
          "nombre": "Daniel Fernando Pamo Camacho",
          "cedula": "1024495839",
          "entregado": "SI",
          "fecha": "2020-11-27T09:26:02.651Z",
          "__v": 0
      },
      {
          "_id": "5fc4eed34046320018c06390",
          "nombre": "Jair Fernando Arevalo Cortes",
          "cedula": "1053323728",
          "entregado": "SI",
          "fecha": "2020-11-30T08:08:35.797Z",
          "__v": 0
      },
      {
          "_id": "5fc4f05c4046320018c06394",
          "nombre": "Jose Arturo Lemus Caicedo",
          "cedula": "80740880",
          "entregado": "SI",
          "fecha": "2020-11-30T08:15:08.069Z",
          "__v": 0
      },
      {
          "_id": "5fc4f13d4046320018c06397",
          "nombre": "Guillermo Leon Puerta Cifuentes",
          "cedula": "1017163264",
          "entregado": "SI",
          "fecha": "2020-11-30T08:18:53.631Z",
          "__v": 0
      },
      {
          "_id": "5fc4f17c4046320018c06398",
          "nombre": "Nestor Alejandro Colorado Farfán",
          "cedula": "1073532863",
          "entregado": "SI",
          "fecha": "2020-11-30T08:19:56.368Z",
          "__v": 0
      },
      {
          "_id": "5fc4f5044046320018c063a3",
          "nombre": "Cesar Fernando Ayala Moreno",
          "cedula": "19434771",
          "entregado": "SI",
          "fecha": "2020-11-30T08:35:00.590Z",
          "__v": 0
      },
      {
          "_id": "5fc501c74046320018c063b0",
          "nombre": "Cristhian Camilo Herrera Charry",
          "cedula": "1030591508",
          "entregado": "SI",
          "fecha": "2020-11-30T09:29:27.298Z",
          "__v": 0
      },
      {
          "_id": "5fc6372d82e9770018a71493",
          "nombre": "Juan David Tenjo Celis",
          "cedula": "79863586",
          "entregado": "SI",
          "fecha": "2020-12-01T07:29:33.491Z",
          "__v": 0
      },
      {
          "_id": "5fc637b482e9770018a71496",
          "nombre": "Alezzandra Rodriguez Yuncosa",
          "cedula": "526699",
          "entregado": "SI",
          "fecha": "2020-12-01T07:31:48.150Z",
          "__v": 0
      },
      {
          "_id": "5fc638de82e9770018a7149a",
          "nombre": "Jairo Alfonso Parra Bulla",
          "cedula": "79449584",
          "entregado": "SI",
          "fecha": "2020-12-01T07:36:46.428Z",
          "__v": 0
      },
      {
          "_id": "5fc63b4d82e9770018a714a7",
          "nombre": "Monica Alejandra Rojas Gonzalez",
          "cedula": "1010211091",
          "entregado": "SI",
          "fecha": "2020-12-01T07:47:09.887Z",
          "__v": 0
      },
      {
          "_id": "5fc63b8382e9770018a714aa",
          "nombre": "Oscar Manuel Lopez Rojas",
          "cedula": "80206784",
          "entregado": "SI",
          "fecha": "2020-12-01T07:48:03.061Z",
          "__v": 0
      },
      {
          "_id": "5fc642e382e9770018a714c7",
          "nombre": "Juliet Milena Gomez Marquez",
          "cedula": "52929270",
          "entregado": "SI",
          "fecha": "2020-12-01T08:19:31.954Z",
          "__v": 0
      },
      {
          "_id": "5fc644a382e9770018a714cf",
          "nombre": "Vidael Fernando Fontalvo López",
          "cedula": "1012364243",
          "entregado": "SI",
          "fecha": "2020-12-01T08:26:59.477Z",
          "__v": 0
      },
      {
          "_id": "5fc644d382e9770018a714d1",
          "nombre": "John Freddy Cordoba Gonzalez",
          "cedula": "1012335579",
          "entregado": "SI",
          "fecha": "2020-12-01T08:27:47.038Z",
          "__v": 0
      },
      {
          "_id": "5fc644d382e9770018a714d2",
          "nombre": "John Freddy Cordoba Gonzalez",
          "cedula": "1012335579",
          "entregado": "SI",
          "fecha": "2020-12-01T08:27:47.157Z",
          "__v": 0
      },
      {
          "_id": "5fc64e6a82e9770018a714d8",
          "nombre": "Julian Andres Silva Villamil",
          "cedula": "80156204",
          "entregado": "SI",
          "fecha": "2020-12-01T09:08:42.606Z",
          "__v": 0
      },
      {
          "_id": "5fc64e6a82e9770018a714d9",
          "nombre": "Julian Andres Silva Villamil",
          "cedula": "80156204",
          "entregado": "SI",
          "fecha": "2020-12-01T09:08:42.609Z",
          "__v": 0
      },
      {
          "_id": "5fc64e6a82e9770018a714da",
          "nombre": "Julian Andres Silva Villamil",
          "cedula": "80156204",
          "entregado": "SI",
          "fecha": "2020-12-01T09:08:42.716Z",
          "__v": 0
      },
      {
          "_id": "5fc6bba682e9770018a71512",
          "nombre": "Yulver Alexander Arias Gonzalez",
          "cedula": "1073695428",
          "entregado": "SI",
          "fecha": "2020-12-01T16:54:46.887Z",
          "__v": 0
      },
      {
          "_id": "5fc6bbff82e9770018a71515",
          "nombre": "Juan Nicolas Gomez Trujillo",
          "cedula": "1024571334",
          "entregado": "SI",
          "fecha": "2020-12-01T16:56:15.029Z",
          "__v": 0
      },
      {
          "_id": "5fc7903fa790f100116de72c",
          "nombre": "Camilo Torres Cardenas",
          "cedula": "1077970363",
          "entregado": "SI",
          "fecha": "2020-12-02T08:01:51.500Z",
          "__v": 0
      },
      {
          "_id": "5fc7b870a790f100116de747",
          "nombre": "Michael David Cruz Parra",
          "cedula": "1022406698",
          "entregado": "SI",
          "fecha": "2020-12-02T10:53:20.094Z",
          "__v": 0
      },
      {
          "_id": "5fc8d9bcc8b7b70018cf6ca9",
          "nombre": "Patricia Hernandez Pulido",
          "cedula": "51868129",
          "entregado": "SI",
          "fecha": "2020-12-03T07:27:40.435Z",
          "__v": 0
      },
      {
          "_id": "5fc8d9c7c8b7b70018cf6caa",
          "nombre": "Edith Angelica Gonzalez Jimenez",
          "cedula": "52421831",
          "entregado": "SI",
          "fecha": "2020-12-03T07:27:51.568Z",
          "__v": 0
      },
      {
          "_id": "5fc8da6fc8b7b70018cf6cae",
          "nombre": "Marco Antonio Davila Paz",
          "cedula": "12983708",
          "entregado": "SI",
          "fecha": "2020-12-03T07:30:39.157Z",
          "__v": 0
      },
      {
          "_id": "5fc8dfe5c8b7b70018cf6cbe",
          "nombre": "Jose Gilberto Moreno Celis",
          "cedula": "80793849",
          "entregado": "SI",
          "fecha": "2020-12-03T07:53:57.845Z",
          "__v": 0
      },
      {
          "_id": "5fc8dfe5c8b7b70018cf6cbf",
          "nombre": "Jose Gilberto Moreno Celis",
          "cedula": "80793849",
          "entregado": "SI",
          "fecha": "2020-12-03T07:53:57.852Z",
          "__v": 0
      },
      {
          "_id": "5fc8e1d3c8b7b70018cf6cc8",
          "nombre": "Oswaldo David Romero Garcia",
          "cedula": "80724992",
          "entregado": "SI",
          "fecha": "2020-12-03T08:02:11.777Z",
          "__v": 0
      },
      {
          "_id": "5fc8e348c8b7b70018cf6ccd",
          "nombre": "Adriana Bautista Martinez",
          "cedula": "1020722911",
          "entregado": "SI",
          "fecha": "2020-12-03T08:08:24.344Z",
          "__v": 0
      },
      {
          "_id": "5fc8e3cec8b7b70018cf6ccf",
          "nombre": "Jose Luis Durango Vega",
          "cedula": "1016018451",
          "entregado": "SI",
          "fecha": "2020-12-03T08:10:38.776Z",
          "__v": 0
      },
      {
          "_id": "5fc8e4bbc8b7b70018cf6cd1",
          "nombre": "Camilo Fernando Najar Rodriguez",
          "cedula": "7185821",
          "entregado": "SI",
          "fecha": "2020-12-03T08:14:35.180Z",
          "__v": 0
      },
      {
          "_id": "5fc8ec2dc8b7b70018cf6cd6",
          "nombre": "Johanna Alexandra Torres Bobadilla",
          "cedula": "52707705",
          "entregado": "SI",
          "fecha": "2020-12-03T08:46:21.063Z",
          "__v": 0
      },
      {
          "_id": "5fc8f091c8b7b70018cf6cdb",
          "nombre": "Jhon Jairo Jurado Aguirre",
          "cedula": "93401365",
          "entregado": "SI",
          "fecha": "2020-12-03T09:05:05.734Z",
          "__v": 0
      },
      {
          "_id": "5fc8f228c8b7b70018cf6cde",
          "nombre": "Francisco Jose Gutierrez Parrado",
          "cedula": "86077269",
          "entregado": "SI",
          "fecha": "2020-12-03T09:11:52.404Z",
          "__v": 0
      },
      {
          "_id": "5fca2c4d49e9a000188afaaa",
          "nombre": "Jairo Alexander Fraile Blanco",
          "cedula": "79738661",
          "entregado": "SI",
          "fecha": "2020-12-04T07:32:13.228Z",
          "__v": 0
      },
      {
          "_id": "5fca301649e9a000188afab5",
          "nombre": "Malloring Leonor Perez Roncancio",
          "cedula": "1030566972",
          "entregado": "SI",
          "fecha": "2020-12-04T07:48:22.645Z",
          "__v": 0
      },
      {
          "_id": "5fca338849e9a000188afac0",
          "nombre": "Yesica Tatiana Jaraba Ramos",
          "cedula": "1110491818",
          "entregado": "SI",
          "fecha": "2020-12-04T08:03:04.136Z",
          "__v": 0
      },
      {
          "_id": "5fca33f649e9a000188afac4",
          "nombre": "German Mauricio Gutierrez Cubillos",
          "cedula": "1023868545",
          "entregado": "SI",
          "fecha": "2020-12-04T08:04:54.944Z",
          "__v": 0
      },
      {
          "_id": "5fca33f749e9a000188afac5",
          "nombre": "German Mauricio Gutierrez Cubillos",
          "cedula": "1023868545",
          "entregado": "SI",
          "fecha": "2020-12-04T08:04:55.096Z",
          "__v": 0
      },
      {
          "_id": "5fd0c5a40acdb200110b3633",
          "nombre": "David Galeano Espitia",
          "cedula": "1022977154",
          "entregado": "SI",
          "fecha": "2020-12-09T07:40:04.617Z",
          "__v": 0
      },
      {
          "_id": "5fd0c5a40acdb200110b3634",
          "nombre": "David Galeano Espitia",
          "cedula": "1022977154",
          "entregado": "SI",
          "fecha": "2020-12-09T07:40:04.670Z",
          "__v": 0
      },
      {
          "_id": "5fd0c5c50acdb200110b3636",
          "nombre": "Diego Fernando Mendoza Vasquez",
          "cedula": "1013591667",
          "entregado": "SI",
          "fecha": "2020-12-09T07:40:37.479Z",
          "__v": 0
      },
      {
          "_id": "5fd0c64a0acdb200110b3637",
          "nombre": "Carlos Ruben Barrios Portal",
          "cedula": "634851",
          "entregado": "SI",
          "fecha": "2020-12-09T07:42:50.903Z",
          "__v": 0
      },
      {
          "_id": "5fd0c64a0acdb200110b3638",
          "nombre": "Carlos Ruben Barrios Portal",
          "cedula": "634851",
          "entregado": "SI",
          "fecha": "2020-12-09T07:42:50.916Z",
          "__v": 0
      },
      {
          "_id": "5fd0ca380acdb200110b3647",
          "nombre": "Jairo Alonso Arevalo Cortes",
          "cedula": "7318042",
          "entregado": "SI",
          "fecha": "2020-12-09T07:59:36.160Z",
          "__v": 0
      },
      {
          "_id": "5fd374dc316d060011e59ab7",
          "nombre": "Nestor Javier Villabona Gualdron",
          "cedula": "1098605373",
          "entregado": "SI",
          "fecha": "2020-12-11T08:32:12.783Z",
          "__v": 0
      },
      {
          "_id": "5fd38229316d060011e59abd",
          "nombre": "Jose David Malaver Parrado",
          "cedula": "1015402549",
          "entregado": "SI",
          "fecha": "2020-12-11T09:28:57.941Z",
          "__v": 0
      },
      {
          "_id": "5fd38a72316d060011e59abf",
          "nombre": "Monica Maria Vallecilla Sierra",
          "cedula": "66803677",
          "entregado": "SI",
          "fecha": "2020-12-11T10:04:18.263Z",
          "__v": 0
      },
      {
          "_id": "5fd38a72316d060011e59ac0",
          "nombre": "Monica Maria Vallecilla Sierra",
          "cedula": "66803677",
          "entregado": "SI",
          "fecha": "2020-12-11T10:04:18.274Z",
          "__v": 0
      },
      {
          "_id": "5fe097018526280018959330",
          "nombre": "Jose Luis Prada",
          "cedula": "832496",
          "entregado": "SI",
          "fecha": "2020-12-21T07:37:21.154Z",
          "__v": 0
      },
      {
          "_id": "6000bfbfd3ac090018c07ad9",
          "nombre": "Jean Carlo Salazar Ospina",
          "cedula": "1026163147",
          "entregado": "SI",
          "fecha": "2021-01-14T17:03:43.527Z",
          "__v": 0
      },
      {
          "_id": "6001d09e1b0281001805c4be",
          "nombre": "Jean Carlo Salazar Ospina",
          "cedula": "1026163147",
          "entregado": "SI",
          "fecha": "2021-01-15T12:27:58.195Z",
          "__v": 0
      },
      {
          "_id": "6009b07917ae5500118a2ce7",
          "nombre": "Francisco Jose Gutierrez Parrado",
          "cedula": "86077269",
          "entregado": "SI",
          "fecha": "2021-01-21T11:48:57.758Z",
          "__v": 0
      },
      {
          "_id": "600efb8e5398ee001839223c",
          "nombre": "Ricardo Adolfo Montoya Moreno",
          "cedula": "1020401933",
          "entregado": "SI",
          "fecha": "2021-01-25T12:10:38.747Z",
          "__v": 0
      },
      {
          "_id": "601af15f4a75d7001104039c",
          "nombre": "Jenny Patricia Bernal Vivas",
          "cedula": "53168277",
          "entregado": "SI",
          "fecha": "2021-02-03T13:54:23.627Z",
          "__v": 0
      },
      {
          "_id": "601af1a74a75d7001104039d",
          "nombre": "Jenny Patricia Bernal Vivas",
          "cedula": "53168277",
          "entregado": "SI",
          "fecha": "2021-02-03T13:55:35.067Z",
          "__v": 0
      },
      {
          "_id": "602165b8f1b48c00182343cb",
          "nombre": "Carlos Mauricio Botero Gomez",
          "cedula": "1036647436",
          "entregado": "SI",
          "fecha": "2021-02-08T11:24:24.677Z",
          "__v": 0
      },
      {
          "_id": "602165b9f1b48c00182343cc",
          "nombre": "Carlos Mauricio Botero Gomez",
          "cedula": "1036647436",
          "entregado": "SI",
          "fecha": "2021-02-08T11:24:25.378Z",
          "__v": 0
      },
      {
          "_id": "602165dbf1b48c00182343cd",
          "nombre": "Carlos Mauricio Botero Gomez",
          "cedula": "1036647436",
          "entregado": "SI",
          "fecha": "2021-02-08T11:24:59.612Z",
          "__v": 0
      },
      {
          "_id": "60216604f1b48c00182343d0",
          "nombre": "Juan Carlos Ortiz Casas",
          "cedula": "98621543",
          "entregado": "SI",
          "fecha": "2021-02-08T11:25:40.820Z",
          "__v": 0
      },
      {
          "_id": "60216604f1b48c00182343d1",
          "nombre": "Juan Carlos Ortiz Casas",
          "cedula": "98621543",
          "entregado": "SI",
          "fecha": "2021-02-08T11:25:40.973Z",
          "__v": 0
      },
      {
          "_id": "60216ee0f1b48c00182343db",
          "nombre": "Angie Daniela Anacona Taque",
          "cedula": "1073519466",
          "entregado": "SI",
          "fecha": "2021-02-08T12:03:28.763Z",
          "__v": 0
      },
      {
          "_id": "60216ee0f1b48c00182343dc",
          "nombre": "Angie Daniela Anacona Taque",
          "cedula": "1073519466",
          "entregado": "SI",
          "fecha": "2021-02-08T12:03:28.866Z",
          "__v": 0
      },
      {
          "_id": "60216ef7f1b48c00182343dd",
          "nombre": "Nelson Steven Duarte Traslaviña",
          "cedula": "1000505176",
          "entregado": "SI",
          "fecha": "2021-02-08T12:03:51.356Z",
          "__v": 0
      },
      {
          "_id": "60216ef7f1b48c00182343de",
          "nombre": "Nelson Steven Duarte Traslaviña",
          "cedula": "1000505176",
          "entregado": "SI",
          "fecha": "2021-02-08T12:03:51.413Z",
          "__v": 0
      },
      {
          "_id": "60216efbf1b48c00182343df",
          "nombre": "Yuliana Andrea Ramos Rincon",
          "cedula": "1110589707",
          "entregado": "SI",
          "fecha": "2021-02-08T12:03:55.948Z",
          "__v": 0
      },
      {
          "_id": "60216efbf1b48c00182343e0",
          "nombre": "Yuliana Andrea Ramos Rincon",
          "cedula": "1110589707",
          "entregado": "SI",
          "fecha": "2021-02-08T12:03:55.951Z",
          "__v": 0
      },
      {
          "_id": "602ad16720449c0018487560",
          "nombre": "Roberth Castaño Garcia",
          "cedula": "1094893147",
          "entregado": "SI",
          "fecha": "2021-02-15T14:54:15.516Z",
          "__v": 0
      },
      {
          "_id": "602ae95b20449c0018487569",
          "nombre": "Josue Danilo Galindo Sierra",
          "cedula": "1018480559",
          "entregado": "SI",
          "fecha": "2021-02-15T16:36:27.527Z",
          "__v": 0
      },
      {
          "_id": "603401d79c704c0018db7d73",
          "nombre": "Juan Camilo Betancur Zapata",
          "cedula": "98716197",
          "entregado": "SI",
          "fecha": "2021-02-22T14:11:19.106Z",
          "__v": 0
      },
      {
          "_id": "603d254ef250ad0018c82a31",
          "nombre": "Lina Andrea Arboleda Parra",
          "cedula": "1036610919",
          "entregado": "SI",
          "fecha": "2021-03-01T12:33:02.977Z",
          "__v": 0
      },
      {
          "_id": "603d2558f250ad0018c82a32",
          "nombre": "Luis Fernando Jimenez Henao",
          "cedula": "98709538",
          "entregado": "SI",
          "fecha": "2021-03-01T12:33:12.205Z",
          "__v": 0
      },
      {
          "_id": "603d3098f250ad0018c82a40",
          "nombre": "Yuver Andrey Leon Camelo",
          "cedula": "1012402291",
          "entregado": "SI",
          "fecha": "2021-03-01T13:21:12.223Z",
          "__v": 0
      },
      {
          "_id": "6075a44df6416d0018f1e797",
          "nombre": "Jeysson Ivan Chingate Mora",
          "cedula": "1018483899",
          "entregado": "SI",
          "fecha": "2021-04-13T09:01:49.145Z",
          "__v": 0
      },
      {
          "_id": "608033af03c3260011b1e4e6",
          "nombre": "Leidy Tatiana Peñuela Romero",
          "cedula": "1000733671",
          "entregado": "SI",
          "fecha": "2021-04-21T09:16:15.492Z",
          "__v": 0
      },
      {
          "_id": "60a3fe6c5d3fb60018f10dcf",
          "nombre": "Jahir Humberto Guevara Mesa",
          "cedula": "1033775836",
          "entregado": "SI",
          "fecha": "2021-05-18T12:50:36.668Z",
          "__v": 0
      },
      {
          "_id": "60a3fe6c5d3fb60018f10dce",
          "nombre": "Jahir Humberto Guevara Mesa",
          "cedula": "1033775836",
          "entregado": "SI",
          "fecha": "2021-05-18T12:50:36.654Z",
          "__v": 0
      },
      {
          "_id": "60a3fe965d3fb60018f10dd0",
          "nombre": "Fabricio Jose Correa Ruiz",
          "cedula": "79576063",
          "entregado": "SI",
          "fecha": "2021-05-18T12:51:18.375Z",
          "__v": 0
      },
      {
          "_id": "60a3fe965d3fb60018f10dd1",
          "nombre": "Fabricio Jose Correa Ruiz",
          "cedula": "79576063",
          "entregado": "SI",
          "fecha": "2021-05-18T12:51:18.377Z",
          "__v": 0
      },
      {
          "_id": "60ecc08274a5a60018605cac",
          "nombre": "Brayan Stevek Lemus Quiroga",
          "cedula": "1020804314",
          "entregado": "SI",
          "fecha": "2021-07-12T17:21:54.223Z",
          "__v": 0
      },
      {
          "_id": "60fec5fa33fbca001881da42",
          "nombre": "Diego Mauricio Diaz Morales",
          "cedula": "93403142",
          "entregado": "SI",
          "fecha": "2021-07-26T09:26:02.487Z",
          "__v": 0
      },
      {
          "_id": "6108437525e10f0018aedfde",
          "nombre": "Camilo Andres Barajas Hernandez",
          "cedula": "80162651",
          "entregado": "SI",
          "fecha": "2021-08-02T14:11:49.746Z",
          "__v": 0
      },
      {
          "_id": "6108437525e10f0018aedfdf",
          "nombre": "Camilo Andres Barajas Hernandez",
          "cedula": "80162651",
          "entregado": "SI",
          "fecha": "2021-08-02T14:11:49.886Z",
          "__v": 0
      },
      {
          "_id": "610ab925442e7e0018a7c43b",
          "nombre": "Ramiro Alonso Quimbayo Avila",
          "cedula": "1012466080",
          "entregado": "SI",
          "fecha": "2021-08-04T10:58:29.330Z",
          "__v": 0
      },
      {
          "_id": "62448d82a08a180018c52eb4",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:04:02.353Z",
          "__v": 0
      },
      {
          "_id": "62448d82a08a180018c52eb5",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:04:02.364Z",
          "__v": 0
      },
      {
          "_id": "62448d82a08a180018c52eb6",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:04:02.498Z",
          "__v": 0
      },
      {
          "_id": "62448db8a08a180018c52eb7",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:04:56.757Z",
          "__v": 0
      },
      {
          "_id": "62448db8a08a180018c52eb8",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:04:56.773Z",
          "__v": 0
      },
      {
          "_id": "62449010a08a180018c52eba",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:14:56.201Z",
          "__v": 0
      },
      {
          "_id": "62449018a08a180018c52ebb",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:15:04.329Z",
          "__v": 0
      },
      {
          "_id": "62449023a08a180018c52ebc",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-03-30T12:15:15.161Z",
          "__v": 0
      },
      {
          "_id": "62476888df69b800111a96e1",
          "nombre": "Ana Maria Ramirez Grattz",
          "cedula": "1110496858",
          "entregado": "SI",
          "fecha": "2022-04-01T16:03:04.166Z",
          "__v": 0
      }
  ]
  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });
  maxDate:Date=new Date();
  minDate!:Date;
  infoData:any=[];
  filterKeys:any={};
  dataSource!: MatTableDataSource<any>;
  datePipe = new DatePipe('es-CO');

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private kitService: KitsService,
    private loc: Location,
    private searchFilter: SearchFilterPipe,
  ) {}

  ngOnInit(): void {

    /* this.kitService.getKitsList()
    .pipe(
      map((res: any) => {
       return res.map((item: any) => {
         let filtered = {
          'name': item.nombre,
          'idCard': item.cedula,
          'type':item.tipo,
          'date': new Date(item.fecha),
        };
       return filtered;
     })
       })
    ).subscribe((data: Array<any>) => {
      this.dataSource = new MatTableDataSource(data.reverse());
      this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       this.isLoadingResults = false;
      this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
       return data.name.trim().toLowerCase().indexOf(filter) != -1 || data.idCard.trim().toLowerCase().indexOf(filter) != -1 || data.type.trim().toLowerCase().indexOf(filter) != -1 ||this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm', 'UTC')?.indexOf(filter) != -1;
     }
    });*/
    let newData= this.data.map((item: any) => {
      let filtered = {
       'name': item.nombre,
       'idCard': item.cedula,
       'type':item.tipo,
       'date': new Date(item.fecha),
     };
    return filtered;
  })
  this.infoData=newData.reverse();
  this.dataSource = new MatTableDataSource(newData.reverse());
  this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   this.isLoadingResults = false;
  this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
   return data.name.trim().toLowerCase().indexOf(filter) != -1 || data.idCard.trim().toLowerCase().indexOf(filter) != -1 || data.type.trim().toLowerCase().indexOf(filter) != -1 ||this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm', 'UTC')?.indexOf(filter) != -1;
  }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirect(){
    this.loc.back();
  }

  async filterData(value?:any,type?:string){

    if(value != null && type != null){
      this.filterKeys[type] = value;
    }

    if(this.formFilterHistory.get('startDate')?.value === null && this.formFilterHistory.get('endDate')?.value === null ){
      this.dataSource = new MatTableDataSource(await this.searchFilter.transform(this.infoData,this.filterKeys));
    }else if(this.formFilterHistory.get('startDate')?.value != null && this.formFilterHistory.get('endDate')?.value === null){
      await this.filterDateStart({value:this.formFilterHistory.get('startDate')?.value});
      this.dataSource= new MatTableDataSource(await this.searchFilter.transform(this.dataSource.data,this.filterKeys));
    }else if(this.formFilterHistory.get('startDate')?.value != null && this.formFilterHistory.get('endDate')?.value != null){
      await this.filterDateEnd({value:this.formFilterHistory.get('endDate')?.value});
      this.dataSource= new MatTableDataSource(await this.searchFilter.transform(this.dataSource.data,this.filterKeys));
    }
  }

  async filterDateStart(event:any,type:any=null){
    this.minDate=new Date(event.value);
    this.dataSource=new MatTableDataSource(await this.onSelectStartDate(event));
    // this.filterData();
  }

  async filterDateEnd(event:any,type:any=null){
    this.dataSource=new MatTableDataSource(await this.onSelectEndDate(event));
  }

  onSelectStartDate(event: any) {
    const startDate = moment(event.value).format('YYYY-MM-DD');
    const endDate =
      this.formFilterHistory.value.endDate === null
        ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        : moment(this.formFilterHistory.value.endDate).add('hour',23).add('minutes',59).add('seconds',59).format('YYYY-MM-DD HH:mm:ss');
    // if(this.filterKeys !== {}){
    //   return this.dataSource.data.filter(
    //     (item: any) =>
    //       moment(item.fecha).isSameOrAfter(startDate) &&
    //       moment(item.fecha).isSameOrBefore(endDate)
    //   );
    // }else{
      return this.infoData.filter(
        (item: any) =>
          moment(item.date).isSameOrAfter(startDate) &&
          moment(item.date).isSameOrBefore(endDate)
      );
    // }
  }

  onSelectEndDate(event: any) {
    const endDate = moment(event.value).add('hour',23).add('minutes',59).add('seconds',59).format('YYYY-MM-DD HH:mm:ss');
    const startDate = moment(this.formFilterHistory.value.startDate).format('YYYY-MM-DD HH:mm:ss');
    return this.infoData.filter(
      (item: any) =>
        moment(item.date).isSameOrAfter(startDate) &&
        moment(item.date).isSameOrBefore(endDate)
    );
  }

  nameFile():string{
    const date = new Date();
    const format = {
      dd: date.getDate(),
      mm: date.getMonth() + 1,
      yyyy: date.getFullYear()
    }
    return (`Kits ${format.dd}-${format.mm}-${format.yyyy}`)
  }


}
