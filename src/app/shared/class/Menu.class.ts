import { Item } from './Item.class';

export class Menu {
  id: number;
  idPadre: number;
  items: Item[];
  icono: string;
  nombre: string;

  constructor(menu: Partial<Menu> = {}) {
    this.id = menu.id || 0;
    this.idPadre = menu.idPadre || 0;
    this.items = menu.items || [];
    this.icono = menu.icono || '';
    this.nombre = menu.nombre || '';
  }

  static fromJson(menuJson: any): Menu {
    return new Menu({
      id: menuJson.id,
      idPadre: menuJson.idPadre,
      items: menuJson.items.map((item: any) => Item.fromJson(item)),
      icono: menuJson.icono,
      nombre: menuJson.nombre,
    });
  }

  static toJson(menu: Menu): any {
    return {
      id: menu.id,
      idPadre: menu.idPadre,
      items: menu.items.map((item: Item) => Item.toJson(item)),
      icono: menu.icono,
      nombre: menu.nombre,
    };
  }
}
