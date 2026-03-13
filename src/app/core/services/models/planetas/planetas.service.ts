import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { Planetas } from 'src/app/core/class/models';
import { IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanetasService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarPlanetasService$(): Observable<Planetas[]> {
    let url = `${this.base_url}planetas`;
    return this.httpClient.get<IGenericArrays<Planetas>>(url).pipe(
      map((response: IGenericArrays<Planetas>) => {
        return response.data._value.map((planeta) => {
          return Planetas.fromJson(planeta);
        });
      })
    );
  }

  obtenerPlanetaService$(id: number) {}

  crearPlanetaService$(planeta: Planetas) {}

  editarPlanetaService$(planeta: Planetas) {}

  eliminarPlanetaService$(id: number) {}

  listarDropdownPlanetasService$() {}
}
