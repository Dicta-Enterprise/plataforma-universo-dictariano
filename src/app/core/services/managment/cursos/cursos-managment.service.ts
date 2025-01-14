import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CursoManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root'
})
export class CursosManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarCursosService$() {}

  obtenerCursoService$(id: number) {}

  crearCursoService$(Curso: CursoManagment) {}

  editarCursoService$(Curso: CursoManagment) {}

  eliminarCursoService$(id: number) {}

  listarDropdownCursosService$() {}
}
