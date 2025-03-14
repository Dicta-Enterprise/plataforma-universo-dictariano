import { NewActivoState } from 'src/app/shared/enums';

export class GalaxiaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: NewActivoState;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(galaxiaManagment: Partial<GalaxiaManagment> = {}) {
    this.id = galaxiaManagment.id ?? '';
    this.nombre = galaxiaManagment.nombre ?? '';
    this.descripcion = galaxiaManagment.descripcion ?? '';
    this.imagen = galaxiaManagment.imagen ?? '';
    this.estado = galaxiaManagment.estado ?? NewActivoState.ACTIVO;
    this.fechaCreacion = galaxiaManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = galaxiaManagment.fechaActualizacion ?? new Date();
  }

  static fromJson(galaxiaManagment: any): GalaxiaManagment {
    return new GalaxiaManagment({
      id: galaxiaManagment.id,
      nombre: galaxiaManagment.nombre,
      descripcion: galaxiaManagment.descripcion,
      imagen: galaxiaManagment.imagen,
      estado: galaxiaManagment.estado,
      fechaCreacion: galaxiaManagment.fechaCreacion,
      fechaActualizacion: galaxiaManagment.fechaActualizacion,
    });
  }

  static toJson(galaxiaManagment: GalaxiaManagment): any {
    return {
      //id: galaxiaManagment.id,
      nombre: galaxiaManagment.nombre,
      descripcion: galaxiaManagment.descripcion,
      imagen: galaxiaManagment.imagen,
      estado: galaxiaManagment.estado,
      fechaCreacion: galaxiaManagment.fechaCreacion,
      fechaActualizacion: galaxiaManagment.fechaActualizacion,
    };
  }
}
