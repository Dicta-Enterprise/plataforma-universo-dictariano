import { map, Observable } from 'rxjs';
import { GalaxiaManagment } from '../../class/managment/managment';
import { GalaxiaRepository } from '../../repositories/managment/galaxia.repository';
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

  listarGalaxiasService$(): Observable<GalaxiaManagment[]> {
    let url = `${this.base_url}galaxias`;
    return this.httpClient.get<IGenericArrays<GalaxiaManagment>>(url).pipe(
      map((response: IGenericArrays<GalaxiaManagment>) => {
        return response.data._value.map((galaxia) => {
          return GalaxiaManagment.fromJson(galaxia);
        });
      })
    );
  }

  obtenerGalaxiaService$(galaxiaId: string): Observable<GalaxiaManagment> {
    let url = `${this.base_url}galaxias/${galaxiaId}`;

    return this.httpClient.get<IGeneric<GalaxiaManagment>>(url).pipe(
      map((response) => {
        return GalaxiaManagment.fromJson(response.data);
      })
    );
  }

  crearGalaxiaService$(
    galaxia: GalaxiaManagment
  ): Observable<GalaxiaManagment> {

    console.log(galaxia);
    let url = `${this.base_url}galaxias`;
    return this.httpClient.post<IGeneric<GalaxiaManagment>>(url, galaxia).pipe(
      map((response) => {
        return GalaxiaManagment.fromJson(response.data);
      })
    );
  }

  editarGalaxiaService$(
    galaxia: GalaxiaManagment
  ): Observable<GalaxiaManagment> {
    let url = `${this.base_url}galaxias/${galaxia.id}`;

    return this.httpClient.patch<IGeneric<GalaxiaManagment>>(url, galaxia).pipe(
      map((response) => {
        return GalaxiaManagment.fromJson(response.data);
      })
    );
  }

  eliminarGalaxiaService$(galaxiaId: string): Observable<GalaxiaManagment> {
    return this.httpClient
      .delete<IGeneric<GalaxiaManagment>>(
        `${this.base_url}galaxias/${galaxiaId}`
      )
      .pipe(
        map((response) => {
          return GalaxiaManagment.fromJson(response.data);
        })
      );
  }
}
