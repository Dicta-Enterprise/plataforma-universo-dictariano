import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

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
  imageUrl: string = '';
  mostrarAvatares: boolean = false;

  // Contraseñas
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  isLoadingPerfil: boolean = false;
  perfilId: number = 0;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
  this.subscription.add(
    this.http.get<any>(`${this.baseUrl}/auth/profile`, { withCredentials: true })
    .subscribe({
      next: (data) => {
        this.userId = data.sub || '';
        this.email = data.email || '';
        // Jalar perfil completo
        this.http.get<any>(`${this.baseUrl}/profile`, { withCredentials: true })
        .subscribe({         
          next: (res) => {
            console.log('Respuesta perfil:', res);
            const perfil = res.data[0];
            if (perfil) {
              this.perfilId = perfil.id;
              this.nombre = perfil.nombre || '';
              this.imageUrl = perfil.imageurl || '';
              this.authService.updateUserImg(this.imageUrl);
            }
          },
          error: (err) => console.error('Error cargando perfil:', err)
        });
      },
      error: (err) => console.error('Error al cargar perfil:', err)
    })
  );
}

  guardarPerfil() {
    const body: any = {};

  if (this.email) body.email = this.email;
  if (this.newPassword && this.newPassword === this.confirmPassword) {
    body.password = this.newPassword;
  }
  if (this.imageUrl) body.imageurl = this.imageUrl;

  if (Object.keys(body).length === 0) {
    this.alertService.showWarn('Ups..', 'No hay cambios para guardar');
    return;
  }

  this.isLoadingPerfil = true;
  this.subscription.add(
    this.http.patch(`${this.baseUrl}/profile/${this.perfilId}`,
      body,
      { withCredentials: true }
    ).subscribe({
      next: () => {
        console.log('Guardando imagen:', this.imageUrl);
        this.authService.updateUserImg(this.imageUrl);
        this.alertService.showSuccess('Éxito', 'Datos actualizados correctamente');
        this.isLoadingPerfil = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
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

    this.alertService.showWarn('Pendiente', 'El backend aún no tiene este endpoint');
  }

  seleccionarAvatar(url: string) {
  this.imageUrl = url;
  this.mostrarAvatares = false;
  console.log('Avatar seleccionado:', url); // ← agrega
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}