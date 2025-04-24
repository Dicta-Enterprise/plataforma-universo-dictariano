import { NewActivoState } from 'src/app/shared/enums';

export class ProfesorManagment {
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

  constructor(profesorManagment: Partial<ProfesorManagment> = {}) {
    this.id = profesorManagment.id ?? '';
    this.nombre = profesorManagment.nombre ?? '';
    this.apellido = profesorManagment.apellido ?? '';
    this.email = profesorManagment.email ?? '';
    this.telefono = profesorManagment.telefono ?? '';
    this.direccion = profesorManagment.direccion ?? '';
    this.estado = profesorManagment.estado ?? NewActivoState.ACTIVO;
    this.imagen = profesorManagment.imagen ?? '';
    this.fechaCreacion = profesorManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = profesorManagment.fechaActualizacion ?? new Date();
    this.fechaNacimiento = profesorManagment.fechaNacimiento || new Date();
  }

  static fromJson(profesorManagment: any): ProfesorManagment {
    return new ProfesorManagment({
      id: profesorManagment.id,
      nombre: profesorManagment.nombre,
      apellido: profesorManagment.apellido,
      email: profesorManagment.email,
      telefono: profesorManagment.telefono,
      direccion: profesorManagment.direccion,
      estado: profesorManagment.estado,
      imagen: profesorManagment.imagen,
      fechaCreacion: profesorManagment.fechaCreacion,
      fechaActualizacion: profesorManagment.fechaActualizacion,
      fechaNacimiento: new Date(profesorManagment.fechaNacimiento),
    });
  }

  static toJson(profesorManagment: ProfesorManagment): any {
    return {
      //id: profesorManagment.id,
      nombre: profesorManagment.nombre,
      apellido: profesorManagment.apellido,
      email: profesorManagment.email,
      telefono: profesorManagment.telefono,
      direccion: profesorManagment.direccion,
      estado: profesorManagment.estado,
      imagen: profesorManagment.imagen,
      //fechaCreacion: profesorManagment.fechaCreacion,
      //fechaActualizacion: profesorManagment.fechaActualizacion,
      fechaNacimiento: profesorManagment.fechaNacimiento,
    };
  }
}
