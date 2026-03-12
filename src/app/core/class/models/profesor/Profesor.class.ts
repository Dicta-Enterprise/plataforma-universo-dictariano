import { NewActivoState } from 'src/app/shared/enums';

export class Profesor {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  estado: NewActivoState;
  imagen: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaNacimiento: Date;

  constructor(profesor: Partial<Profesor> = {}) {
    this.id = profesor.id ?? '';
    this.nombre = profesor.nombre ?? '';
    this.apellido = profesor.apellido ?? '';
    this.email = profesor.email ?? '';
    this.telefono = profesor.telefono ?? '';
    this.direccion = profesor.direccion ?? '';
    this.estado = profesor.estado ?? NewActivoState.ACTIVO;
    this.imagen = profesor.imagen ?? '';
    this.fechaCreacion = profesor.fechaCreacion ?? new Date();
    this.fechaActualizacion = profesor.fechaActualizacion ?? new Date();
    this.fechaNacimiento = profesor.fechaNacimiento || new Date();
  }

  static fromJson(profesor: unknown): Profesor {
    const casted = profesor as Record<string, unknown>;
    return new Profesor({
      id: casted["id"] as string,
      nombre: casted["nombre"] as string,
      apellido: casted["apellido"] as string,
      email: casted["email"] as string,
      telefono: casted["telefono"] as string,
      direccion: casted["direccion"] as string,
      estado: casted["estado"] as NewActivoState,
      imagen: casted["imagen"] as string,
      fechaCreacion: new Date(casted["fechaCreacion"] as string),
      fechaActualizacion: new Date(casted["fechaActualizacion"] as string),
      fechaNacimiento: new Date(casted["fechaNacimiento"] as string),
    });
  }

  static toJson(profesor: Profesor): unknown {
    return {
      //id: profesor.id,
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      email: profesor.email,
      telefono: profesor.telefono,
      direccion: profesor.direccion,
      estado: profesor.estado,
      imagen: profesor.imagen,
      //fechaCreacion: profesor.fechaCreacion,
      //fechaActualizacion: profesor.fechaActualizacion,
      fechaNacimiento: profesor.fechaNacimiento,
    };
  }
}
