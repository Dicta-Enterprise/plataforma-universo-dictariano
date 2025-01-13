import { IMenuReponsesDto } from '../../interfaces/interfaces';
export interface IMenu {
  idMenu: number;
  idPadre: number;
  items: IItems[];
  nombre: string;
}

export interface IItems {
  padre: IPadre;
  idMenu: number;
  nombre: string;
  ruta?: string;
  idPadre: number;
  icono: string;
  items?: IItems[];
}

export interface IPadre {
  idMenu: number;
  nombre: string;
  idPadre: number;
  ruta?: string; // Hacer opcional si no siempre está presente
  icono?: string; // Agregado en caso de que esté presente en algunos objetos
}
export const MENU_CONSTANT: IMenu[] = [

];
