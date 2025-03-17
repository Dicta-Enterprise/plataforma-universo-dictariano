import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { createNuevaGalaxiaform } from 'src/app/core/forms/managment/galaxias.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GalaxiasManagmentService } from '../../../../services/managment/galaxias/galaxias-managment.service';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { convertToGalaxiaManagment } from 'src/app/shared/functions/managment/galaxia.function';

@Component({
  selector: 'app-nueva-galaxia',
  templateUrl: './nueva-galaxia.component.html',
  styleUrls: ['./nueva-galaxia.component.css']
})
export class NuevaGalaxiaComponent {
  private subscription: Subscription = new Subscription();
  @Input() galaxiaId: string;

  isLoading: boolean = false;
  @Input() isNuevaGalaxia: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshGalaxia: EventEmitter<boolean> = new EventEmitter<boolean>();

  galaxiaForm: FormGroup = createNuevaGalaxiaform(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private readonly galaxiaManagmentService: GalaxiasManagmentService
  ) { }

  ngOnInit(): void { }

  onShow() {
    if (this.galaxiaId === '') return;

    this.isLoading = true;

    this.subscription.add(
      this.galaxiaManagmentService
        .obtenerGalaxiaService$(this.galaxiaId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.galaxiaForm.patchValue(response);
          },
          error: (error) => {
            this.alertService.showError(
              'Upss..',
              'Ocurrio un error al obtener la galaxia'
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
    this.galaxiaForm.reset();
  }

  crearGalaxia() {
    if (this.galaxiaForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const galaxia = convertToGalaxiaManagment(this.galaxiaForm);

    switch (this.galaxiaId) {
      case '':
        this.guardarGalaxia(galaxia);
        break;
      default:
        this.actualizarGalaxia(galaxia);
        break;
    }
  }

  guardarGalaxia(galaxia: GalaxiaManagment) {
    this.isLoading = true;
    this.subscription.add(
      this.galaxiaManagmentService
        .crearGalaxiaService$(galaxia)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Galaxia creada',
              'Galaxia creada con exito'
            );
            this.onHide();
            this.refreshGalaxia.emit(true);
          },
          error: ({ error }) => {
            if (Array.isArray(error.message)) {
              error.message.forEach((element: string) => {
                this.alertService.showError('Ups...', element);
              });
            } else {
              this.alertService.showError('Ups...', error.error || 'Ocurrió un error inesperado');
            }
            this.alertService.showError('Upss..', 'Ocurrio un error al crear la galaxia');

          }
        })
    );
  }

  actualizarGalaxia(galaxia: GalaxiaManagment) {
    this.isLoading = true;

    this.subscription.add(
      this.galaxiaManagmentService
        .editarGalaxiaService$(galaxia, this.galaxiaId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Galaxia actualizada',
              'Galaxia actualizada con exito'
            );
            this.onHide();
            this.refreshGalaxia.emit(true);
          },
          error: ({ error }) => {
            if (Array.isArray(error.message)) {
              error.message.forEach((element: any) => {
                this.alertService.showError('Upss..', element);
              });
            } else {
              this.alertService.showError('Ups...', error.error)
            }

            this.alertService.showError('Ups..', 'Ocurrio un error al actualizar la galaxia');
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
