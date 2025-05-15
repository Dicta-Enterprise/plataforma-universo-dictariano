import { NewActivoState } from 'src/app/shared/enums';
import { ItemImagen } from 'src/app/core/interfaces/genericas/IItemImagen.interface';
import { CategoriaManagment } from '../managment';

export class GalaxiaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  estado: NewActivoState;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  categorias: CategoriaManagment[];
  itemImagen: ItemImagen[];

  constructor(galaxiaManagment: Partial<GalaxiaManagment> = {}) {
    this.id = galaxiaManagment.id ?? '';
    this.nombre = galaxiaManagment.nombre ?? '';
    this.descripcion = galaxiaManagment.descripcion ?? '';
    this.estado = galaxiaManagment.estado ?? NewActivoState.ACTIVO;
    this.fechaCreacion = galaxiaManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = galaxiaManagment.fechaActualizacion ?? new Date();
    this.categorias = galaxiaManagment.categorias ?? [];
    this.itemImagen = galaxiaManagment.itemImagen ?? [];
  }

  static fromJson(galaxiaManagment: any): GalaxiaManagment {
    return new GalaxiaManagment({
      id: galaxiaManagment.id,
      nombre: galaxiaManagment.nombre,
      descripcion: galaxiaManagment.descripcion,
      estado: galaxiaManagment.estado,
      fechaCreacion: galaxiaManagment.fechaCreacion,
      fechaActualizacion: galaxiaManagment.fechaActualizacion,
      categorias: galaxiaManagment.categorias.map((item: any) =>
        CategoriaManagment.fromJson(item)
      ),
      // itemImagen: galaxiaManagment.itemImagen.map((item: any) =>
      //   ItemImagen.fromJson(item)
      // ),
    });
  }

  static toJson(galaxiaManagment: GalaxiaManagment): any {
    return {
      //id: galaxiaManagment.id,
      nombre: galaxiaManagment.nombre,
      descripcion: galaxiaManagment.descripcion,
      estado: galaxiaManagment.estado,
      fechaCreacion: galaxiaManagment.fechaCreacion,
      fechaActualizacion: galaxiaManagment.fechaActualizacion,
      categorias: galaxiaManagment.categorias.map((item) =>
        CategoriaManagment.toJson(item)
      ),
      itemImagen: galaxiaManagment.itemImagen.map((item) =>
        ItemImagen.toJson(item)
      ),
    };
  }
}
