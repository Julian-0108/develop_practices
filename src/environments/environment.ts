// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //API_MASTER_INFO: 'http://192.168.27.27:6083/api/v1/masterinfo',
  API_MASTER_INFO : 'http://localhost:80',
  //API_BASE_PROFILES : 'http://192.168.27.27:6083/api/v1/baseprofiles',
  API_BASE_PROFILES: 'http://localhost:81',
  API_SECURITY: 'http://192.168.27.27:6083/api/v1/security'
};

export const API_URL = 'https://sitios.setiaws.com';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
