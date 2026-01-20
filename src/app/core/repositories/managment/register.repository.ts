import { Observable } from 'rxjs';
import { Register } from '../../class/auth/register.class';

export interface RegisterRepository {
  registrarUsuarioService(
    register: Register
  ): Observable<Register>;
}
