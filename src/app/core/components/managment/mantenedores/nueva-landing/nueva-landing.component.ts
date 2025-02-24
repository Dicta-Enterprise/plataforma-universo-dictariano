import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  get contenidoControl(): FormControl {
    return this.landingForm.get('contenido') as FormControl;
  }

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

    this.landingForm.reset();
    if (!this.landingId) return;

    this.landingService.obtenerLandingService$(this.landingId).subscribe({
      next: (data) => {
        this.landing = data;
        this.landingForm.patchValue({
          ...data,
          contenido: data.contenido || []
        });
        console.log('Formulario actualizado para edición:', this.landingForm.value);
      },
      error: (error) => console.error('Error al obtener la landing:', error)
    });
  }

  onHide() {
    this.onHideEmit.emit(false);
  }

  crearLandingPage() {
    if (this.isFormInvalid()) return;

    const { planetaId, titulo } = this.landingForm.value;

    this.landingService.listarLandingService$().subscribe(landings => {
      const planetaEnUso = landings.some(l => l.planetaId === planetaId);
      const tituloEnUso = landings.some(l => l.titulo === titulo);

      if (planetaEnUso) {
        this.alertService.showWarn('Advertencia', 'El planeta ya está en uso en otra landing.');
        return;
      }
      if (tituloEnUso) {
        this.alertService.showWarn('Advertencia', 'El título ya está en uso en otra landing.');
        return;
      }

      const landingData: LandingPageManagment = {
        ...this.landingForm.value,
        planetaId: String(planetaId),
        contenido: this.formatContenido(this.landingForm.value.contenido),
        imagenUrl: this.landingForm.value.imagenUrl?.trim() || null,
        color: this.landingForm.value.color?.trim() || null,
        estado: 'ACTIVO'
      };

      this.landingService.crearLandingService$(landingData).subscribe(success => {
        if (success) {
          this.alertService.showSuccess('Landing creada', 'La landing page se ha creado correctamente');
          this.onHide();
        } else {
          this.alertService.showError('Error', 'Ha ocurrido un error al crear la landing page');
        }
      });
    });
  }

  actualizarLanding() {
    if (this.isFormInvalid()) return;

    this.isLoading = true;
    const { id, ...landingData } = this.landingForm.value;
    landingData.contenido = this.formatContenido(landingData.contenido);
    landingData.color = landingData.color?.trim() || null;
    landingData.imagenUrl = landingData.imagenUrl?.trim() || null;
    landingData.estado = landingData.estado ?? this.landing.estado ?? ActivosState.ACTIVO;

    if (landingData.titulo === this.landing.titulo) {
      delete landingData.titulo;
    }

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

  private formatContenido(contenido: any): string[] {
    return Array.isArray(contenido) ? contenido.map(item => item.trim()) : [];
  }

  private isFormInvalid(): boolean {
    if (this.landingForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}