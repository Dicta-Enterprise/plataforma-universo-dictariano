import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/core/class/auth/register.class';
import { AuthRepository } from 'src/app/core/repositories/auth/auth.repository';
import { AUTH_REPOSITORY } from 'src/app/core/tokens/auth/auth.token';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository
  ) {}

  registrarUsuario(register: Register): Observable<Register> {
    return this.authRepository.register(register);
  }
}

