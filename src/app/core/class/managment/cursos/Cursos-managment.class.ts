import { NewActivoState } from 'src/app/shared/enums';

export interface CursoManagmentData {
  id?: string;
  nombre: string;
  descripcion: string;
  // Las fechas a menudo vienen como cadenas (string) en el JSON
  fechaCreacion?: Date | string; 
  fechaActualizacion?: Date | string;
  fechaInicio: Date | string;
  fechaFinalizacion: Date | string;
  cantidadAlumnos: string;
  precio: string;
  estado: NewActivoState | string; // Podría venir como string o como el enum
  imagen: string;
  video: string;
  duracion: string;
  categoriaId: string;
  categoria: string;
  profesorId: string;
  idiomaId: string; 
  planetaId: string; 
  beneficios: { titulo: string, descripcion: string }[]; // El JSON usará objetos planos, no instancias de la clase Beneficios
}

class Beneficios {
  titulo: string;
  descripcion: string;

  constructor(titulo:string, descripcion:string){
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}

export class CursoManagment {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaInicio: Date;
  fechaFinalizacion: Date;
  cantidadAlumnos: string;
  precio: string;
  estado: string;
  imagen: string;
  video: string;
  duracion: string;
  categoriaId: string;
  categoria: string;
  profesorId: string;
  idiomaId: string; 
  planetaId: string; 
  beneficios: Beneficios[];

  constructor(cursoManagment: Partial<CursoManagment> = {}) {
    this.id = cursoManagment.id ?? '';
    this.nombre = cursoManagment.nombre ?? '';
    this.descripcion = cursoManagment.descripcion ?? '';
    this.fechaCreacion = cursoManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = cursoManagment.fechaActualizacion ?? new Date();
    this.fechaInicio = cursoManagment.fechaInicio ?? new Date();
    this.fechaFinalizacion = cursoManagment.fechaFinalizacion ?? new Date();
    this.cantidadAlumnos = cursoManagment.cantidadAlumnos ?? '';
    this.precio = cursoManagment.precio ?? '';
    this.profesorId = cursoManagment.profesorId ?? '';
    this.estado = cursoManagment.estado ?? NewActivoState.ACTIVO;
    this.imagen = cursoManagment.imagen ?? '';
    this.video = cursoManagment.video ?? '';
    this.duracion = cursoManagment.duracion ?? '';
    this.categoriaId = cursoManagment.categoriaId ?? '';
    this.idiomaId = cursoManagment.idiomaId ?? '';
    this.planetaId = cursoManagment.planetaId ?? '';
    this.beneficios = cursoManagment.beneficios ?? [new Beneficios('','')];
  }

  static fromJson(cursoManagment: CursoManagmentData): CursoManagment {
    return new CursoManagment({
      id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      fechaCreacion: cursoManagment.fechaCreacion as Date,
      fechaActualizacion: cursoManagment.fechaActualizacion as Date,
      fechaInicio: new Date(cursoManagment.fechaInicio),
      fechaFinalizacion: new Date(cursoManagment.fechaFinalizacion),
      cantidadAlumnos: cursoManagment.cantidadAlumnos,
      precio: cursoManagment.precio,
      profesorId: cursoManagment.profesorId,
      estado: cursoManagment.estado,
      imagen: cursoManagment.imagen,
      video: cursoManagment.video,
      duracion: cursoManagment.duracion,
      categoriaId: cursoManagment.categoriaId,
      idiomaId: cursoManagment.idiomaId,
      planetaId: cursoManagment.planetaId,
      beneficios: cursoManagment.beneficios,
    });
  }

  static toJson(cursoManagment: CursoManagment): CursoManagmentData {
    return {
      //id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      //fechaCreacion: cursoManagment.fechaCreacion,
      //fechaActualizacion: cursoManagment.fechaActualizacion,
      fechaInicio: cursoManagment.fechaInicio,
      fechaFinalizacion: cursoManagment.fechaFinalizacion,
      cantidadAlumnos: cursoManagment.cantidadAlumnos,
      precio: cursoManagment.precio,
      profesorId: cursoManagment.profesorId,
      estado: cursoManagment.estado,
      imagen: cursoManagment.imagen,
      video: cursoManagment.video,
      duracion: cursoManagment.duracion,
      categoriaId: cursoManagment.categoriaId,
      categoria: cursoManagment.categoria,
      idiomaId: cursoManagment.idiomaId,
      planetaId: cursoManagment.planetaId,
      beneficios: cursoManagment.beneficios,
    };
  }
}
