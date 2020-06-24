export interface MovementsModels {
  _id: string;
  idMicrositio: string;
  idTipo: string;
  fecha: string;
  cedula: string;
  user_info: UserDataModels;
}

export interface UserDataModels {
  _id: string;
  cedula: string;
  nombre: string;
  compania: string;
  area: string;
  correo: string;
}


