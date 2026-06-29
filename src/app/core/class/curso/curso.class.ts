
export type Categoria = 'todos' | 'ninos' | 'jovenes' | 'padres';

class Beneficios {
  titulo: string;
  descripcion: string;

  constructor(titulo: string, descripcion: string) {
    this.titulo = titulo;
    this.descripcion = descripcion;
  }
}

export class Curso {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public categoria: string;
  public beneficios: Beneficios[];
  public imagen: string;
  public precio: number;
  public categoriaId?: string;
  public rating: number;

  constructor(item: Partial<Curso> = {}) {
    this.id = item.id ?? 0;
    this.nombre = item.nombre ?? '';
    this.descripcion = item.descripcion ?? '';
    this.categoria = item.categoria ?? 'todos';
    this.beneficios = item.beneficios ?? [];
    this.imagen = item.imagen ?? '';
    this.precio = item.precio ?? 99;
    this.categoriaId = item.categoriaId ?? '';
    this.rating = item.rating ?? 0;
  }

  static fromJson(o: unknown): Curso {
    const casted = o as Record<string, unknown>;
    return new Curso({
      id: casted['id'] as number,
      nombre: casted['nombre'] as string,
      descripcion: casted['descripcion'] as string,
      categoria: casted['categoria'] as string,
      beneficios: casted['beneficios'] as Beneficios[],
      imagen: casted['imagen'] as string,
      categoriaId: casted['categoriaId'] as string,
      rating: (casted['rating'] as number) ?? 0,
    });
  }
}


