export class Item {
  id: number;
  nombre: string;
  ruta: string;
  idPadre: number;
  icono: string;
  items: Item[];

  constructor(item: Partial<Item> = {}) {
    this.id = item.id || 0;
    this.nombre = item.nombre || '';
    this.ruta = item.ruta || '';
    this.idPadre = item.idPadre || 0;
    this.icono = item.icono || '';
    this.items = item.items || [];
  }

  static fromJson(itemJson: any): Item {
    return new Item({
      id: itemJson.id,
      nombre: itemJson.nombre,
      ruta: itemJson.ruta,
      idPadre: itemJson.idPadre,
      icono: itemJson.icono,
      items: itemJson.items.map((item: any) => Item.fromJson(item)),
    });
  }

  static toJson(item: Item): any {
    return {
      id: item.id,
      nombre: item.nombre,
      ruta: item.ruta,
      idPadre: item.idPadre,
      icono: item.icono,
      items: item.items.map((item: Item) => Item.toJson(item)),
    };
  }
}
