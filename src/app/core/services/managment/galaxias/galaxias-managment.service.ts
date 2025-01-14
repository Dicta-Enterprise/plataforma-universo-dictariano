import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { GalaxiaManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root'
})
export class GalaxiasManagmentService {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarGalaxiasService$() {}

  obtenerGalaxiaService$(id: number) {}

  crearGalaxiaService$(galaxia: GalaxiaManagment) {}

  editarGalaxiaService$(galaxia: GalaxiaManagment) {}

  eliminarGalaxiaService$(id: number) {}

  listarDropdownGalaxiasService$() {}
}
