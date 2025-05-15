import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { GalaxiasManagmentService } from 'src/app/core/services/managment/galaxias/galaxias-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class GalaxiaFacade {
  galaxias$ = new BehaviorSubject<GalaxiaManagment[]>([]);
  galaxia$ = new BehaviorSubject<GalaxiaManagment>(new GalaxiaManagment());

  constructor(
    private readonly galaxiaService: GalaxiasManagmentService,
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

  crearGalaxia(galaxia: GalaxiaManagment) {
    this.galaxiaService.crearGalaxiaService$(galaxia).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Galaxia creada');
        this.galaxias$.next([...this.galaxias$.getValue(), response]);
      },
    });
  }

  actualizarGalaxia(galaxia: GalaxiaManagment) {
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
