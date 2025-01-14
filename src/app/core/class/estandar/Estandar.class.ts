export class Estandar {
  id: number;
  descripcion: string;
  estado: boolean;

  constructor(standar: Partial<Estandar> = {}) {
    this.id = standar.id || 0;
    this.descripcion = standar.descripcion || '';
    this.estado = standar.estado || true;
  }

  static fromJson(data: any): Estandar {
    return new Estandar({
      id: data.id as number,
      descripcion: data.descripcion as string,
      estado: data.estado as boolean,
    });
  }

  static toJson(standar: Estandar): any {
    return {
      id: standar.id,
      descripcion: standar.descripcion,
      estado: standar.estado,
    };
  }
}
