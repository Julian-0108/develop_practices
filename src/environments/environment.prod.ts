export const environment = {
  production: true,
  API_MASTER_INFO:  `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname.slice(0, window.location.pathname.lastIndexOf("ui/"))}masterinfo`,
  API_MEMBERPROFILE:  `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname.slice(0, window.location.pathname.lastIndexOf("ui/"))}memberprofile`,
  API_REQUISITIONS:  `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname.slice(0, window.location.pathname.lastIndexOf("ui/"))}requisitions`,
  API_BASE_PROFILES : `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname.slice(0, window.location.pathname.lastIndexOf("ui/"))}baseprofiles`,
  API_SECURITY: `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname.slice(0, window.location.pathname.lastIndexOf("ui/"))}security-admin`,
  API_SITESAPP: `${window.location.protocol}//${window.location.hostname}:${window.location.port}${window.location.pathname.slice(0, window.location.pathname.lastIndexOf("ui/"))}sitesapp`
};

export const API_URL = 'https://sitios.setiaws.com';
