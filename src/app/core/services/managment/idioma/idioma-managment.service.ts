import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IdiomaManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root',
})
export class IdiomaManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarIdiomasService$() {}

  obtenerIdiomaService$(id: number) {}

  crearIdiomaService$(idioma: IdiomaManagment) {}

  editarIdiomaService$(idioma: IdiomaManagment) {}

  eliminarIdiomaService$(id: number) {}

  listarDropdownIdiomasService$() {}
}
