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
  ) {}

  registrarUsuario(register: Register) {
    this.registerService
      .registrarUsuario(register)
      .pipe(takeUntil(this.destroy$))
      .subscribe((register) =>
        this.register$.next(register)
      );
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


