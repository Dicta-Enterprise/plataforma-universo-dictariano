import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterFacade } from 'src/app/shared/patterns/facade/models/register-facade';
import { VerifyEmailService } from 'src/app/pages/auth/services/verify-email.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { LoginService } from 'src/app/pages/auth/services/login.service';
import { Login } from 'src/app/core/class/auth/login.class';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';

@Injectable({ providedIn: 'root' })
export class VerifyEmailFacade {
  loading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private readonly verifyEmailService: VerifyEmailService,
    private readonly registerFacade: RegisterFacade,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
    private readonly cartService: CartService,
    private readonly cursosService: CursosService,
  ) {}

  verificarEmail(code: string): void {
    const email =
      this.registerFacade.getEmail() ||
      sessionStorage.getItem('pendingVerifyEmail') ||
      '';
    const password = sessionStorage.getItem('pendingRegisterPassword') || '';

    this.loading$.next(true);

    this.verifyEmailService
      .verificarEmail(email, code)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.registerFacade.clearEmail();
          sessionStorage.removeItem('pendingVerifyEmail');
          sessionStorage.removeItem('verifyCodeSentAt');
          sessionStorage.removeItem('pendingRegisterPassword');

          const credencialesLogin = new Login({ email, password });

          this.loginService
            .iniciarSesion(credencialesLogin)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: () => {
                this.loading$.next(false);
                this.authService.login();

                const isCarrito =
                  sessionStorage.getItem('isCarrito') === 'true';
                const cursoId = sessionStorage.getItem('pendingCursoId');

                if (isCarrito && cursoId) {
                  sessionStorage.removeItem('isCarrito');
                  sessionStorage.removeItem('pendingCursoId');

                  this.cursosService
                    .listarCursosService$()
                    .pipe(takeUntil(this.destroy$))
                    .subscribe({
                      next: (cursos) => {
                        const cursoEncontrado = cursos.find(
                          (c) => String(c.id) === String(cursoId),
                        );
                        if (cursoEncontrado) {
                          this.cartService.addToCart(cursoEncontrado);
                        }
                        this.router.navigate(['/cart']);
                      },
                      error: () => {
                        this.router.navigate(['/cart']);
                      },
                    });
                } else {
                  this.router.navigate(['/']);
                }

                this.messageService.add({
                  key: 'global',
                  severity: 'success',
                  summary: '¡Cuenta verificada!',
                  detail: 'Has iniciado sesión exitosamente.',
                });
              },
              error: () => {
                this.loading$.next(false);
                this.router.navigate(['/auth/login']);
              },
            });
        },
        error: (error) => {
          this.loading$.next(false);
          const msg = error?.error?.message;

          if (
            msg?.includes('expirado') ||
            msg?.includes('VERIFY_CODE_EXPIRED')
          ) {
            this.messageService.add({
              key: 'global',
              severity: 'error',
              summary: 'Código expirado',
              detail:
                'Tu registro ha expirado. Por favor regístrate nuevamente.',
            });
            this.registerFacade.clearEmail();
            this.router.navigate(['/auth/register']);
            return;
          }

          if (msg?.includes('TOO_MANY_ATTEMPTS')) {
            this.messageService.add({
              key: 'global',
              severity: 'error',
              summary: 'Demasiados intentos',
              detail: 'Por favor regístrate nuevamente.',
            });
            this.registerFacade.clearEmail();
            this.router.navigate(['/auth/register']);
            return;
          }

          this.messageService.add({
            key: 'global',
            severity: 'warn',
            summary: 'Código inválido',
            detail: msg || 'El código ingresado no es correcto',
          });
        },
      });
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
