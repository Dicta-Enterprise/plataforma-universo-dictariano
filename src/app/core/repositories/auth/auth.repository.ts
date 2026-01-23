import { Observable } from 'rxjs';
import { AuthCredentials } from '../../class/auth/auth-credentials.class';
import { Register } from '../../class/auth/register.class';
import { Login } from '../../class/auth/login.class';

export interface AuthRepository {
  login(credentials: AuthCredentials): Observable<Login>;
  register(credentials: AuthCredentials): Observable<Register>;
}
