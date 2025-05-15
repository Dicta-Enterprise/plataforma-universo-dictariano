import { Inject, Injectable } from '@angular/core';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { Observable } from 'rxjs';
import { GalaxiaRepository } from 'src/app/core/repositories/managment/galaxia.repository';
import { GALAXIA_REPOSITORY } from 'src/app/core/tokens/managment/galaxia.token';

@Injectable({
  providedIn: 'root',
})
export class GalaxiasManagmentService {
  constructor(
    @Inject(GALAXIA_REPOSITORY)
    private readonly galaxiaRepository: GalaxiaRepository
  ) {}

  listarGalaxiasService$(): Observable<GalaxiaManagment[]> {
    return this.galaxiaRepository.listarGalaxiasService$();
  }

  obtenerGalaxiaService$(id: string): Observable<GalaxiaManagment> {
    return this.galaxiaRepository.obtenerGalaxiaService$(id);
  }

  crearGalaxiaService$(
    galaxia: GalaxiaManagment
  ): Observable<GalaxiaManagment> {
    return this.galaxiaRepository.crearGalaxiaService$(galaxia);
  }

  editarGalaxiaService$(
    galaxia: GalaxiaManagment,
  ): Observable<GalaxiaManagment> {
    return this.galaxiaRepository.editarGalaxiaService$( galaxia);
  }

  eliminarGalaxiaService$(id: string): Observable<GalaxiaManagment> {
    return this.galaxiaRepository.eliminarGalaxiaService$(id);
  }

  listarDropdownGalaxiasService$() {}
}
