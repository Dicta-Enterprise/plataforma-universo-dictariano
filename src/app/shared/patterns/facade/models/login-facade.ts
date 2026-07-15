import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { Login } from 'src/app/core/class/auth/login.class';
import { LoginService } from 'src/app/pages/auth/services/login.service';
import { LoginResponse } from 'src/app/core/class/auth/login.response.class';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  login$ = new BehaviorSubject<LoginResponse | null>(null);
  private destroy$ = new Subject<void>();

  constructor(
    private readonly loginService: LoginService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  iniciarSesion(login: Login): void {
    sessionStorage.setItem('pendingVerifyEmail', login.email);

    this.loginService
      .iniciarSesion(login)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          sessionStorage.removeItem('pendingVerifyEmail');
          this.authService.login();
          this.login$.next(null);

          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Inicio de sesión exitoso',
            detail: 'Bienvenido nuevamente',
          });
        },
        error: (error) => {
          const backendMessage = error?.error?.message;

          if (backendMessage === 'Debes verificar tu correo electrónico antes de iniciar sesión.') {
            this.messageService.add({
              key: 'global',
              severity: 'warn',
              summary: 'Correo no verificado',
              detail: 'Debes verificar tu correo. Revisa tu bandeja de entrada.',
            });
            this.router.navigate(['/auth/verify-email']);
            return;
          }

          if (backendMessage === 'Credenciales inválidas') {
            sessionStorage.removeItem('pendingVerifyEmail');
            this.messageService.add({
              key: 'global',
              severity: 'warn',
              summary: 'Acceso denegado',
              detail: 'Correo o contraseña incorrectos',
            });
            return;
          }

          sessionStorage.removeItem('pendingVerifyEmail');
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