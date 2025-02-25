import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class LandingUtilsService {
  constructor(private alertService: AlertService) {}

  formatContenido(contenido: any): string[] {
    return Array.isArray(contenido) ? contenido.map(item => item.trim()) : [];
  }

  isFormInvalid(form: any): boolean {
    if (form.invalid) {
      this.alertService.showWarn('Ups..', 'Formulario incompleto');
      return true;
    }
    return false;
  }

  manejarErrores(err: any): void {
    if (err.status === 409) {
      this.alertService.showError('Conflicto', err.error.error);
    } else if (err.status === 400 && err.error.data) {
      this.alertService.showError('Error', err.error.error);
    } else if (err.status === 400 && Array.isArray(err.error.error)) {
      err.error.error.forEach((msg: string) => {
        this.alertService.showError('Error de Validación', msg);
      });
    } else {
      this.alertService.showError('Error', 'Ha ocurrido un error');
    }
  }
}
