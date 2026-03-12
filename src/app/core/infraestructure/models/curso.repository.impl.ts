import { map, Observable } from 'rxjs';
import { Cursos } from '../../class/models';
import { CursoRepository } from '../../repositories/models/curso.repository';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  IGeneric,
  IGenericArrays,
} from '../../interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class CursoRepositoryImpl implements CursoRepository {
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

  obtenerCursoService$(galaxiaId: string): Observable<Cursos> {
    const url = `${this.base_url}cursos/${galaxiaId}`;

    return this.httpClient.get<IGeneric<Cursos>>(url).pipe(
      map((response) => {
        return Cursos.fromJson(response.data);
      })
    );
  }

  crearCursoService$(
    curso: Cursos
  ): Observable<Cursos> {

    const url = `${this.base_url}cursos`;
    return this.httpClient.post<IGeneric<Cursos>>(url, curso).pipe(
      map((response) => {
        return Cursos.fromJson(response.data);
      })
    );
  }

  editarCursoService$(
    curso: Cursos
  ): Observable<Cursos> {
    const url = `${this.base_url}cursos/${curso.id}`;

    return this.httpClient.patch<IGeneric<Cursos>>(url, curso).pipe(
      map((response) => {
        return Cursos.fromJson(response.data);
      })
    );
  }

  eliminarCursoService$(cursoId: string): Observable<Cursos> {
    return this.httpClient
      .delete<IGeneric<Cursos>>(
        `${this.base_url}cursos/${cursoId}`
      )
      .pipe(
        map((response) => {
          return Cursos.fromJson(response.data);
        })
      );
  }
}
