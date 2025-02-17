import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';

@Injectable({
  providedIn: 'root'
})
export class CursosManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarCursosService$(): Observable<CursoManagment[]>  {
    return this.httpClient.get<any[]>(`${this.base_url}cursos`).pipe(
      map(response => response.map(curso => CursoManagment.fromJson(curso)))
    );
  }

  obtenerCursoService$(id: number) {}

  crearCursoService$(curso: CursoManagment): Observable<CursoManagment> {
    return this.httpClient.post<CursoManagment>(`${this.base_url}cursos`, curso);
  }

  editarCursoService$(curso: CursoManagment): Observable<CursoManagment> {
    return this.httpClient.put<CursoManagment>(`${this.base_url}cursos/${curso.id}`, curso);
  }

  eliminarCursoService$(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.base_url}cursos/${id}`);
  }

  listarDropdownCursosService$() {}
}
