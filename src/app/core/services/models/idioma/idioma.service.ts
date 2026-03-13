import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Idioma } from 'src/app/core/class/models';
import {
  IGeneric,
  IGenericArrays,
} from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class IdiomaService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarIdiomasService$(): Observable<Idioma[]> {
    let url = `${this.base_url}idiomas`;
    return this.httpClient.get<IGenericArrays<Idioma>>(url).pipe(
      map((response: IGenericArrays<Idioma>) => {
        return response.data._value.map((idioma) => {
          return Idioma.fromJson(idioma);
        });
      })
    );
  }

  obtenerIdiomaService$(id: string): Observable<Idioma> {
    let url = `${this.base_url}idiomas/${id}`;

    return this.httpClient.get<IGeneric<Idioma>>(url).pipe(
      map((response) => {
        return Idioma.fromJson(response.data);
      })
    );
  }

  crearIdiomaService$(idioma: Idioma): Observable<Idioma> {
    let url = `${this.base_url}idiomas`;

    return this.httpClient.post<IGeneric<Idioma>>(url, idioma).pipe(
      map((response) => {
        return Idioma.fromJson(response.data);
      })
    );
  }

  editarIdiomaService$(
    idioma: Idioma,
    idiomaId: string
  ): Observable<Idioma> {
    let url = `${this.base_url}idiomas/${idiomaId}`;

    return this.httpClient.patch<IGeneric<Idioma>>(url, idioma).pipe(
      map((response) => {
        return Idioma.fromJson(response.data);
      })
    );
  }

  eliminarIdiomaService$(id: string): Observable<boolean> {
    return this.httpClient
      .delete<{ status: number }>(`${this.base_url}idiomas/${id}`)
      .pipe(
        map((response) => response.status === 200 || response.status === 204),
        catchError((error) => {
          console.error('Error al eliminar idioma:', error);
          return throwError(() => new Error('Error al eliminar el idioma'));
        })
      );
  }

  listarDropdownIdiomasService$() {}
}
