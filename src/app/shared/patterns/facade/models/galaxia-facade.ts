import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Galaxias } from 'src/app/core/class/models';
import { GalaxiasService } from 'src/app/core/services/models/galaxias/galaxias.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class GalaxiaFacade {
  galaxias$ = new BehaviorSubject<Galaxias[]>([]);
  galaxia$ = new BehaviorSubject<Galaxias>(new Galaxias());

  constructor(
    private readonly galaxiaService: GalaxiasService,
    private readonly alertService: AlertService
  ) {}

  listarGalaxias() {
    this.galaxiaService.listarGalaxiasService$().subscribe({
      next: (response) => {
        this.galaxias$.next(response);
        this.alertService.showSuccess('Exito', 'Galaxias cargadas');
      },
    });
  }

  eliminarGalaxia(id: string) {
    this.galaxiaService.eliminarGalaxiaService$(id).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Galaxia eliminada');

        this.galaxias$.next(
          this.galaxias$.getValue().filter((galaxia) => galaxia.id !== id)
        );
      },
    });
  }

  obtenerGalaxia(id: string) {
    this.galaxiaService.obtenerGalaxiaService$(id).subscribe({
      next: (response) => {
        this.galaxia$.next(response);
        this.alertService.showSuccess('Exito', 'Galaxia cargada');
      },
    });
  }

  crearGalaxia(galaxia: Galaxias) {
    this.galaxiaService.crearGalaxiaService$(galaxia).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Galaxia creada');
        this.galaxias$.next([...this.galaxias$.getValue(), response]);
      },
    });
  }

  actualizarGalaxia(galaxia: Galaxias) {
    this.galaxiaService.editarGalaxiaService$(galaxia).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Galaxia actualizada');
        const galaxias = this.galaxias$.getValue();
        const index = galaxias.findIndex((g) => g.id === galaxia.id);
        if (index !== -1) {
          galaxias[index] = response;
          this.galaxias$.next(galaxias);
        }
      },
    });
  }
}
