import { ActivosState } from 'src/app/shared/enums';

export class GalaxiaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: ActivosState;
  fechaCreacion: string;
  fechaActualizacion: string;

  constructor(galaxiaManagment: Partial<GalaxiaManagment> = {}) {
    this.id = galaxiaManagment.id || '';
    this.nombre = galaxiaManagment.nombre || '';
    this.descripcion = galaxiaManagment.descripcion || '';
    this.imagen = galaxiaManagment.imagen || '';
    this.estado = galaxiaManagment.estado || ActivosState.ACTIVO;
    this.fechaCreacion = galaxiaManagment.fechaCreacion || '';
    this.fechaActualizacion = galaxiaManagment.fechaActualizacion || '';
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
      id: galaxiaManagment.id,
      nombre: galaxiaManagment.nombre,
      descripcion: galaxiaManagment.descripcion,
      imagen: galaxiaManagment.imagen,
      estado: galaxiaManagment.estado,
      fechaCreacion: galaxiaManagment.fechaCreacion,
      fechaActualizacion: galaxiaManagment.fechaActualizacion,
    };
  }
}
