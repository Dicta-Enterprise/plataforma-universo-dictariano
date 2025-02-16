import { ActivosState } from "src/app/shared/enums";
import { CategoriaManagment, ProfesorManagment } from "../managment";

export class CursoManagment {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaInicio: string;
  fechaFinalizacion: string;
  cantidadAlumnos: string;
  precio: string;
  estado: ActivosState;
  imagen: string;
  video: string;
  duracion: string;
  categoriaId: string;
  profesorId: string | null;
  idiomaId: string | null; 
  planetaId: string; 

  constructor(cursoManagment: Partial<CursoManagment> = {}) {
    this.id = cursoManagment.id || '';
    this.nombre = cursoManagment.nombre || '';
    this.descripcion = cursoManagment.descripcion || '';
    this.fechaCreacion = cursoManagment.fechaCreacion || '';
    this.fechaActualizacion = cursoManagment.fechaActualizacion || '';
    this.fechaInicio = cursoManagment.fechaInicio || '';
    this.fechaFinalizacion = cursoManagment.fechaFinalizacion || '';
    this.cantidadAlumnos = cursoManagment.cantidadAlumnos || '';
    this.precio = cursoManagment.precio || '';
    this.profesorId = cursoManagment.profesorId || '';
    this.estado = cursoManagment.estado || ActivosState.ACTIVO;
    this.imagen = cursoManagment.imagen || '';
    this.video = cursoManagment.video || '';
    this.duracion = cursoManagment.duracion || '';
    this.categoriaId = cursoManagment.categoriaId || '';
    this.idiomaId = cursoManagment.idiomaId || null;
    this.planetaId = cursoManagment.planetaId || '';
  }

  static fromJson(cursoManagment: any): CursoManagment {
    return new CursoManagment({
      id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      fechaCreacion: cursoManagment.fechaCreacion,
      fechaActualizacion: cursoManagment.fechaActualizacion,
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
      idiomaId: cursoManagment.idiomaId ?? null,
      planetaId: cursoManagment.planetaId,
    });
  }

  static toJson(cursoManagment: CursoManagment): any {
    return {
      id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      fechaCreacion: cursoManagment.fechaCreacion,
      fechaActualizacion: cursoManagment.fechaActualizacion,
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
      idiomaId: cursoManagment.idiomaId ?? null,
      planetaId: cursoManagment.planetaId,
    };
  }
}
