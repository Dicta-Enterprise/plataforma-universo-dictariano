import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { IdiomaManagment } from 'src/app/core/class/managment/managment';
import { createNuevoIdiomaform } from 'src/app/core/forms/managment/idioma.form';
import { IdiomaManagmentService } from 'src/app/core/services/managment/idioma/idioma-managment.service';
import { convertToIdiomaManagment } from 'src/app/shared/functions/managment/idioma.function';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-nuevo-idioma',
  templateUrl: './nuevo-idioma.component.html',
  styleUrls: ['./nuevo-idioma.component.css']
})
export class NuevoIdiomaComponent {
  private subscription: Subscription = new Subscription();
  @Input() idiomaId: string;

  isLoading: boolean = false;
  @Input() isNuevoIdioma: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshIdioma: EventEmitter<boolean> = new EventEmitter<boolean>();

  idiomaForm: FormGroup = createNuevoIdiomaform(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly idiomaManagmentService: IdiomaManagmentService
  ) { }

  ngOnInit(): void { }

  onShow() {
    if (this.idiomaId === '') return;

    this.isLoading = true;

    this.subscription.add(
      this.idiomaManagmentService
        .obtenerIdiomaService$(this.idiomaId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.idiomaForm.patchValue(response);
          },
          error: (error) => {
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al obtener el idioma'
            );
          },
        })
    );
  }

  onHide() {
    this.onHideEmit.emit(false);
    this.clearComponents();
  }

  clearComponents() {
    this.idiomaForm.reset();
  }

  crearIdioma() {
    if (this.idiomaForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const idioma = convertToIdiomaManagment(this.idiomaForm);

    switch (this.idiomaId) {
      case '':
        this.guardarIdioma(idioma);
        break;
      default:
        this.actualizarIdioma(idioma);
        break;
    }
  }

  guardarIdioma(idioma: IdiomaManagment) {
    this.isLoading = true;
    this.subscription.add(
      this.idiomaManagmentService
        .crearIdiomaService$(idioma)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Idioma creado',
              'Idioma creado con exito'
            );
            this.onHide();
            this.refreshIdioma.emit(true);
          },
          error: ({ error }) => {
            if (Array.isArray(error.message)) {
              error.message.forEach((element: string) => {
                this.alertService.showError('Ups...', element);
              });
            } else {
              this.alertService.showError('Ups...', error.error || 'Ocurrió un error inesperado');
            }
            this.alertService.showError('Ups...', 'Ocurrio un error al crear el idioma');

          }
        })
    );
  }

  actualizarIdioma(idioma: IdiomaManagment) {
    this.isLoading = true;

    this.subscription.add(
      this.idiomaManagmentService
        .editarIdiomaService$(idioma, this.idiomaId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Idioma actualizado',
              'Idioma actualizado con exito'
            );
            this.onHide();
            this.refreshIdioma.emit(true);
          },
          error: ({ error }) => {
            if (Array.isArray(error.message)) {
              error.message.forEach((element: any) => {
                this.alertService.showError('Ups...', element);
              });
            } else {
              this.alertService.showError('Ups...', error.error)
            }

            this.alertService.showError('Ups...', 'Ocurrio un error al actualizar el idioma');
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
