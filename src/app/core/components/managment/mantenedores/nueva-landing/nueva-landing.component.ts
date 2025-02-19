import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { createNuevaLandingForm } from 'src/app/core/forms/managment/landing-page.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingPageManagmentService } from 'src/app/core/services/managment/landing-page/landing-managment.service';
import { ActivosState } from 'src/app/shared/enums';

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
  planetas: { id: string; nombre: string }[] = [];
  landingForm: FormGroup = createNuevaLandingForm(this.fb);

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private landingService: LandingPageManagmentService
  ) { }

  ngOnInit(): void {
    this.obtenerPlanetas();
  }

  obtenerPlanetas() {
    this.planetas = [
      { id: '6792877e2942e670016454de', nombre: 'Luminara' },
      { id: '6792d890005fc1e6836977f1', nombre: 'Planeta 2' },
      { id: '6792d8aa005fc1e6836977f2', nombre: 'Planeta 3' },
      { id: '6792d8bd005fc1e6836977f3', nombre: 'Planeta 4' }
    ];
  }

  onShow() {
    console.log('ID recibido en nueva-landing:', this.landingId);

    if (this.landingId) {
      this.landingService.obtenerLandingService$(this.landingId).subscribe({
        next: (data) => {
          this.landing = data;

          this.landingForm.patchValue({
            titulo: this.landing.titulo,
            descripcion: this.landing.descripcion,
            contenido: this.landing.contenido?.join(', ') || '',
            planetaId: this.landing.planetaId,
            imagenUrl: this.landing.imagenUrl,
            color: this.landing.color
          });

          console.log('Formulario actualizado para edición:', this.landingForm.value);
        },
        error: (error) => {
          console.error('Error al obtener la landing:', error);
        }
      });
    } else {
      this.landingForm.reset();
    }
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  // CREAR 
  crearLandingPage() {
    if (this.landingForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const landing: LandingPageManagment = {
      ...this.landingForm.value,
      estado: 'ACTIVO'
    };

    this.guardarLanding(landing);
  }

  // GUARDAR
  guardarLanding(landing: LandingPageManagment) {
    const contenido = landing.contenido
      ? (Array.isArray(landing.contenido)
        ? landing.contenido.map(item => String(item).trim())
        : String(landing.contenido).split(',').map(item => item.trim()))
      : [];

    const landingData = {
      ...landing,
      planetaId: String(landing.planetaId),
      contenido,
      imagenUrl: landing.imagenUrl?.trim() || null,
      color: landing.color?.trim() || null
    };

    console.log('Datos enviados:', landingData);

    this.landingService.crearLandingService$(landingData).subscribe(success => {
      if (success) {
        this.alertService.showSuccess('Landing creada', 'La landing page se ha creado correctamente');
        this.onHide();
      } else {
        this.alertService.showError('Error', 'Ha ocurrido un error al crear la landing page');
      }
    });
  }

  onContenidoChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    if (inputElement) {
      const contenidoArray = inputElement.value.split(',').map(item => item.trim());
      this.landingForm.get('contenido')?.setValue(contenidoArray);
    }
  }

  // ACTUALIZAR
  actualizarLanding() {
    if (this.landingForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    this.isLoading = true;

    let landingData: Partial<LandingPageManagment> = { ...this.landingForm.value };

    delete landingData.id;

    if (landingData.contenido) {
      landingData.contenido = Array.isArray(landingData.contenido)
        ? landingData.contenido.map(item => String(item).trim())
        : String(landingData.contenido).split(',').map(item => item.trim());
    }

    if (landingData.titulo === this.landing.titulo) {
      delete landingData.titulo;
    }
    landingData.color = landingData.color?.trim() || null;
    landingData.imagenUrl = landingData.imagenUrl?.trim() || null;
    landingData.estado = landingData.estado ?? this.landing.estado ?? ActivosState.ACTIVO;

    landingData = Object.fromEntries(
      Object.entries(landingData).filter(([key, value]) => key === 'estado' || value !== undefined)
    );

    console.log('Datos enviados para actualizar:', landingData);

    this.landingService.editarLandingService$(this.landingId, landingData).subscribe({
      next: (response) => {
        if (response === true) { 
          this.alertService.showSuccess('Landing actualizada', 'La landing page se ha actualizado correctamente');
          this.onHide();
        } else {
          this.alertService.showError('Error', 'No se pudo actualizar la landing page');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
