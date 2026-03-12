export class Estandar {
  id: number;
  descripcion: string;
  estado: boolean;

  constructor(standar: Partial<Estandar> = {}) {
    this.id = standar.id || 0;
    this.descripcion = standar.descripcion || '';
    this.estado = standar.estado || true;
  }

  static fromJson(data: unknown): Estandar {
    const casted = data as Record<string, unknown>;
    return new Estandar({
      id: casted['id'] as number,
      descripcion: casted['descripcion'] as string,
      estado: casted['estado'] as boolean,
    });
  }

  static toJson(standar: Estandar): unknown {
    return {
      id: standar.id,
      descripcion: standar.descripcion,
      estado: standar.estado,
    };
  }
}
