import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { GalaxiasManagmentService } from 'src/app/core/services/managment/galaxias/galaxias-managment.service';

@Injectable({
  providedIn: 'root',
})
export class GalaxiaFacade {
  galaxias$ = new BehaviorSubject<GalaxiaManagment[]>([]);
  galaxia$ = new BehaviorSubject<GalaxiaManagment>(new GalaxiaManagment());

  constructor(private readonly galaxiaService: GalaxiasManagmentService) {}

  listarGalaxias() {
    this.galaxiaService.listarGalaxiasService$().subscribe({
      next: (response) => {
        this.galaxias$.next(response);
      },
    });
  }
}
