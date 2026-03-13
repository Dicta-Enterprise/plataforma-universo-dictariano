import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { LandingPage } from 'src/app/core/class/models/landing-page/Landing.class';
import { createNuevaLandingForm } from 'src/app/core/forms/models/landing-page.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingPageService } from 'src/app/core/services/models/landing-page/landing.service';
import { CPLANETAS_CONSTANT } from '../../../../constants/langing/CLanding.constants';
import { convertToLandingPage } from 'src/app/shared/functions/models/landing.function';

// Este es el componente hijo, aqui se llaman a los servicios de obetener
//  editar y crear.  
@Component({
  selector: 'app-nueva-landing',
  templateUrl: './nueva-landing.component.html',
  styleUrls: ['./nueva-landing.component.css']
})
export class NuevaLandingComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  isLoading: boolean = false;
  @Input() landingId: string;
  @Input() isNuevaLanding: boolean = false;
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshLanding: EventEmitter<boolean> = new EventEmitter<boolean>();

  planetas = CPLANETAS_CONSTANT;
  landingForm: FormGroup = createNuevaLandingForm(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private landingManagmentService: LandingPageService,
  ) { }

  get contenidoControl(): FormControl {
    return this.landingForm.get('contenido') as FormControl;
  }

  ngOnInit(): void { }

  onShow() {
    if (this.landingId === '') return;

    this.isLoading = true;

    this.subscription.add(
      this.landingManagmentService
        .obtenerLandingService$(this.landingId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.landingForm.patchValue(response);
          },
          error: (error) => {
            this.alertService.showError(
              'Ups...',
              'Ocurrio un error al obtener la landing'
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
    this.landingForm.reset();
  }

  crearLandingPage() {
    if (this.landingForm.invalid) {
      this.alertService.showWarn('Ups...', 'Formulario incompleto');
      return;
    }

    // Convierte los datos del formulario en un objeto LandingPageManagment
    const landing = convertToLandingPage(this.landingForm);

    switch (this.landingId) {
      case '':
        this.guardarLandingPage(landing);
        break;
      default:
        this.actualizarLanding(landing);
        break;
    }
  }

  guardarLandingPage(landing: LandingPage) {
    this.isLoading = true;
    this.subscription.add(
      this.landingManagmentService
        .crearLandingService$(landing)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Landing creada',
              'Landing creada con éxito'
            );
            this.onHide();
            this.refreshLanding.emit(true);
          },
          error: ({ error }) => {
            if (Array.isArray(error.message)) {
              error.message.forEach((element: string) => {
                this.alertService.showError('Ups...', element);
              });
            } else {
              this.alertService.showError('Ups...', error.error || 'Ocurrió un error inesperado');
            }
            this.alertService.showError('Upss..', 'Ocurrio un error al crear la landing page');

          }
        })
    )
  }

  actualizarLanding(landing: LandingPage) {
    this.isLoading = true;
    this.subscription.add(
      this.landingManagmentService
        .editarLandingService$(landing, this.landingId)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (response) => {
            this.alertService.showSuccess(
              'Landing actualizada',
              'Landing actualizada con exito'
            );
            this.onHide();
            this.refreshLanding.emit(true);
          },
          error: ({ error }) => {
            if (Array.isArray(error.message)) {
              error.message.forEach((element: any) => {
                this.alertService.showError('Upss..', element);
              });
            } else {
              this.alertService.showError('Ups...', error.error)
            }

            this.alertService.showError('Ups..', 'Ocurrio un error al actualizar la landing page');
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}