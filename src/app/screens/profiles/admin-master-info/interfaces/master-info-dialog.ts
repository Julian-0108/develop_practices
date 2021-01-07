import { Master } from '@shared/interfaces/master.interface';
/**
 * @autor Santiago Patiño M
 * @description Interfaz para los datos de entrada del dialogo de master info
 */
export interface MasterInfoDialog {
  element: Master;
  title: string;
  url: string;
}
