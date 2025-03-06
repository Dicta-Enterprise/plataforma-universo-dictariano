import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';

@Injectable({
  providedIn: 'root'
})
export class LandingPageManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }

  listarLandingService$(): Observable<LandingPageManagment[]> {
    return this.httpClient.get<{ data?: Partial<LandingPageManagment>[] }>(`${this.base_url}landing-page`).pipe(
      map(response => response.data?.map(landing => LandingPageManagment.fromJson(landing)) ?? [])
    );
  }

  obtenerLandingService$(id: string): Observable<LandingPageManagment> {
    return this.httpClient.get<{ data?: Partial<LandingPageManagment> }>(`${this.base_url}landing-page/${id}`).pipe(
      map(response => {
        if (!response.data) {
          throw new Error('Landing no encontrada');
        }
        return LandingPageManagment.fromJson(response.data);
      })
    );
  }

  crearLandingService$(landing: LandingPageManagment): Observable<any> {
    return this.httpClient.post<{ status: number; data: any }>(`${this.base_url}landing-page`,
      LandingPageManagment.toJson(landing)).pipe(
        map(response => {
          if (response?.status === 200 || response?.status === 201) {
            return response.data;
          }
          throw new Error('Respuesta inesperada del servidor');
        }),
        catchError(error => {
          console.error('Error al crear landing:', error);
          return throwError(() => error);
        })
      );
  }

  editarLandingService$(id: string, landingData: Partial<LandingPageManagment>): Observable<boolean> {
    return this.httpClient.patch<{ status: number }>(`${this.base_url}landing-page/${id}`, landingData).pipe(
      map(response => response?.status === 200 || response?.status === 201),
      catchError(error => {
        console.error('Error al editar landing:', error);
        return throwError(() => error);
      })
    );
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