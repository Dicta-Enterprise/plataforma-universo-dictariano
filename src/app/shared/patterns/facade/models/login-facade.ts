import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  // ── returnUrl es opcional: si no viene, va a '/' como antes ──────────────
  iniciarSesion(login: Login, returnUrl: string = '/') {
    this.loginService
      .iniciarSesion(login)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // Si tu LoginService devuelve el usuario en la respuesta,
          // persístelo para que getCurrentUserId() funcione en PaymentComponent.
          // Ajusta los campos según lo que devuelva tu backend:
          if (response) {
            this.authService.setSession(response as any);
          } else {
            this.authService.login();
          }

          this.login$.next(null);

          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Inicio de sesión exitoso',
            detail: 'Bienvenido nuevamente',
          });

          // ← Redirige a donde el usuario quería ir (ej: /payment)
          // en vez del '/' fijo de antes
          this.router.navigateByUrl(returnUrl);
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