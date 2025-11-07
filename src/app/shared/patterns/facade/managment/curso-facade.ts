import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CursoFacade {
  cursos$ = new BehaviorSubject<CursoManagment[]>([]);
  cursos_padres$ = new BehaviorSubject<CursoManagment[]>([]);
  cursos_jovenes$ = new BehaviorSubject<CursoManagment[]>([]);
  cursos_ninos$ = new BehaviorSubject<CursoManagment[]>([]);
  curso$ = new BehaviorSubject<CursoManagment>(new CursoManagment());

  constructor(
    private readonly cursoService: CursosManagmentService,
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

  crearCurso(curso: CursoManagment) {
    this.cursoService.crearCursoService$(curso).subscribe({
      next: (response) => {
        this.alertService.showSuccess('Exito', 'Curso creado');
        this.cursos$.next([...this.cursos$.getValue(), response]);
      },
    });
  }

  actualizarCurso(curso: CursoManagment) {
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
