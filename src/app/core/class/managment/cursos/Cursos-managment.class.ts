import { NewActivoState } from 'src/app/shared/enums';
import { Beneficios } from '../../curso/beneficio.class';

export class CursoManagment {
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

  constructor(cursoManagment: Partial<CursoManagment> = {}) {
    this.id = cursoManagment.id ?? 0;
    this.nombre = cursoManagment.nombre ?? '';
    this.descripcion = cursoManagment.descripcion ?? '';
    this.fechaCreacion = cursoManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = cursoManagment.fechaActualizacion ?? new Date();
    this.fechaInicio = cursoManagment.fechaInicio ?? new Date();
    this.fechaFinalizacion = cursoManagment.fechaFinalizacion ?? new Date();
    this.cantidadAlumnos = cursoManagment.cantidadAlumnos ?? '';
    this.precio = cursoManagment.precio ?? 0.0;
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

  static fromJson(cursoManagment: unknown): CursoManagment {
    const casted = cursoManagment as Record<string, unknown>;
    return new CursoManagment({
      id: casted['id'] as number,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string,
      fechaCreacion: casted['fechaCreacion'] as Date,
      fechaActualizacion: casted['fechaActualizacion'] as Date,
      fechaInicio: casted['fechaInicio'] as Date,
      fechaFinalizacion: casted['fechaFinalizacion'] as Date,
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
      categoria: cursoManagment.categoria,
      idiomaId: cursoManagment.idiomaId,
      planetaId: cursoManagment.planetaId,
      beneficios: cursoManagment.beneficios,
    };
  }
}
