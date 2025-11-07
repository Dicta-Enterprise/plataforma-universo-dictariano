import { map, Observable } from 'rxjs';
import { CursoManagment } from '../../class/managment/managment';
import { CursoRepository } from '../../repositories/managment/curso.repository';
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

  listarCursosService$(): Observable<CursoManagment[]> {
    const url = `${this.base_url}cursos`;
    return this.httpClient.get<IGenericArrays<CursoManagment>>(url).pipe(
      map((response: IGenericArrays<CursoManagment>) => {
        return response.data._value.map((curso) => {
          return CursoManagment.fromJson(curso);
        });
      })
    );
  }

  obtenerCursoService$(galaxiaId: string): Observable<CursoManagment> {
    const url = `${this.base_url}cursos/${galaxiaId}`;

    return this.httpClient.get<IGeneric<CursoManagment>>(url).pipe(
      map((response) => {
        return CursoManagment.fromJson(response.data);
      })
    );
  }

  crearCursoService$(
    curso: CursoManagment
  ): Observable<CursoManagment> {

    const url = `${this.base_url}cursos`;
    return this.httpClient.post<IGeneric<CursoManagment>>(url, curso).pipe(
      map((response) => {
        return CursoManagment.fromJson(response.data);
      })
    );
  }

  editarCursoService$(
    curso: CursoManagment
  ): Observable<CursoManagment> {
    const url = `${this.base_url}cursos/${curso.id}`;

    return this.httpClient.patch<IGeneric<CursoManagment>>(url, curso).pipe(
      map((response) => {
        return CursoManagment.fromJson(response.data);
      })
    );
  }

  eliminarCursoService$(cursoId: string): Observable<CursoManagment> {
    return this.httpClient
      .delete<IGeneric<CursoManagment>>(
        `${this.base_url}cursos/${cursoId}`
      )
      .pipe(
        map((response) => {
          return CursoManagment.fromJson(response.data);
        })
      );
  }
}
