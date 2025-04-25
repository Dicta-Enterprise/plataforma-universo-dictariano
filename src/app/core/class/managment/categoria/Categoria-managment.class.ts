import { ActivosState } from 'src/app/shared/enums';

export class CategoriaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  estado: ActivosState;
  imagen: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(categoriaManagment: Partial<CategoriaManagment> = {}) {
    this.id = categoriaManagment.id ?? '';
    this.nombre = categoriaManagment.nombre ?? '';
    this.descripcion = categoriaManagment.descripcion ?? '';
    this.imagenUrl = categoriaManagment.imagenUrl ?? '';
    this.estado = categoriaManagment.estado ?? ActivosState.ACTIVO;
    this.imagen = categoriaManagment.imagen ?? '';
    this.fechaCreacion = categoriaManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion =
      categoriaManagment.fechaActualizacion ?? new Date();
  }

  static fromJson(categoriaManagment: any): CategoriaManagment {
    return new CategoriaManagment({
      id: categoriaManagment.id,
      nombre: categoriaManagment.nombre,
      descripcion: categoriaManagment.descripcion,
      imagenUrl: categoriaManagment.imagenUrl,
      estado: categoriaManagment.estado,
      imagen: categoriaManagment.imagen,
      fechaCreacion: categoriaManagment.fechaCreacion,
      fechaActualizacion: categoriaManagment.fechaActualizacion,
    });
  }

  static toJson(categoriaManagment: CategoriaManagment): any {
    return {
      //id: categoriaManagment.id,
      nombre: categoriaManagment.nombre,
      descripcion: categoriaManagment.descripcion,
      estado: 'ACTIVO',
      // imagen: categoriaManagment.imagen,
      fechaCreacion: categoriaManagment.fechaCreacion,
      fechaActualizacion: categoriaManagment.fechaActualizacion,
    };
  }

}
