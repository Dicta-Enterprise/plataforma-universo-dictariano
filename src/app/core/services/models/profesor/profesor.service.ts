import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Profesor } from 'src/app/core/class/models';
import {
  IGeneric,
  IGenericArrays,
} from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarProfesoresService$(): Observable<Profesor[]> {
    let url = `${this.base_url}profesor`;
    return this.httpClient.get<IGenericArrays<Profesor>>(url).pipe(
      map((response: IGenericArrays<Profesor>) => {
        return response.data._value.map((curso) => {
          return Profesor.fromJson(curso);
        });
      })
    );
  }

  obtenerProfesorService$(id: string): Observable<Profesor> {
    let url = `${this.base_url}profesor/${id}`;
    return this.httpClient.get<IGeneric<Profesor>>(url).pipe(
      map((response) => {
        return Profesor.fromJson(response.data);
      })
    );
  }

  crearProfesorService$(
    profesor: Profesor
  ): Observable<Profesor> {
    let url = `${this.base_url}profesor`;
    return this.httpClient
      .post<IGeneric<Profesor>>(url, profesor)
      .pipe(
        map((response) => {
          return Profesor.fromJson(response.data);
        })
      );
  }

  editarProfesorService$(
    id: string,
    profesor: Partial<Profesor>
  ): Observable<Profesor> {
    let url = `${this.base_url}profesor/${id}`;
    return this.httpClient
      .patch<IGeneric<Profesor>>(url, profesor)
      .pipe(
        map((response) => {
          return Profesor.fromJson(response.data);
        })
      );
  }

  eliminarProfesorService$(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.base_url}profesor/${id}`);
  }

  listarDropdownProfesoresService$() {}
}
