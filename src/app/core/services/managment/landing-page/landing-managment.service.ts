import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';
import { IGeneric, IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root'
})
export class LandingPageManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }

  listarLandingService$(): Observable<LandingPageManagment[]> {
    let url = `${this.base_url}landing-page`;
    return this.httpClient.get<IGenericArrays<LandingPageManagment>>(url).pipe(
      map((response: IGenericArrays<LandingPageManagment>) => {
        response.data = response.data.map((landing) => {
          return LandingPageManagment.fromJson(landing);
        });

        return response.data;
      })
    );
  }

  obtenerLandingService$(id: string): Observable<LandingPageManagment> {
    let url = `${this.base_url}landing-page/${id}`

    return this.httpClient.get<IGeneric<LandingPageManagment>>(url).pipe(
      map(response => {
        return LandingPageManagment.fromJson(response.data);
      })
    );
  }

  crearLandingService$(
    Landing: LandingPageManagment
  ): Observable<LandingPageManagment> {
    let url = `${this.base_url}landing-page`;

    return this.httpClient
      .post<IGeneric<LandingPageManagment>>(url, Landing)
      .pipe(
        map((response) => {
          return LandingPageManagment.fromJson(response.data);
        })
      )
  }

  editarLandingService$(
    Landing: LandingPageManagment,
    landingId: string
  ): Observable<LandingPageManagment> {
    let url = `${this.base_url}landing-page/${landingId}`;

    return this.httpClient
      .patch<IGeneric<LandingPageManagment>>(url, Landing)
      .pipe(
        map((response) => {
          return LandingPageManagment.fromJson(response.data);
        })
      )
  }

  eliminarLandingService$(id: string): Observable<boolean> {
    return this.httpClient.delete<{ status: number }>(`${this.base_url}landing-page/${id}`).pipe(
      map(response => response.status === 200 || response.status === 204),
      catchError(error => {
        console.error('Error al eliminar landing:', error);
        return throwError(() => new Error('Error al eliminar la landing page'));
      })
    );
  }

  /*listarDropdownLandingService$(): Observable<any[]> {
    return this.httpClient.get<any>(`${this.base_url}landing-page`).pipe(
      map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data.map((landing: any) => ({
            label: landing.titulo, // Por ejemplo, mostrar el título en el dropdown
            value: landing.id      // Valor que se usará cuando se seleccione
          }));
        } else {
          return [];
        }
      })
    );
  }  */
}