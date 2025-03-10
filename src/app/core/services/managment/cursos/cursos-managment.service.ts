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
    return this.httpClient.get<{data: any[]}>(`${this.base_url}cursos`).pipe(
      map(response => response.data.map(curso => CursoManagment.fromJson(curso)))
    );
  }

  obtenerCursoService$(id: string): Observable<CursoManagment> {
    return this.httpClient.get<{data: any}>(`${this.base_url}cursos/${id}`).pipe(
      map(response => response.data)
    );
  }

  crearCursoService$(curso: CursoManagment): Observable<CursoManagment> {
    return this.httpClient.post<CursoManagment>(`${this.base_url}cursos`, curso);
  }

  // crearCursoService$(curso: CursoManagment): Observable<boolean> {
  //   return this.httpClient.post<{status: number; message: string; data: CursoManagment}>(`${this.base_url}cursos`, curso).pipe(
  //     map((res)=>{
  //       if(res.status === 200 || res.status === 201) return true;
  //       return false;
  //     }),
  //     catchError(()=> of(false))
  //   );
  // }

  editarCursoService$(id:string, curso: Partial<CursoManagment>): Observable<CursoManagment> {
    return this.httpClient.put<CursoManagment>(`${this.base_url}cursos/${id}`, curso);
  }

  eliminarCursoService$(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.base_url}cursos/${id}`);
  }

  listarDropdownCursosService$() {}
}
