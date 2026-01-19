import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegisterManagment } from 'src/app/core/class/managment/managment';
import { RegisterService } from 'src/app/pages/auth/services/register.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {
  registers$ = new BehaviorSubject<RegisterManagment[]>([]);
  register$ = new BehaviorSubject<RegisterManagment>(new RegisterManagment());

  constructor(private readonly registerService: RegisterService) {}

  registrarUsuario(register: RegisterManagment) {
    this.registerService
      .registrarUsuario(register)
      .subscribe((register) =>
        this.register$.next(RegisterManagment.fromJson(register))
      );
  }
}
