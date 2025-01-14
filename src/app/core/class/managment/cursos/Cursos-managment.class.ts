import { ActivosState } from "src/app/shared/enums";

export class CursoManagment {
  id: string;
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  fechaInicio: string;
  fechaFinalizacion: string;
  cantidadAlumnos: string;
  precio: string;
  profesor: string;
  estado: ActivosState;
  imagen: string;
  video: string;
  duracion: string;
  categoria: string;
  idioma: string;

  constructor(cursoManagment: Partial<CursoManagment> = {}) {
    this.id = cursoManagment.id || '';
    this.nombre = cursoManagment.nombre || '';
    this.descripcion = cursoManagment.descripcion || '';
    this.fechaCreacion = cursoManagment.fechaCreacion || '';
    this.fechaInicio = cursoManagment.fechaInicio || '';
    this.fechaFinalizacion = cursoManagment.fechaFinalizacion || '';
    this.cantidadAlumnos = cursoManagment.cantidadAlumnos || '';
    this.precio = cursoManagment.precio || '';
    this.profesor = cursoManagment.profesor || '';
    this.estado = cursoManagment.estado || ActivosState.ACTIVO;
    this.imagen = cursoManagment.imagen || '';
    this.video = cursoManagment.video || '';
    this.duracion = cursoManagment.duracion || '';
    this.categoria = cursoManagment.categoria || '';
    this.idioma = cursoManagment.idioma || '';
  }

  static fromJson(cursoManagment: any): CursoManagment {
    return new CursoManagment({
      id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      fechaCreacion: cursoManagment.fechaCreacion,
      fechaInicio: cursoManagment.fechaInicio,
      fechaFinalizacion: cursoManagment.fechaFinalizacion,
      cantidadAlumnos: cursoManagment.cantidadAlumnos,
      precio: cursoManagment.precio,
      profesor: cursoManagment.profesor,
      estado: cursoManagment.estado,
      imagen: cursoManagment.imagen,
      video: cursoManagment.video,
      duracion: cursoManagment.duracion,
      categoria: cursoManagment.categoria,
      idioma: cursoManagment.idioma,
    });
  }

  static toJson(cursoManagment: CursoManagment): any {
    return {
      id: cursoManagment.id,
      nombre: cursoManagment.nombre,
      descripcion: cursoManagment.descripcion,
      fechaCreacion: cursoManagment.fechaCreacion,
      fechaInicio: cursoManagment.fechaInicio,
      fechaFinalizacion: cursoManagment.fechaFinalizacion,
      cantidadAlumnos: cursoManagment.cantidadAlumnos,
      precio: cursoManagment.precio,
      profesor: cursoManagment.profesor,
      estado: cursoManagment.estado,
      imagen: cursoManagment.imagen,
      video: cursoManagment.video,
      duracion: cursoManagment.duracion,
      categoria: cursoManagment.categoria,
      idioma: cursoManagment.idioma,
    };
  }
}
