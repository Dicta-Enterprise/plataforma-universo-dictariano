import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { PlanetaManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root',
})
export class PlanetasManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarPlanetasService$() {}

  obtenerPlanetaService$(id: number) {}

  crearPlanetaService$(planeta: PlanetaManagment) {}

  editarPlanetaService$(planeta: PlanetaManagment) {}

  eliminarPlanetaService$(id: number) {}

  listarDropdownPlanetasService$() {}
}
