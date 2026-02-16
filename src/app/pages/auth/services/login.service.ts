import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/core/class/auth/login.class';
import { LoginResponse } from 'src/app/core/class/auth/login.response.class';
import { AuthRepository } from 'src/app/core/repositories/auth/auth.repository';
import { AUTH_REPOSITORY } from 'src/app/core/tokens/auth/auth.token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: AuthRepository
  ) {}

  iniciarSesion(login: Login): Observable<LoginResponse> {
    return this.authRepository.login(login);
  }
}
