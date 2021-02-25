/**
 * @autor Santiago Patiño M
 * @description Interfaz para los maestros - Utilizanla misma estructura
 */
export interface Master {
  _id?: string;
  name: string;
  description: number;
  type?: string;
  status: boolean;
  url?: string;
  imagePath?: string;
  createdAt?: string;
  updatedAt?: string;
}
