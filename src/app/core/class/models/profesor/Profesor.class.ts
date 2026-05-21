import { NewActivoState } from 'src/app/shared/enums';

export class Profesor {
  id: string;
  nombre: string;
  apellido: string;        
  apellidoMaterno: string; 
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
    this.apellidoMaterno = profesor.apellidoMaterno ?? '';
    this.email = profesor.email ?? '';
    this.telefono = profesor.telefono ?? '';
    this.direccion = profesor.direccion ?? '';
    this.estado = profesor.estado ?? NewActivoState.ACTIVO;
    this.imagen = profesor.imagen ?? '';
    this.fechaCreacion = profesor.fechaCreacion ?? new Date();
    this.fechaActualizacion = profesor.fechaActualizacion ?? new Date();
    this.fechaNacimiento = profesor.fechaNacimiento ?? new Date();
  }

  static fromJson(profesor: unknown): Profesor {
    const c = profesor as Record<string, unknown>;
    return new Profesor({
      id: c['id'] as string,
      nombre: c['nombre'] as string,
      // El backend devuelve apellido_paterno y apellido_materno
      apellido: (c['apellido_paterno'] ?? c['apellido']) as string,
      apellidoMaterno: c['apellido_materno'] as string,
      email: c['email'] as string,
      telefono: c['telefono'] as string,
      direccion: c['direccion'] as string,
      // El backend devuelve estado_p (boolean) en vez de estado (string)
      estado: (c['estado_p'] ?? c['estado']) as NewActivoState,
      imagen: (c['imagen'] ?? '') as string,
      fechaCreacion: c['fechaCreacion'] ? new Date(c['fechaCreacion'] as string) : new Date(),
      fechaActualizacion: c['fechaActualizacion'] ? new Date(c['fechaActualizacion'] as string) : new Date(),
      fechaNacimiento: c['fechaNacimiento'] ? new Date(c['fechaNacimiento'] as string) : new Date(),
    });
  }

  static toJson(profesor: Profesor): unknown {
    return {
      nombre: profesor.nombre,
      apellido_paterno: profesor.apellido,
      apellido_materno: profesor.apellidoMaterno,
      email: profesor.email,
      telefono: profesor.telefono,
      direccion: profesor.direccion,
      estado_p: profesor.estado,
      imagen: profesor.imagen,
      fechaNacimiento: profesor.fechaNacimiento,
    };
  }
}