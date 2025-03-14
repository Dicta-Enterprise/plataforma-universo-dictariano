import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root'
})
export class GalaxiasManagmentService {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }

  listarGalaxiasService$(): Observable<GalaxiaManagment[]> {
    let url = `${this.base_url}galaxias`;
    return this.httpClient.get<IGenericArrays<GalaxiaManagment>>(url).pipe(
      map((response: IGenericArrays<GalaxiaManagment>) => {
        response.data = response.data.map((galaxia) => {
          return GalaxiaManagment.fromJson(galaxia);
        });

        return response.data;
      })
    );
  }

  obtenerGalaxiaService$(id: number) { }

  crearGalaxiaService$(galaxia: GalaxiaManagment) { }

  editarGalaxiaService$(galaxia: GalaxiaManagment) { }

  eliminarGalaxiaService$(id: string): Observable<boolean> {
    return this.httpClient.delete<{ status: number }>(`${this.base_url}galaxias/${id}`).pipe(
      map(response => response.status === 200 || response.status === 204),
      catchError(error => {
        console.error('Error al eliminar galaxia:', error);
        return throwError(() => new Error('Error al eliminar la galaxia'));
      })
    );

  }

  listarDropdownGalaxiasService$() { }
}
