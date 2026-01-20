import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';

import { RegisterRepository } from '../../repositories/managment/register.repository';
import { Register } from '../../class/auth/register.class';
import { IGeneric } from '../../interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterRepositoryImpl implements RegisterRepository {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  registrarUsuarioService(
    register: Register
  ): Observable<Register> {

    const url = `${this.base_url}auth/register`; 

    return this.httpClient.post<IGeneric<Register>>(url, register).pipe(
        map((response) => {
          return Register.fromJson(response.data);
        })
      );
  }
}
