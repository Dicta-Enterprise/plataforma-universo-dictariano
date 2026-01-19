import { Observable } from 'rxjs';
import { RegisterManagment } from '../../class/managment/managment';

export interface RegisterRepository {
  registrarUsuarioService(
    register: RegisterManagment
  ): Observable<RegisterManagment>;
}
