import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription, take } from 'rxjs';
import { Cursos } from 'src/app/core/class/models';
import { createNuevoCursoForm } from 'src/app/core/forms/models/cursos.form';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { convertToCursos } from 'src/app/shared/functions/models/cursos/cursos.function';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PlanetasService } from 'src/app/core/services/models/planetas/planetas.service';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css'],
})
export class NuevoCursoComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  isLoading = false;
  @Input() isNuevoCurso = false;
  @Input() cursoId = '';
  @Output() hideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshCursos: EventEmitter<boolean> = new EventEmitter<boolean>();

  curso = new Cursos();

  cursoForm: FormGroup = createNuevoCursoForm(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private cursoService: CursosService,
    private planetaManagmentService: PlanetasService,
  ) {}

  onShow() {
    if (this.cursoId) {
      this.subscription.add(
        this.cursoService
          .obtenerCursoService$(this.cursoId)
          .pipe(
            take(1),
            finalize(() => (this.isLoading = false)),
          )
          .subscribe({
            next: (curso) => {
              this.curso = curso;
              this.cursoForm.patchValue({
                ...curso,
              });
            },
            error: () => {
              this.alertService.showError(
                'Error',
                'No se pudo obtener el curso',
              );
            },
          }),
      );
    }
  }

  onHide() {
    this.resetForm();
    this.hideEmit.emit(false);
  }

  resetForm() {
    this.cursoForm.reset();
  }

  crearCurso() {
    if (this.cursoForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const curso = convertToCursos(this.cursoForm);

    switch (this.cursoId) {
    case '':
      this.guardarCurso(curso);
      break;
    default:
      this.actualizarCurso(curso);
      break;
    }
  }

  guardarCurso(curso: Cursos) {
    this.isLoading = true;
    this.subscription.add(
      this.cursoService
        .crearCursoService$(curso)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => {
            this.alertService.showSuccess(
              'Curso creado',
              'El curso se ha creado correctamente',
            );
            this.onHide();
            this.refreshCursos.emit(true);
          },
          error: (err) => {
            this.errores(err);
          },
        }),
    );
  }

  actualizarCurso(curso: Cursos) {
    this.isLoading = true;
    this.subscription.add(
      this.cursoService
        .editarCursoService$(this.cursoId, curso)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: () => {
            this.alertService.showSuccess(
              'Curso actualizado',
              'El curso se ha actualizado correctamente',
            );
            this.onHide();
            this.refreshCursos.emit(true);
          },
          error: (err) => {
            this.errores(err);
          },
        }),
    );
  }

  private errores(err: unknown) {
    const errorObj = err as {
      status?: number;
      error?: { message?: string | string[]; data?: unknown };
    };

    if (errorObj.status === 409) {
      this.alertService.showError(
        'Conflicto',
        (errorObj.error?.message as string) || 'Conflicto en el servidor',
      );
    } else if (errorObj.status === 400 && errorObj.error?.data) {
      this.alertService.showError(
        'Error',
        (errorObj.error?.message as string) || 'Datos inválidos',
      );
    } else if (
      errorObj.status === 400 &&
      Array.isArray(errorObj.error?.message)
    ) {
      errorObj.error.message.forEach((msg: string) => {
        this.alertService.showError('Error de Validación', msg);
      });
    } else {
      this.alertService.showError('Error', 'Ha ocurrido un error');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
