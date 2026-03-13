import { map, Observable } from 'rxjs';
import { Galaxias } from '../../class/models';
import { GalaxiaRepository } from '../../repositories/models/galaxia.repository';
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
export class GalaxiaRepositoryImpl implements GalaxiaRepository {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarGalaxiasService$(): Observable<Galaxias[]> {
    let url = `${this.base_url}galaxias`;
    return this.httpClient.get<IGenericArrays<Galaxias>>(url).pipe(
      map((response: IGenericArrays<Galaxias>) => {
        return response.data._value.map((galaxia) => {
          return Galaxias.fromJson(galaxia);
        });
      })
    );
  }

  obtenerGalaxiaService$(galaxiaId: string): Observable<Galaxias> {
    let url = `${this.base_url}galaxias/${galaxiaId}`;

    return this.httpClient.get<IGeneric<Galaxias>>(url).pipe(
      map((response) => {
        return Galaxias.fromJson(response.data);
      })
    );
  }

  crearGalaxiaService$(
    galaxia: Galaxias
  ): Observable<Galaxias> {

    console.log(galaxia);
    let url = `${this.base_url}galaxias`;
    return this.httpClient.post<IGeneric<Galaxias>>(url, galaxia).pipe(
      map((response) => {
        return Galaxias.fromJson(response.data);
      })
    );
  }

  editarGalaxiaService$(
    galaxia: Galaxias
  ): Observable<Galaxias> {
    let url = `${this.base_url}galaxias/${galaxia.id}`;

    return this.httpClient.patch<IGeneric<Galaxias>>(url, galaxia).pipe(
      map((response) => {
        return Galaxias.fromJson(response.data);
      })
    );
  }

  eliminarGalaxiaService$(galaxiaId: string): Observable<Galaxias> {
    return this.httpClient
      .delete<IGeneric<Galaxias>>(
        `${this.base_url}galaxias/${galaxiaId}`
      )
      .pipe(
        map((response) => {
          return Galaxias.fromJson(response.data);
        })
      );
  }
}
