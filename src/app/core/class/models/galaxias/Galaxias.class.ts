import { NewActivoState } from 'src/app/shared/enums';
import { ItemImagen } from 'src/app/core/interfaces/genericas/IItemImagen.interface';
import { Categoria } from '../categoria/Categoria.class';

export class Galaxias {
  id: string;
  nombre: string;
  descripcion: string;
  estado: NewActivoState;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  categorias: Categoria[];
  itemImagen: ItemImagen[];

  constructor(galaxias: Partial<Galaxias> = {}) {
    this.id = galaxias.id ?? '';
    this.nombre = galaxias.nombre ?? '';
    this.descripcion = galaxias.descripcion ?? '';
    this.estado = galaxias.estado ?? NewActivoState.ACTIVO;
    this.fechaCreacion = galaxias.fechaCreacion ?? new Date();
    this.fechaActualizacion = galaxias.fechaActualizacion ?? new Date();
    this.categorias = galaxias.categorias ?? [];
    this.itemImagen = galaxias.itemImagen ?? [];
  }

  static fromJson(galaxias: unknown): Galaxias {
    const casted = galaxias as Record<string, unknown>;
    return new Galaxias({
      id: casted['id'] as string,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string,
      estado: casted['estado'] as NewActivoState,
      fechaCreacion: new Date(casted['fechaCreacion'] as string),
      fechaActualizacion: new Date(casted['fechaActualizacion'] as string),
      categorias: (casted['categorias'] as unknown[] ?? []).map((item) =>
      Categoria.fromJson(item)
    ),
      // itemImagen: galaxiaManagment.itemImagen.map((item: any) =>
      //   ItemImagen.fromJson(item)
      // ),
    });
  }

  static toJson(galaxias: Galaxias): unknown {
    return {
      //id: galaxiaManagment.id,
      nombre: galaxias.nombre,
      descripcion: galaxias.descripcion,
      estado: galaxias.estado,
      fechaCreacion: galaxias.fechaCreacion,
      fechaActualizacion: galaxias.fechaActualizacion,
      categorias: galaxias.categorias.map((item) =>
        Categoria.toJson(item)
      ),
      itemImagen: galaxias.itemImagen.map((item) =>
        ItemImagen.toJson(item)
      ),
    };
  }
}
