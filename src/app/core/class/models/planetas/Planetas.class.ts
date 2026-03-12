import { NewActivoState } from "src/app/shared/enums";

export class Planetas {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: NewActivoState;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  galaxiaId: string;

  constructor(planetas: Partial<Planetas> = {}) {
    this.id = planetas.id ?? '';
    this.nombre = planetas.nombre ?? '';
    this.descripcion = planetas.descripcion ?? '';
    this.imagen = planetas.imagen ?? '';
    this.estado = planetas.estado ?? NewActivoState.ACTIVO;
    this.fechaCreacion = planetas.fechaCreacion ?? new Date();
    this.fechaActualizacion = planetas.fechaActualizacion ?? new Date();
    this.galaxiaId = planetas.galaxiaId ?? '';
  }

  static fromJson(planetas: unknown): Planetas {
    const casted = planetas as Record<string, unknown>;
    return new Planetas({
      id: casted['id'] as string,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string,
      imagen: casted['imagen'] as string,
      estado: casted['estado'] as NewActivoState,
      fechaCreacion: new Date(casted['fechaCreacion'] as string),
      fechaActualizacion: new Date(casted['fechaActualizacion'] as string),
      galaxiaId: casted['galaxiaId'] as string,
    });
  }

  static toJson(planetas: Planetas): unknown {
    return {
      //id: planetas.id,
      nombre: planetas.nombre,
      descripcion: planetas.descripcion,
      imagen: planetas.imagen,
      estado: planetas.estado,
      fechaCreacion: planetas.fechaCreacion,
      fechaActualizacion: planetas.fechaActualizacion,
      galaxiaId: planetas.galaxiaId,
    };
  }
}
