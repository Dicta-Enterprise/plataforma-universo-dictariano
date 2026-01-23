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

  private destroy$ = new Subject<void>();

  constructor(
    private readonly registerService: RegisterService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) { }

  registrarUsuario(register: Register) {
    this.registerService
      .registrarUsuario(register)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.register$.next(response);

          this.messageService.add({
             key: 'global',
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Tu cuenta fue creada correctamente',
          });

          this.router.navigate(['/auth/login']);
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

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


