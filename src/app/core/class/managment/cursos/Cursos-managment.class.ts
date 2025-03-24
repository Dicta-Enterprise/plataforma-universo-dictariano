import { ActivosState, NewActivoState } from "src/app/shared/enums";
import { CategoriaManagment, ProfesorManagment } from "../managment";

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
  estado: NewActivoState;
  imagen: string;
  video: string;
  duracion: string;
  categoriaId: string;
  profesorId: string;
  idiomaId: string; 
  planetaId: string; 

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
  }

  static fromJson(cursoManagment: any): CursoManagment {
    return new CursoManagment({
      id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      fechaCreacion: cursoManagment.fechaCreacion,
      fechaActualizacion: cursoManagment.fechaActualizacion,
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
    });
  }

  static toJson(cursoManagment: CursoManagment): any {
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
      idiomaId: cursoManagment.idiomaId,
      planetaId: cursoManagment.planetaId,
    };
  }
}
