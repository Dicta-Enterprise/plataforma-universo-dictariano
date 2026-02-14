import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { Login } from 'src/app/core/class/auth/login.class';
import { LoginService } from 'src/app/pages/auth/services/login.service';
import { LoginResponse } from 'src/app/core/class/auth/login.response.class';
import { TokenStorageService } from 'src/app/core/security/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {

  login$ = new BehaviorSubject<LoginResponse | null>(null);

  private destroy$ = new Subject<void>();

  constructor(
    private readonly loginService: LoginService,
    private readonly tokenStorage: TokenStorageService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  iniciarSesion(login: Login) {
    this.loginService
      .iniciarSesion(login)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: LoginResponse) => {
          this.tokenStorage.setToken(response.accessToken);
          this.login$.next(response);

          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Inicio de sesión exitoso',
            detail: 'Bienvenido nuevamente',
          });

          this.router.navigate(['/']);
        },
        error: (error) => {

          const backendMessage = error?.error?.message;

          if (backendMessage === 'Credenciales inválidas') {
            this.messageService.add({
              key: 'global',
              severity: 'warn',
              summary: 'Acceso denegado',
              detail: 'Correo o contraseña incorrectos',
            });
            return;
          }

          this.messageService.add({
            key: 'global',
            severity: 'error',
            summary: 'Error al iniciar sesión',
            detail: backendMessage || 'Ocurrió un error al iniciar sesión',
          });
        },
      });
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
