import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'environments/environment';

import { RegisterRepository } from '../../repositories/managment/register.repository';
import { RegisterManagment } from '../../class/managment/managment';
import { IGeneric } from '../../interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterRepositoryImpl implements RegisterRepository {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  registrarUsuarioService(
    register: RegisterManagment
  ): Observable<RegisterManagment> {

    const url = `${this.base_url}auth/register`; 

    return this.httpClient.post<IGeneric<RegisterManagment>>(url, register).pipe(
        map((response) => {
          return RegisterManagment.fromJson(response.data);
        })
      );
  }
}
