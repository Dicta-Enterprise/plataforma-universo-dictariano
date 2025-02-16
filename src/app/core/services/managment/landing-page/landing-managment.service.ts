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

  listarLandingService$(): Observable<LandingPageManagment[]>  {
    return this.httpClient.get<any[]>(`${this.base_url}landing`).pipe(
      map(response => response.map(landing => LandingPageManagment.fromJson(landing)))
    );
  }

  obtenerLandingService$(id: number) {}

  crearLandingService$(landing: LandingPageManagment): Observable<LandingPageManagment> {
    return this.httpClient.post<LandingPageManagment>(`${this.base_url}landing`, landing);
  }

  editarLandingService$(landing: LandingPageManagment) {}

  eliminarLandingService$(id: number) {}

  listarDropdownLandingService$() {}
}
