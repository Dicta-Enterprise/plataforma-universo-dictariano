import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Register } from 'src/app/core/class/auth/register.class';
import { RegisterService } from 'src/app/pages/auth/services/register.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {
  register$ = new BehaviorSubject<Register>(new Register());
  private emailSubject = new BehaviorSubject<string>(''); 
  public email$ = this.emailSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(
    private readonly registerService: RegisterService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  registrarUsuario(register: Register): void {
    this.registerService.registrarUsuario(register)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.register$.next(response);
          this.emailSubject.next(register.email);
          sessionStorage.setItem('pendingVerifyEmail', register.email);
          sessionStorage.setItem('verifyCodeSentAt', Date.now().toString());
          this.messageService.add({
            key: 'global',
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Te enviamos un código de verificación a tu correo',
          });

          this.router.navigate(['/auth/verify-email']);
        },
        error: (error) => {
          const backendMessage = error?.error?.message;

          if (backendMessage === 'El correo ya está registrado') {
            this.messageService.add({
              key: 'global',
              severity: 'warn',
              summary: 'Correo no válido',
              detail: 'El correo ya está registrado.',
            });
            return;
          }

          this.messageService.add({
            severity: 'error',
            key: 'global',
            summary: 'Error en el registro',
            detail: backendMessage || 'Ocurrió un error al registrar',
          });
        },
      });
  }

  getEmail(): string {
    return this.emailSubject.value || sessionStorage.getItem('pendingVerifyEmail') || '';
  }

  clearEmail(): void {
    this.emailSubject.next('');
    sessionStorage.removeItem('pendingVerifyEmail');
    sessionStorage.removeItem('verifyCodeSentAt');
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}