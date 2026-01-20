import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REGISTER_REPOSITORY } from 'src/app/core/tokens/managment/register.token';
import { RegisterRepository } from 'src/app/core/repositories/managment/register.repository';
import { Register } from 'src/app/core/class/auth/register.class';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    @Inject(REGISTER_REPOSITORY)
    private readonly registerRepository: RegisterRepository
  ) {}

  registrarUsuario(register: Register): Observable<Register> {
    return this.registerRepository.registrarUsuarioService(register);
  }
}
