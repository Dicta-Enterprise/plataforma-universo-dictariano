import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { finalize, Subscription, tap } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { createNuevaLandingForm } from 'src/app/core/forms/managment/landing-page.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingPageManagmentService } from 'src/app/core/services/managment/landing-page/landing-managment.service';
import { LandingUtilsService } from './utils/landing-utils.service';
import { CPLANETAS_MANAGMENT } from '../../../../constants/managment/CLanding-managment.constants';

@Component({
  selector: 'app-nueva-landing',
  templateUrl: './nueva-landing.component.html',
  styleUrls: ['./nueva-landing.component.css']
})
export class NuevaLandingComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevaLanding: boolean = false;
  @Input() landingId: string = '';
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  landing: LandingPageManagment = new LandingPageManagment();
  planetas = CPLANETAS_MANAGMENT; 
  landingForm: FormGroup = createNuevaLandingForm(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private landingService: LandingPageManagmentService,
    private landingUtils: LandingUtilsService
  ) { }

  get contenidoControl(): FormControl {
    return this.landingForm.get('contenido') as FormControl;
  }

  ngOnInit(): void {

  }

  onShow() {
    console.log('ID recibido en nueva-landing:', this.landingId);

    this.landingForm.reset();
    if (!this.landingId) return;

    this.landingService.obtenerLandingService$(this.landingId)
    .pipe(
      tap(data => console.log('Landing obtenida:', data)),
      tap(data => this.landingForm.patchValue({ ...data }))
    )
    .subscribe({
      next: (data) => {
        this.landing = data;
        console.log('Formulario actualizado para edición:', this.landingForm.value);
      },
      error: (error) => console.error('Error al obtener la landing:', error)
    });
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  crearLandingPage() {
    if (this.landingUtils.isFormInvalid(this.landingForm)) return;

    const landingData = {
      ...this.landingForm.value,
      planeta: String(this.landingForm.value.planeta),
      contenido: this.landingUtils.formatContenido(this.landingForm.value.contenido),
      imagenUrl: this.landingForm.value.imagenUrl?.trim() || null,
      color: this.landingForm.value.color?.trim() || null,
      estado: this.landingForm.value.estado || 'ACTIVO',
    };
  
    console.log('Datos preparados:', landingData);
    
    if (this.landingId) {
      this.actualizarLanding(landingData);
    } else {
      this.guardarLandingPage(landingData);
    }
  }
  
  guardarLandingPage(landingData: LandingPageManagment) {
    this.isLoading = true;
    console.log('Datos enviados:', landingData);

    this.landingService.crearLandingService$(landingData)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: () => {
        this.alertService.showSuccess('Landing creada', 'La landing page se ha creado correctamente');
        this.onHide();
      },
      error: (err) => this.landingUtils.manejarErrores(err)
    });
  }

  actualizarLanding(landingData: Partial<LandingPageManagment>) {  
    this.isLoading = true;
    
    if (landingData.titulo === this.landing.titulo) {
      delete landingData.titulo;
    }
    console.log('Datos enviados para actualizar:', landingData);
  
    this.landingService.editarLandingService$(this.landingId, landingData)
    .pipe(
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: () => {
        this.alertService.showSuccess('Landing actualizada', 'La landing page se ha actualizado correctamente');
        this.onHide();
      },
      error: (err) => this.landingUtils.manejarErrores(err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}