import { ActivosState } from 'src/app/shared/enums';

export class IdiomaManagment {
  id: string;
  nombre: string;
  estado: ActivosState;
  imagen: string;
  fechaCreacion: string;
  fechaActualizacion: string;

  constructor(idiomaManagment: Partial<IdiomaManagment> = {}) {
    this.id = idiomaManagment.id || '';
    this.nombre = idiomaManagment.nombre || '';
    this.estado = idiomaManagment.estado || ActivosState.ACTIVO;
    this.imagen = idiomaManagment.imagen || '';
    this.fechaCreacion = idiomaManagment.fechaCreacion || '';
    this.fechaActualizacion = idiomaManagment.fechaActualizacion || '';
  }

  static fromJson(idiomaManagment: any): IdiomaManagment {
    return new IdiomaManagment({
      id: idiomaManagment.id,
      nombre: idiomaManagment.nombre,
      estado: idiomaManagment.estado,
      imagen: idiomaManagment.imagen,
      fechaCreacion: idiomaManagment.fechaCreacion,
      fechaActualizacion: idiomaManagment.fechaActualizacion,
    });
  }

  static toJson(idiomaManagment: IdiomaManagment): any {
    return {
      id: idiomaManagment.id,
      nombre: idiomaManagment.nombre,
      estado: idiomaManagment.estado,
      imagen: idiomaManagment.imagen,
      fechaCreacion: idiomaManagment.fechaCreacion,
      fechaActualizacion: idiomaManagment.fechaActualizacion,
    };
  }
}
