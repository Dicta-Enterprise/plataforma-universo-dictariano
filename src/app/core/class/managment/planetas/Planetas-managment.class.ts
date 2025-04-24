import { NewActivoState } from "src/app/shared/enums";

export class PlanetaManagment {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: NewActivoState;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  galaxiaId: string;

  constructor(planetaManagment: Partial<PlanetaManagment> = {}) {
    this.id = planetaManagment.id ?? '';
    this.nombre = planetaManagment.nombre ?? '';
    this.descripcion = planetaManagment.descripcion ?? '';
    this.imagen = planetaManagment.imagen ?? '';
    this.estado = planetaManagment.estado ?? NewActivoState.ACTIVO;
    this.fechaCreacion = planetaManagment.fechaCreacion ?? new Date();
    this.fechaActualizacion = planetaManagment.fechaActualizacion ?? new Date();
    this.galaxiaId = planetaManagment.galaxiaId ?? '';
  }

  static fromJson(planetaManagment: any): PlanetaManagment {
    return new PlanetaManagment({
      id: planetaManagment.id,
      nombre: planetaManagment.nombre,
      descripcion: planetaManagment.descripcion,
      imagen: planetaManagment.imagen,
      estado: planetaManagment.estado,
      fechaCreacion: planetaManagment.fechaCreacion,
      fechaActualizacion: planetaManagment.fechaActualizacion,
      galaxiaId: planetaManagment.galaxiaId,
    });
  }

  static toJson(planetaManagment: PlanetaManagment): any {
    return {
      //id: planetaManagment.id,
      nombre: planetaManagment.nombre,
      descripcion: planetaManagment.descripcion,
      imagen: planetaManagment.imagen,
      estado: planetaManagment.estado,
      fechaCreacion: planetaManagment.fechaCreacion,
      fechaActualizacion: planetaManagment.fechaActualizacion,
      galaxiaId: planetaManagment.galaxiaId,
    };
  }
}
