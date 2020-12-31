export interface MovementsModels {
  _id: string;
  idMicrositio: string;
  idTipo: string;
  fecha: string;
  cedula: string;
  info_sede: SedeDataModels;
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

export interface SedeDataModels {
  nombre: string
}


