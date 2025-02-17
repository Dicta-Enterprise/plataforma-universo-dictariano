import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { LandingPageManagment } from 'src/app/core/class/managment/landing-page/Landing-managment.class';

@Injectable({
  providedIn: 'root'
})
export class LandingPageManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarLandingService$(): Observable<LandingPageManagment[]> {
    return this.httpClient.get<any>(`${this.base_url}landing-page`).pipe(
      map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data.map((landing: any) => LandingPageManagment.fromJson(landing));
        } else {
          return [];
        }
      })
    );
  }

  obtenerLandingService$(id: string): Observable<LandingPageManagment> {
    return this.httpClient.get<any>(`${this.base_url}landing-page/${id}`).pipe(
      map(response => {
        if (response && response.data) {
          return LandingPageManagment.fromJson(response.data);
        } else {
          throw new Error('Landing no encontrada');
        }
      })
    );
  }
  
  crearLandingService$(landing: LandingPageManagment): Observable<LandingPageManagment> {
    return this.httpClient.post<LandingPageManagment>(`${this.base_url}landing-page`, landing);
  }

  editarLandingService$(landing: LandingPageManagment): Observable<LandingPageManagment> {
    return this.httpClient.patch<LandingPageManagment>(`${this.base_url}landing-page/${landing.id}`, landing);
  }

  eliminarLandingService$(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.base_url}landing-page/${id}`);
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