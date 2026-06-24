import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ForgotPasswordService } from 'src/app/pages/auth/services/forgot-password.service';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordFacade {
  // Email compartido entre los 3 pasos
  private emailSubject = new BehaviorSubject<string>('');
  public email$ = this.emailSubject.asObservable();

  // Código compartido entre pasos 2 y 3
  private codeSubject = new BehaviorSubject<string>('');
  public code$ = this.codeSubject.asObservable();

  loading$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<void>();

  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {}

  solicitarCodigo(email: string): void {
    this.loading$.next(true);
    this.forgotPasswordService.solicitarCodigo(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.emailSubject.next(email);
          this.loading$.next(false);
          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Código enviado',
            detail: 'Revisa tu correo electrónico',
          });
          this.router.navigate(['/auth/forgot-password/verify-code']);
        },
        error: (error) => {
          this.loading$.next(false);
          this.messageService.add({
            key: 'global',
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'No se pudo enviar el código',
          });
        },
      });
  }

  verificarCodigo(code: string): void {
    const email = this.emailSubject.value;
    this.loading$.next(true);
    this.forgotPasswordService.verificarCodigo(email, code)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.codeSubject.next(code);
          this.loading$.next(false);
          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Código válido',
            detail: 'Ahora puedes cambiar tu contraseña',
          });
          this.router.navigate(['/auth/forgot-password/reset-password']);
        },
        error: (error) => {
          this.loading$.next(false);
          const msg = error?.error?.message;
          this.messageService.add({
            key: 'global',
            severity: 'warn',
            summary: 'Código inválido',
            detail: msg || 'El código ingresado no es correcto',
          });
        },
      });
  }

  resetPassword(newPassword: string, confirmPassword: string): void {
    const email = this.emailSubject.value;
    const code = this.codeSubject.value;
    this.loading$.next(true);
    this.forgotPasswordService.resetPassword(email, code, newPassword, confirmPassword)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loading$.next(false);
          this.emailSubject.next('');
          this.codeSubject.next('');
          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Contraseña actualizada',
            detail: 'Ya puedes iniciar sesión con tu nueva contraseña',
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.loading$.next(false);
          this.messageService.add({
            key: 'global',
            severity: 'error',
            summary: 'Error',
            detail: error?.error?.message || 'No se pudo actualizar la contraseña',
          });
        },
      });
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}