import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription, take } from 'rxjs';
import { Profesor } from 'src/app/core/class/models';
import { createNuevoProfesorForm } from 'src/app/core/forms/models/profesor.form';
import { ProfesorService } from 'src/app/core/services/models/profesor/profesor.service';
import { convertToProfesorManagment } from 'src/app/shared/functions/models/profesor/profesor.function';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-nuevo-profesor',
  templateUrl: './nuevo-profesor.component.html',
  styleUrls: ['./nuevo-profesor.component.css']
})
export class NuevoProfesorComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevoProfesor: boolean = false;
  @Input() profesorId: string = '';
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshProfesor: EventEmitter<boolean> = new EventEmitter<boolean>();

  profesor = new Profesor();

  selectedCountry: any;

  profesorForm: FormGroup = createNuevoProfesorForm(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {}

  onShow() {
    if (this.profesorId) {
      this.subscription.add(
        this.profesorService.obtenerProfesorService$(this.profesorId)
          .pipe(
            take(1),
            finalize(() => this.isLoading = false)
          )
          .subscribe({
            next: (profesor) => {
              console.log(profesor);
              this.profesor = profesor;
              this.profesorForm.patchValue({
                ...profesor,
              });
            },
            error: (err) => {
              this.alertService.showError('Error', 'No se pudo obtener al Profesor');
              console.error('Error obteniendo Nuevo Profesor:', err);
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
    this.profesorForm.reset();
  }

  crearProfesor() {

    if (this.profesorForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }
    
    const profesor = convertToProfesorManagment(this.profesorForm);

    switch (this.profesorId) {
      case '':
        this.guardarProfesor(profesor);
        break;
      default:
        this.actualizarProfesor(profesor);
        break;
    }
  }

  guardarProfesor(profesor: Profesor) {
    this.isLoading = true;
    this.subscription.add(
      this.profesorService.crearProfesorService$(profesor)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (res) => {
            this.alertService.showSuccess('Profesor Creado', 'El Profesor se ha creado Correctamente');
            this.onHide();
            this.refreshProfesor.emit(true);
          },
          error: (err) => {
            this.errores(err);
          }
        })
    );
  }

  actualizarProfesor(profesor: Profesor) {

    console.log('Profe', profesor);

    this.isLoading = true;
    this.subscription.add(
      this.profesorService.editarProfesorService$(this.profesorId, profesor)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (res) => {
            this.alertService.showSuccess('Profesor Actualizado', 'El profesor se ha actualizado Correctamente');
            this.onHide();
            this.refreshProfesor.emit(true);
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

