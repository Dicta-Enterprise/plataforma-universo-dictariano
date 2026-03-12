import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription, take } from 'rxjs';
import { Categoria, Cursos } from 'src/app/core/class/models';
import { CCATEGORIES_CONSTANT, CLANGUAGE_CONSTANT, CPLANETS_CONSTANT, CPROFESSOR_CONSTANT } from 'src/app/core/constants/constants';
import { createNuevoCursoForm } from 'src/app/core/forms/managment/cursos.form';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { Estandar } from 'src/app/shared/class/Estandar';
import { convertToCursos } from 'src/app/shared/functions/managment/cursos/cursos.function';
import { AlertService } from 'src/app/shared/services/alert.service';
import { PlanetasService } from 'src/app/core/services/models/planetas/planetas.service';


@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css'],
})
export class NuevoCursoComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevoCurso: boolean = false;
  @Input() cursoId: string = '';
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshCursos: EventEmitter<boolean> = new EventEmitter<boolean>();

  curso = new Cursos();//

  cursoForm: FormGroup = createNuevoCursoForm(this.fb); 

  constructor(private fb: FormBuilder, private alertService: AlertService, private cursoService: CursosService,
    private planetaManagmentService:PlanetasService,
  ) {}

  ngOnInit(): void {}

  onShow() {
    if (this.cursoId) {
      this.subscription.add(
        this.cursoService.obtenerCursoService$(this.cursoId)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (curso) => {
            console.log(curso);
            this.curso = curso;//
            this.cursoForm.patchValue({
              ...curso,
            });
          },
          error: (err) => {
            this.alertService.showError('Error', 'No se pudo obtener el curso');
            console.error('Error obteniendo curso:', err);
          }
        })
      );
    }
  }

  onHide() {
    this.resetForm();
    this.onHideEmit.emit(false);
  }

  resetForm() {
    this.cursoForm.reset();
  }

  crearCurso(){

    if (this.cursoForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }
    
    const curso = convertToCursos(this.cursoForm);

    switch(this.cursoId){
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
      this.cursoService.crearCursoService$(curso)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res) => {
          this.alertService.showSuccess('Curso creado', 'El curso se ha creado correctamente');
          this.onHide();
          this.refreshCursos.emit(true);
        },
        error: (err) => {
          this.errores(err);
        }
      })
    );
  }


  actualizarCurso(curso: Cursos) {

    console.log('Curso:', curso);
    
    this.isLoading = true;
    this.subscription.add(
      this.cursoService.editarCursoService$(this.cursoId, curso)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res) => {
          this.alertService.showSuccess('Curso actualizado', 'El curso se ha actualizado correctamente');
          this.onHide();
          this.refreshCursos.emit(true);
        },
        error: (err) => {
          this.errores(err);
        }
      })
    );
  }

  private errores(err: any) {

    console.error('Error del servidor:', err.error);
    if (err.status === 409) {
      this.alertService.showError('Conflicto', err.error.message);
    } else if (err.status === 400 && err.error.data) {
      this.alertService.showError('Error', err.error.message);
    } else if (err.status === 400 && Array.isArray(err.error.message)) {
      err.error.message.forEach((msg: string) => {
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
