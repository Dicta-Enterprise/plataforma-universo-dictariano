import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Cursos } from 'src/app/core/class/models';
import {
  IGeneric,
  IGenericArrays,
} from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarCursosService$(): Observable<Cursos[]> {
    const url = `${this.base_url}cursos`;
    return this.httpClient.get<IGenericArrays<Cursos>>(url).pipe(
      map((response: IGenericArrays<Cursos>) => {
        return response.data._value.map((curso) => {
          return Cursos.fromJson(curso);
        });
      })
    );
  }

  obtenerCursoService$(id: string): Observable<Cursos> {
    const url = `${this.base_url}cursos/${id}`;
    return this.httpClient.get<IGeneric<Cursos>>(url).pipe(
      map((response) => {
        return Cursos.fromJson(response.data);
      })
    );
  }

  crearCursoService$(curso: Cursos): Observable<Cursos> {
    const url = `${this.base_url}cursos`;
    return this.httpClient.post<IGeneric<Cursos>>(url, curso).pipe(
      map((response) => {
        return Cursos.fromJson(response.data);
      })
    );
  }

  editarCursoService$(
    id: string,
    curso: Partial<Cursos>
  ): Observable<Cursos> {
    const url = `${this.base_url}cursos/${id}`;
    return this.httpClient.patch<IGeneric<Cursos>>(url, curso).pipe(
      map((response) => {
        return Cursos.fromJson(response.data);
      })
    );
  }

  eliminarCursoService$(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.base_url}cursos/${id}`);
  }

}
