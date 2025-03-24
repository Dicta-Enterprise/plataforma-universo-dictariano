import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { PlanetaManagment } from 'src/app/core/class/managment/managment';
import { IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanetasManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }

  listarPlanetasService$(): Observable<PlanetaManagment[]> {
    let url = `${this.base_url}planetas`;
    return this.httpClient.get<IGenericArrays<PlanetaManagment>>(url).pipe(
      map((response: IGenericArrays<PlanetaManagment>) => {
        response.data = response.data.map((planeta) => {
          return PlanetaManagment.fromJson(planeta);
        });

        return response.data;
      })
    );
  }

  obtenerPlanetaService$(id: number) { }

  crearPlanetaService$(planeta: PlanetaManagment) { }

  editarPlanetaService$(planeta: PlanetaManagment) { }

  eliminarPlanetaService$(id: number) { }

  listarDropdownPlanetasService$() { }
}
