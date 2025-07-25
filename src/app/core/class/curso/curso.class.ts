export type Categoria = 'todos' | 'ninos' | 'jovenes' | 'padres';

export class Curso {
  public id: number;
  public nombre: string;
  public descripcion: string;
  public categoria: Categoria;
  public beneficios: string[];
  public imagen: string;

  constructor(item: Partial<Curso> = {}) {
    this.id          = item.id           ?? 0;
    this.nombre      = item.nombre       ?? '';
    this.descripcion = item.descripcion  ?? '';
    this.categoria   = item.categoria    ?? 'todos';
    this.beneficios  = item.beneficios   ?? [];
    this.imagen      = item.imagen       ?? '';
  }

  static fromJson(o: any): Curso {
    return new Curso({
      id:          o.id,
      nombre:      o.nombre,
      descripcion: o.descripcion,
      categoria:   o.categoria,
      beneficios:  o.beneficios,
      imagen:      o.imagen
    });
  }
}


