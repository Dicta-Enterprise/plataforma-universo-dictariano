import { Observable } from 'rxjs';
import { AuthCredentials } from '../../class/auth/auth-credentials.class';
import { Register } from '../../class/auth/register.class';
import { LoginResponse } from '../../class/auth/login.response.class';

export interface AuthRepository {
  login(credentials: AuthCredentials): Observable<LoginResponse>;
  register(credentials: AuthCredentials): Observable<Register>;
}

