import { ActivosState } from 'src/app/shared/enums';

export class PlanetaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: ActivosState;

  constructor(planetaManagment: Partial<PlanetaManagment> = {}) {
    this.id = planetaManagment.id || '';
    this.nombre = planetaManagment.nombre || '';
    this.descripcion = planetaManagment.descripcion || '';
    this.imagen = planetaManagment.imagen || '';
    this.estado = planetaManagment.estado || ActivosState.ACTIVO;
  }

  static fromJson(planetaManagment: any): PlanetaManagment {
    return new PlanetaManagment({
      id: planetaManagment.id,
      nombre: planetaManagment.nombre,
      descripcion: planetaManagment.descripcion,
      imagen: planetaManagment.imagen,
      estado: planetaManagment.estado,
    });
  }

  static toJson(planetaManagment: PlanetaManagment): any {
    return {
      id: planetaManagment.id,
      nombre: planetaManagment.nombre,
      descripcion: planetaManagment.descripcion,
      imagen: planetaManagment.imagen,
      estado: planetaManagment.estado,
    };
  }
}
