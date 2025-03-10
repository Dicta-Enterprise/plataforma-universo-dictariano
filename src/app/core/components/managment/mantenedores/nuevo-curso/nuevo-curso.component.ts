import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, take } from 'rxjs';
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
  @Input() cursoId: string = '';
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  curso = new CursoManagment();

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

  profesores = [
    { id: '6792d8bd005fc1e6836977f6', nombre: 'Juan Pérez' },
    { id: '6792d8bd005fc1e6836977f7', nombre: 'María Gómez' },
    { id: '6792d8bd005fc1e6836977f8', nombre: 'Carlos López' }
  ];

  idiomas = [
    { id: '6792d8bd005fc1e6836977f9', nombre: 'Español' },
    { id: '6792d8bd005fc1e6836977f5', nombre: 'Inglés' },
  ];

  cursoForm: FormGroup = createNuevoCursoForm(this.fb); 

  constructor(private fb: FormBuilder, private alertService: AlertService, private cursoService: CursosManagmentService) {}

  ngOnInit(): void {}

  onShow() {
    if (this.cursoId) {
      this.isLoading = true;
      this.subscription.add(
        this.cursoService.obtenerCursoService$(this.cursoId).pipe(take(1)).subscribe({
          next: (curso) => {
            this.curso = curso;
            this.cursoForm.patchValue({
              ...curso,
              fechaInicio: new Date(curso.fechaInicio),
              fechaFinalizacion: new Date(curso.fechaFinalizacion),
              profesorId: curso.profesorId || null,
              idiomaId: curso.idiomaId || null,
            });
            this.isLoading = false;
          },
          error: (err) => {
            this.alertService.showError('Error', 'No se pudo obtener el curso');
            console.error('Error obteniendo curso:', err);
            this.isLoading = false;
          }
        })
      );
    }
  }

  onHide() {
    //this.curso = new CursoManagment();
    //this.cursoId = '';
    //this.cursoForm.reset();
    this.resetForm();
    this.onHideEmit.emit(false);
  }

  private resetForm() {
    this.curso = new CursoManagment();
    this.cursoId = '';
    this.cursoForm.reset({
      nombre: '',
      descripcion: '',
      fechaInicio: null,
      fechaFinalizacion: null,
      profesorId: null,
      idiomaId: null,
      estado: 'ACTIVO'
    });
  }

  actualizarCurso() {

    if (this.cursoForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    let cursoActualizar: Partial<CursoManagment> ={ ...this.cursoForm.value, estado: 'ACTIVO'}

    if(cursoActualizar.nombre === this.curso.nombre){
      delete cursoActualizar.nombre;
    }

    this.cursoService.editarCursoService$(this.cursoId, cursoActualizar).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Curso actualizado', 'El curso se ha actualizado correctamente');
        this.onHide();
      },
      error: (err) => {
       this.errores(err);
      }
    });
  }

  crearCurso() {

    if (this.cursoForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const cursoCrear: CursoManagment ={ ...this.cursoForm.value, estado: 'ACTIVO'}

    this.cursoService.crearCursoService$(cursoCrear).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Curso creado', 'El curso se ha creado correctamente');
        this.onHide();
      },
      error: (err) => {
        this.errores(err);
      }
    });

    // this.cursoService.crearCursoService$(curso).subscribe({
    //   next: (success) => {
    //     if(success){
    //       this.alertService.showSuccess('Curso creado', 'El curso se ha creado correctamente');
    //       this.onHide();
    //     }else{
    //       this.alertService.showError('Error', 'No se pudo crear el curso');
    //     }
    //   },
    //   error: (err) => {
    //     this.errores(err);
    //   }
    // });
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
