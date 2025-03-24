import { NewActivoState } from '../../../../shared/enums/activos.enum';

export class IdiomaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  estado: NewActivoState;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(idiomaManagment: Partial<IdiomaManagment> = {}) {
    this.id = idiomaManagment.id ?? '';
    this.nombre = idiomaManagment.nombre ?? '';
    this.descripcion = idiomaManagment.descripcion ?? '';
    this.estado = idiomaManagment.estado ?? NewActivoState.ACTIVO;
    this.fechaCreacion = idiomaManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = idiomaManagment.fechaActualizacion ?? new Date();
  }

  static fromJson(idiomaManagment: any): IdiomaManagment {
    return new IdiomaManagment({
      id: idiomaManagment.id,
      nombre: idiomaManagment.nombre,
      descripcion: idiomaManagment.descripcion,
      estado: idiomaManagment.estado,
      fechaCreacion: idiomaManagment.fechaCreacion,
      fechaActualizacion: idiomaManagment.fechaActualizacion,
    });
  }

  static toJson(idiomaManagment: IdiomaManagment): any {
    return {
      //id: idiomaManagment.id,
      nombre: idiomaManagment.nombre,
      descripcion: idiomaManagment.descripcion,
      estado: idiomaManagment.estado,
      fechaCreacion: idiomaManagment.fechaCreacion,
      fechaActualizacion: idiomaManagment.fechaActualizacion,
    };
  }
}
