import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-mi-informacion',
  templateUrl: './mi-informacion.component.html',
  styleUrls: ['./mi-informacion.component.css']
})
export class MiInformacionComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private readonly baseUrl = 'http://localhost:3000/api';

  // Datos del perfil
  userId: string = '';
  nombre: string = '';
  email: string = '';

  // Contraseñas
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  isLoadingPerfil: boolean = false;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.subscription.add(
      this.http.get<any>(`${this.baseUrl}/auth/profile`, { withCredentials: true })
      .subscribe({
        next: (data) => {
          this.userId = data.id || data.userId || '';
          this.nombre = data.username || data.nombre || '';
          this.email = data.email || '';
        },
        error: (err) => {
          console.error('Error al cargar perfil:', err);
        }
      })
    );
  }

  guardarPerfil() {
    if (!this.nombre || !this.email) {
      this.alertService.showWarn('Ups..', 'Completa todos los campos');
      return;
    }

    this.isLoadingPerfil = true;
    this.subscription.add(
      this.http.patch(`${this.baseUrl}/profile/${this.userId}`,
        { nombre: this.nombre },
        { withCredentials: true }
      ).subscribe({
        next: () => {
          this.alertService.showSuccess('Éxito', 'Perfil actualizado correctamente');
          this.isLoadingPerfil = false;
        },
        error: (err) => {
          this.alertService.showError('Error', 'No se pudo actualizar el perfil');
          this.isLoadingPerfil = false;
        }
      })
    );
  }

  guardarPassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.alertService.showWarn('Ups..', 'Completa todos los campos');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.alertService.showWarn('Ups..', 'Las contraseñas no coinciden');
      return;
    }

    // Pendiente: endpoint de cambiar contraseña en el backend
    this.alertService.showWarn('Pendiente', 'El backend aún no tiene este endpoint');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}