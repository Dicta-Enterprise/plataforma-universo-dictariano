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
}
