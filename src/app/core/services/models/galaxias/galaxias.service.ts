import { Inject, Injectable } from '@angular/core';
import { Galaxias } from 'src/app/core/class/models';
import { Observable } from 'rxjs';
import { GalaxiaRepository } from 'src/app/core/repositories/models/galaxia.repository';
import { GALAXIA_REPOSITORY } from 'src/app/core/tokens/models/galaxia.token';

@Injectable({
  providedIn: 'root',
})
export class GalaxiasService {
  constructor(
    @Inject(GALAXIA_REPOSITORY)
    private readonly galaxiaRepository: GalaxiaRepository
  ) {}

  listarGalaxiasService$(): Observable<Galaxias[]> {
    return this.galaxiaRepository.listarGalaxiasService$();
  }

  obtenerGalaxiaService$(id: string): Observable<Galaxias> {
    return this.galaxiaRepository.obtenerGalaxiaService$(id);
  }

  crearGalaxiaService$(
    galaxia: Galaxias
  ): Observable<Galaxias> {
    return this.galaxiaRepository.crearGalaxiaService$(galaxia);
  }

  editarGalaxiaService$(
    galaxia: Galaxias,
  ): Observable<Galaxias> {
    return this.galaxiaRepository.editarGalaxiaService$( galaxia);
  }

  eliminarGalaxiaService$(id: string): Observable<Galaxias> {
    return this.galaxiaRepository.eliminarGalaxiaService$(id);
  }

  listarDropdownGalaxiasService$() {}
}
