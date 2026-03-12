import { NewActivoState } from 'src/app/shared/enums';
import { Beneficios } from '../../curso/beneficio.class';

export class Cursos {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaInicio: Date;
  fechaFinalizacion: Date;
  cantidadAlumnos: string;
  precio: number;
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

  constructor(cursos: Partial<Cursos> = {}) {
    this.id = cursos.id ?? 0;
    this.nombre = cursos.nombre ?? '';
    this.descripcion = cursos.descripcion ?? '';
    this.fechaCreacion = cursos.fechaCreacion ?? new Date();
    this.fechaActualizacion = cursos.fechaActualizacion ?? new Date();
    this.fechaInicio = cursos.fechaInicio ?? new Date();
    this.fechaFinalizacion = cursos.fechaFinalizacion ?? new Date();
    this.cantidadAlumnos = cursos.cantidadAlumnos ?? '';
    this.precio = cursos.precio ?? 0.0;
    this.profesorId = cursos.profesorId ?? '';
    this.estado = cursos.estado ?? NewActivoState.ACTIVO;
    this.imagen = cursos.imagen ?? '';
    this.video = cursos.video ?? '';
    this.duracion = cursos.duracion ?? '';
    this.categoriaId = cursos.categoriaId ?? '';
    this.idiomaId = cursos.idiomaId ?? '';
    this.planetaId = cursos.planetaId ?? '';
    this.beneficios = cursos.beneficios ?? [new Beneficios('','')];
  }

  static fromJson(cursos: unknown): Cursos {
    const casted = cursos as Record<string, unknown>;
    return new Cursos({
      id: casted['id'] as number,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string,
      fechaCreacion: new Date (casted['fechaCreacion'] as string),
      fechaActualizacion: new Date(casted['fechaActualizacion'] as string),
      fechaInicio: new Date(casted['fechaInicio'] as string),
      fechaFinalizacion: new Date(casted['fechaFinalizacion'] as string),
      cantidadAlumnos: casted['cantidadAlumnos'] as string,
      precio:  casted['precio'] as number,
      profesorId: casted['profesorId'] as string,
      estado: casted['estado'] as string,
      imagen: casted['imagen'] as string,
      video: casted['video'] as string,
      duracion: casted['duracion'] as string,
      categoriaId: casted['categoriaId'] as string,
      idiomaId: casted['idiomaId'] as string,
      planetaId: casted['planetaId'] as string,
      beneficios: casted['beneficios'] as Beneficios[],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toJson(cursos: Cursos): unknown {
    return {
      //id: cursoManagment.id,
      nombre: cursos.nombre,
      descripcion: cursos.descripcion,
      //fechaCreacion: cursoManagment.fechaCreacion,
      //fechaActualizacion: cursoManagment.fechaActualizacion,
      fechaInicio: cursos.fechaInicio,
      fechaFinalizacion: cursos.fechaFinalizacion,
      cantidadAlumnos: cursos.cantidadAlumnos,
      precio: cursos.precio,
      profesorId: cursos.profesorId,
      estado: cursos.estado,
      imagen: cursos.imagen,
      video: cursos.video,
      duracion: cursos.duracion,
      categoriaId: cursos.categoriaId,
      categoria: cursos.categoria,
      idiomaId: cursos.idiomaId,
      planetaId: cursos.planetaId,
      beneficios: cursos.beneficios,
    };
  }
}
