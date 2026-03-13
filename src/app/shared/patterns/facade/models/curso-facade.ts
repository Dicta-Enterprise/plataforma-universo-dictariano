import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cursos } from 'src/app/core/class/models';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CursoFacade {
  cursos$ = new BehaviorSubject<Cursos[]>([]);
  cursos_padres$ = new BehaviorSubject<Cursos[]>([]);
  cursos_jovenes$ = new BehaviorSubject<Cursos[]>([]);
  cursos_ninos$ = new BehaviorSubject<Cursos[]>([]);
  curso$ = new BehaviorSubject<Cursos>(new Cursos());

  constructor(
    private readonly cursoService: CursosService,
    private readonly alertService: AlertService
  ) {}

  listarCursos() {
    this.cursoService.listarCursosService$().subscribe({
      next: (response) => {
        this.cursos$.next(response);
        this.alertService.showSuccess('Exito', 'Cursos cargados');
      },
    });
  }

  listarCursosPadres() {
    this.cursoService.listarCursosService$().subscribe({
      next: (response) => {
        this.cursos$.next(response);
        this.alertService.showSuccess('Exito', 'Cursos cargados');
      },
    });
  }
  listarCursosJovenes() {
    this.cursoService.listarCursosService$().subscribe({
      next: (response) => {
        this.cursos$.next(response);
        this.alertService.showSuccess('Exito', 'Cursos cargados');
      },
    });
  }
  listarCursosNinos() {
    this.cursoService.listarCursosService$().subscribe({
      next: (response) => {
        this.cursos$.next(response);
        this.alertService.showSuccess('Exito', 'Cursos cargados');
      },
    });
  }

  eliminarCurso(id: string) {
    this.cursoService.eliminarCursoService$(id).subscribe({
      next: () => {
        this.alertService.showSuccess('Exito', 'Curso eliminado');

        this.cursos$.next(
          this.cursos$.getValue().filter((curso) => curso.id.toString() !== id)
        );
      },
    });
  }

  obtenerCurso(id: string) {
    this.cursoService.obtenerCursoService$(id).subscribe({
      next: (response) => {
        this.curso$.next(response);
        this.alertService.showSuccess('Exito', 'Curso cargado');
      },
    });
  }

  crearCurso(curso: Cursos) {
    this.cursoService.crearCursoService$(curso).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Curso creado');
        this.cursos$.next([...this.cursos$.getValue(), response]);
      },
    });
  }

  actualizarCurso(curso: Cursos) {
    this.cursoService.editarCursoService$(curso.id.toString(),curso).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Curso actualizado');
        const cursos = this.cursos$.getValue();
        const index = cursos.findIndex((c) => c.id === curso.id);
        if (index !== -1) {
          cursos[index] = response;
          this.cursos$.next(cursos);
        }
      },
    });
  }
}
