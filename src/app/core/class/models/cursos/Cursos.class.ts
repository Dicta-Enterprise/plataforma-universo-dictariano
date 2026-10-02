export interface BeneficioCurso {
  titulo: string;
  descripcion: string;
}

export interface ImagenesVersion {
  principal: string;
  secundaria: string;
}

export interface CursoImagenes {
  mobile: ImagenesVersion;
  tablet: ImagenesVersion;
  pc: ImagenesVersion;
}

export class Cursos {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  fechaInicio: Date;
  fechaFinal: Date;
  precio: number;
  estado: boolean;
  imagenes: CursoImagenes;
  imagen: string;
  duracionSemanas: number;
  profesorId: string;
  categoriaId: string;
  resumenDescripcion?: string;
  valoracion?: number;
  planetaId?: string;
  profesor?: unknown;
  categoria?: string;
  planeta?: unknown;
  beneficios?: BeneficioCurso[];

  constructor(curso: Partial<Cursos> = {}) {
    this.id = curso.id ?? 0;
    this.nombre = curso.nombre ?? '';
    this.descripcion = curso.descripcion ?? '';
    this.fechaCreacion = curso.fechaCreacion
      ? new Date(curso.fechaCreacion)
      : new Date();
    this.fechaInicio = curso.fechaInicio
      ? new Date(curso.fechaInicio)
      : new Date();
    this.fechaFinal = curso.fechaFinal
      ? new Date(curso.fechaFinal)
      : new Date();
    this.precio = curso.precio ?? 0;
    this.estado = curso.estado ?? true;
    this.duracionSemanas = curso.duracionSemanas ?? 0;
    this.profesorId = curso.profesorId ?? '';
    this.categoriaId = curso.categoriaId ?? '';
    this.resumenDescripcion = curso.resumenDescripcion ?? '';
    this.valoracion = curso.valoracion ?? 0;
    this.planetaId = curso.planetaId ?? '';
    this.profesor = curso.profesor;
    this.categoria = curso.categoria;
    this.planeta = curso.planeta;
    this.beneficios = curso.beneficios ?? [];

    this.imagenes = curso.imagenes ?? {
      mobile: { principal: '', secundaria: '' },
      tablet: { principal: '', secundaria: '' },
      pc: { principal: '', secundaria: '' },
    };

    // Asignación directa de la propiedad imagen
    this.imagen = curso.imagen ?? this.imagenes.pc?.principal ?? '';
  }

  static fromJson(json: unknown): Cursos {
    const casted = (json as Record<string, unknown>) ?? {};
    const rawImagenes = (casted['imagenes'] as CursoImagenes) ?? {};

    const imagenes: CursoImagenes = {
      mobile: {
        principal: rawImagenes.mobile?.principal ?? '',
        secundaria: rawImagenes.mobile?.secundaria ?? '',
      },
      tablet: {
        principal: rawImagenes.tablet?.principal ?? '',
        secundaria: rawImagenes.tablet?.secundaria ?? '',
      },
      pc: {
        principal: rawImagenes.pc?.principal ?? '',
        secundaria: rawImagenes.pc?.secundaria ?? '',
      },
    };

    return new Cursos({
      id: (casted['id'] as number) ?? 0,
      nombre: (casted['nombre'] as string) ?? '',
      descripcion: (casted['descripcion'] as string) ?? '',
      fechaCreacion: casted['fechaCreacion']
        ? new Date(casted['fechaCreacion'] as string)
        : new Date(),
      fechaInicio: casted['fechaInicio']
        ? new Date(casted['fechaInicio'] as string)
        : new Date(),
      fechaFinal: casted['fechaFinal']
        ? new Date(casted['fechaFinal'] as string)
        : new Date(),
      precio: (casted['precio'] as number) ?? 0,
      estado: (casted['estado'] as boolean) ?? true,
      duracionSemanas: (casted['duracionSemanas'] as number) ?? 0,
      profesorId: (casted['profesorId'] as string) ?? '',
      categoriaId: (casted['categoriaId'] as string) ?? '',
      resumenDescripcion: (casted['resumenDescripcion'] as string) ?? '',
      valoracion: (casted['valoracion'] as number) ?? 0,
      planetaId: (casted['planetaId'] as string) ?? '',
      profesor: casted['profesor'],
      categoria: (casted['categoria'] as string) ?? '',
      planeta: casted['planeta'],
      beneficios: Array.isArray(casted['beneficios'])
        ? (casted['beneficios'] as BeneficioCurso[])
        : [],
      imagenes,
      imagen: imagenes.pc.principal,
    });
  }

  static toJson(curso: Cursos): Record<string, unknown> {
    return {
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      fechaCreacion: curso.fechaCreacion?.toISOString(),
      fechaInicio: curso.fechaInicio?.toISOString(),
      fechaFinal: curso.fechaFinal?.toISOString(),
      precio: curso.precio,
      estado: curso.estado,
      imagenes: curso.imagenes,
      duracionSemanas: curso.duracionSemanas,
      profesorId: curso.profesorId,
      categoriaId: curso.categoriaId,
      resumenDescripcion: curso.resumenDescripcion,
      valoracion: curso.valoracion,
      planetaId: curso.planetaId,
      beneficios: curso.beneficios,
    };
  }
}
