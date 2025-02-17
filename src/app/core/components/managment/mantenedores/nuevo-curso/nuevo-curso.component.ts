import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';
import { createNuevoCursoForm } from 'src/app/core/forms/managment/cursos.form';
import { CursosManagmentService } from 'src/app/core/services/managment/cursos/cursos-managment.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css']
})
export class NuevoCursoComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevoCurso: boolean = false;
  @Input() curso: CursoManagment = new CursoManagment();
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  categorias = [
    { id: '6708179439154cb23c3150ca', nombre: 'Padres' },
    { id: '670aa5b834951486809e8fa1', nombre: 'Niños' }
  ];
  
  planetas = [
    { id: '6792877e2942e670016454de', nombre: 'Luminara' },
    { id: '6792d890005fc1e6836977f1', nombre: 'Planeta 2' },
    { id: '6792d8aa005fc1e6836977f2', nombre: 'Planeta 3' },
    { id: '6792d8bd005fc1e6836977f3', nombre: 'Planeta 4' }
  ];

  cursoForm: FormGroup = createNuevoCursoForm(this.fb);

  constructor(private fb: FormBuilder, private alertService: AlertService, private cursoService: CursosManagmentService) {}

  ngOnInit(): void {}

  onShow() {
    this.cursoForm.reset();
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  crearCurso() {
    if (this.cursoForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }
  
    this.cursoForm.value.estado = 'ACTIVO';
    const curso: CursoManagment = this.cursoForm.value;
    this.guardarCurso(curso);
  }

  guardarCurso(curso: CursoManagment) {

    const cursoData = {
      ...this.cursoForm.value,
      categoriaId: String(this.cursoForm.value.categoriaId),
      planetaId: String(this.cursoForm.value.planetaId)
    };
  
    console.log('Datos enviados:', cursoData);

    this.cursoService.crearCursoService$(curso).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Curso creado', 'El curso se ha creado correctamente');
        this.onHide();
      },
      error: (err) => {
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
          this.alertService.showError('Error', 'Ha ocurrido un error al crear el curso');
        }
      }
    });
  }

  actualizarCurso(curso: CursoManagment) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
