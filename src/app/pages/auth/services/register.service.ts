import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { REGISTER_REPOSITORY } from 'src/app/core/tokens/managment/register.token';
import { RegisterRepository } from 'src/app/core/repositories/managment/register.repository';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    @Inject(REGISTER_REPOSITORY)
    private readonly registerRepository: RegisterRepository
  ) {}

  registrarUsuario(payload: any): Observable<any> {
    return this.registerRepository.registrarUsuarioService(payload);
  }
}
