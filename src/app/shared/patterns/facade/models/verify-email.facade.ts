import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterFacade } from 'src/app/shared/patterns/facade/models/register-facade';
import { VerifyEmailService } from 'src/app/pages/auth/services/verify-email.service';

@Injectable({ providedIn: 'root' })
export class VerifyEmailFacade {
  loading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private readonly verifyEmailService: VerifyEmailService,
    private readonly registerFacade: RegisterFacade,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {}

  verificarEmail(code: string): void {
    const email = this.registerFacade.getEmail() 
    || sessionStorage.getItem('pendingVerifyEmail') || '';
    this.loading$.next(true);

    this.verifyEmailService.verificarEmail(email, code)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading$.next(false);
          this.registerFacade.clearEmail();
          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Correo verificado',
            detail: 'Tu cuenta está activa. Ya puedes iniciar sesión.',
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.loading$.next(false);
          const msg = error?.error?.message;

          if (msg?.includes('expirado') || msg?.includes('VERIFY_CODE_EXPIRED')) {
            this.messageService.add({
              key: 'global',
              severity: 'error',
              summary: 'Código expirado',
              detail: 'Tu registro ha expirado. Por favor regístrate nuevamente.',
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