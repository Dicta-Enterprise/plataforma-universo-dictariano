import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { CursoManagment } from 'src/app/core/class/managment/managment';
import { IGeneric, IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }

  listarCursosService$(): Observable<CursoManagment[]> {
    let url = `${this.base_url}cursos`;
    return this.httpClient.get<IGenericArrays<CursoManagment>>(url).pipe(
      map((response: IGenericArrays<CursoManagment>) => {
        response.data = response.data.map((curso) => {
          return CursoManagment.fromJson(curso);
        });
        return response.data;
      })
    );
  }

  obtenerCursoService$(id: string): Observable<CursoManagment> {
    let url = `${this.base_url}cursos/${id}`;
    return this.httpClient.get<IGeneric<CursoManagment>>(url).pipe(
      map((response) => {
        return CursoManagment.fromJson(response.data);
      })
    );
  }

  crearCursoService$(curso: CursoManagment): Observable<CursoManagment> {
    let url = `${this.base_url}cursos`;
    return this.httpClient.post<IGeneric<CursoManagment>>(url, curso).pipe(
      map((response) => {
        return CursoManagment.fromJson(response.data);
      })
    );
  }

  editarCursoService$(id: string, curso: Partial<CursoManagment>): Observable<CursoManagment> {
    let url = `${this.base_url}cursos/${id}`;
    return this.httpClient.patch<IGeneric<CursoManagment>>(url, curso).pipe(
      map((response) => {
        return CursoManagment.fromJson(response.data);
      })
    );
  }

  eliminarCursoService$(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.base_url}cursos/${id}`);
  }

  listarDropdownCursosService$() { }
}
