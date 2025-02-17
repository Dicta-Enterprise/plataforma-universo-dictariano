import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { createNuevaLandingForm } from 'src/app/core/forms/managment/landing-page.form';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LandingPageManagmentService } from 'src/app/core/services/managment/landing-page/landing-managment.service';

@Component({
  selector: 'app-nueva-landing',
  templateUrl: './nueva-landing.component.html',
  styleUrls: ['./nueva-landing.component.css']
})
export class NuevaLandingComponent {
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  @Input() isNuevaLanding: boolean = false;
  @Input() landing: LandingPageManagment = new LandingPageManagment();
  @Output() onHideEmit: EventEmitter<boolean> = new EventEmitter<boolean>();

  planetas = [
    { id: '6792877e2942e670016454de', nombre: 'Luminara' },
    { id: '6792d890005fc1e6836977f1', nombre: 'Planeta 2' },
    { id: '6792d8aa005fc1e6836977f2', nombre: 'Planeta 3' },
    { id: '6792d8bd005fc1e6836977f3', nombre: 'Planeta 4' }
  ];

  landingForm: FormGroup = createNuevaLandingForm(this.fb);

  constructor(private fb: FormBuilder, private alertService: AlertService, private landingService: LandingPageManagmentService) { }

  ngOnInit(): void { }

  onShow() { }

  onHide() {
    this.onHideEmit.emit(false);
  }

  // CREAR 
  crearLandingPage() {
    if (this.landingForm.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return;
    }

    const landing: LandingPageManagment = this.landingForm.value;
    if (this.landing?.id) {
      this.actualizarLanding(landing);
    } else {
      this.guardarLanding(landing);
    }
  }

  // GUARDAR
  guardarLanding(landing: LandingPageManagment) {
    const contenido = typeof this.landingForm.value.contenido === 'string'
      ? this.landingForm.value.contenido.split(',').map((item: string) => item.trim())
      : [];

    const landingData = {
      ...this.landingForm.value,
      planetaId: String(this.landingForm.value.planetaId),
      contenido
    };

    console.log('Datos enviados:', landingData);

    this.landingService.crearLandingService$(landing).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Landing creada', 'La landing page se ha creado correctamente');
        this.onHide();
      },
      error: (err) => {
        console.error('Error del servidor:', err.error);
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
  actualizarLanding(landing: LandingPageManagment) {
    const contenido = typeof this.landingForm.value.contenido === 'string'
      ? this.landingForm.value.contenido.split(',').map((item: string) => item.trim())
      : [];
  
    const landingData = {
      ...this.landingForm.value,
      planetaId: String(this.landingForm.value.planetaId),
      contenido
    };
  
    console.log('Datos enviados para actualizar:', landingData);
  
    this.landingService.editarLandingService$(landing).subscribe({
      next: (res) => {
        this.alertService.showSuccess('Landing actualizada', 'La landing page se ha actualizado correctamente');
        this.onHide();
      },
      error: (err) => {
        console.error('Error del servidor:', err.error);
        this.alertService.showError('Error', 'Ha ocurrido un error al actualizar la landing page');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
