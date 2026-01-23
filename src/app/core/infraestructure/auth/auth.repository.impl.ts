import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';

import { AuthRepository } from '../../repositories/auth/auth.repository';
import { AuthCredentials } from '../../class/auth/auth-credentials.class';
import { Register } from '../../class/auth/register.class';
import { Login } from '../../class/auth/login.class';
import { IGeneric } from '../../interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl implements AuthRepository {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  login(credentials: AuthCredentials): Observable<Login> {
    const url = `${this.base_url}auth/login`;

    return this.httpClient
      .post<IGeneric<Login>>(url, credentials)
      .pipe(
        map((response) => {
          return Login.fromJson(response.data);
        })
      );
  }

  register(credentials: AuthCredentials): Observable<Register> {
    const url = `${this.base_url}auth/register`;

    return this.httpClient
      .post<IGeneric<Register>>(url, credentials)
      .pipe(
        map((response) => {
          return Register.fromJson(response.data);
        })
      );
  }
  
}
