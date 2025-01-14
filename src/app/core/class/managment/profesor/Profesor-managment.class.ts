import { ActivosState } from 'src/app/shared/enums';

export class ProfesorManagment {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  estado: ActivosState;
  imagen: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaNacimiento: string;

  constructor(profesorManagment: Partial<ProfesorManagment> = {}) {
    this.id = profesorManagment.id || '';
    this.nombre = profesorManagment.nombre || '';
    this.apellido = profesorManagment.apellido || '';
    this.email = profesorManagment.email || '';
    this.telefono = profesorManagment.telefono || '';
    this.direccion = profesorManagment.direccion || '';
    this.estado = profesorManagment.estado || ActivosState.ACTIVO;
    this.imagen = profesorManagment.imagen || '';
    this.fechaCreacion = profesorManagment.fechaCreacion || '';
    this.fechaActualizacion = profesorManagment.fechaActualizacion || '';
    this.fechaNacimiento = profesorManagment.fechaNacimiento || '';
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
      fechaNacimiento: profesorManagment.fechaNacimiento,
    });
  }

  static toJson(profesorManagment: ProfesorManagment): any {
    return {
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
      fechaNacimiento: profesorManagment.fechaNacimiento,
    };
  }
}
