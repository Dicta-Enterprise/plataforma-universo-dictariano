import { ActivosState } from 'src/app/shared/enums';

export class CategoriaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  estado: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(categoriaManagment: Partial<CategoriaManagment> = {}) {
    this.id = categoriaManagment.id ?? '';
    this.nombre = categoriaManagment.nombre ?? '';
    this.descripcion = categoriaManagment.descripcion ?? '';
    this.imagenUrl = categoriaManagment.imagenUrl ?? 'assets/loaders/bottle-loader.gif';
    this.estado = categoriaManagment.estado ?? true;
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
      estado: categoriaManagment.estado ,
      fechaCreacion: categoriaManagment.fechaCreacion,
      fechaActualizacion: categoriaManagment.fechaActualizacion,
    });
  }

  static toJson(categoriaManagment: CategoriaManagment): any {
    return {
      //id: categoriaManagment.id,
      nombre: categoriaManagment.nombre,
      descripcion: categoriaManagment.descripcion,
      estado: categoriaManagment.estado,
      fechaCreacion: categoriaManagment.fechaCreacion,
      fechaActualizacion: categoriaManagment.fechaActualizacion,
    };
  }

}
