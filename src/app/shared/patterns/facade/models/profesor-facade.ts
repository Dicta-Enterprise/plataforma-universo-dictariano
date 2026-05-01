import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profesor } from 'src/app/core/class/models';
import { ProfesorService } from 'src/app/core/services/models/profesor/profesor.service';
import { AlertService } from 'src/app/shared/services/alert.service';

export interface ProfesorUI {
  nombre: string;
  apellido: string;
  apellidoMaterno: string;
  nombreCompleto: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfesorFacade {
  profesores$ = new BehaviorSubject<Profesor[]>([]);
  profesor$ = new BehaviorSubject<Profesor>(new Profesor());

  readonly profesorMap$: Observable<Record<string, ProfesorUI>> =
    this.profesores$.pipe(
      map(profesores =>
        profesores.reduce<Record<string, ProfesorUI>>((acc, p) => {
          acc[p.id] = this.toUI(p);
          return acc;
        }, {})
      )
    );

  readonly defaultProfesor: ProfesorUI = {
    nombre: '',
    apellido: '',
    apellidoMaterno: '',
    nombreCompleto: 'Profesor no disponible',
    imagen: '',
  };

  constructor(
    private readonly profesorService: ProfesorService,
    private readonly alertService: AlertService
  ) {}

  listarProfesores(): void {
    this.profesorService.listarProfesoresService$().subscribe({
      next: (response) => {
        this.profesores$.next(response);
        this.alertService.showSuccess('Exito', 'Profesores cargados');
      },
    });
  }

  obtenerProfesor(id: string): void {
    this.profesorService.obtenerProfesorService$(id).subscribe({
      next: (response) => this.profesor$.next(response),
    });
  }

  getProfesorById(profesorId: string): ProfesorUI {
    const profesor = this.profesores$.value.find(p => p.id === profesorId);
    return profesor ? this.toUI(profesor) : this.defaultProfesor;
  }

  private toUI(p: Profesor): ProfesorUI {
    // Construir nombre completo con los tres campos disponibles
    const partes = [p.nombre, p.apellido, p.apellidoMaterno].filter(Boolean);
    return {
      nombre: p.nombre,
      apellido: p.apellido,
      apellidoMaterno: p.apellidoMaterno,
      nombreCompleto: partes.join(' '),
      imagen: p.imagen,
    };
  }
}