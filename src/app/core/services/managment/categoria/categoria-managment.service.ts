import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root',
})
export class CategoriaManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarCategoriasService$() {}

  obtenerCategoriaService$(id: number) {}

  crearCategoriaService$(Categoria: CategoriaManagment) {}

  editarCategoriaService$(Categoria: CategoriaManagment) {}

  eliminarCategoriaService$(id: number) {}

  listarDropdownCategoriasService$() {}
}
