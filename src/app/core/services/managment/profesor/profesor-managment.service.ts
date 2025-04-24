import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';
import { ProfesorManagment } from 'src/app/core/class/managment/managment';
import { IGeneric, IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorManagmentService {

  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }


  listarProfesoresService$(): Observable<ProfesorManagment[]> {
    let url = `${this.base_url}profesor`;
    return this.httpClient.get<IGenericArrays<ProfesorManagment>>(url).pipe(
      map((response: IGenericArrays<ProfesorManagment>) => {
        response.data = response.data.map((curso) => {
          return ProfesorManagment.fromJson(curso);
        });
        return response.data;
      })
    );
  }


  obtenerProfesorService$(id: string): Observable<ProfesorManagment> {
    let url = `${this.base_url}profesor/${id}`;
    return this.httpClient.get<IGeneric<ProfesorManagment>>(url).pipe(
      map((response) => {
        return ProfesorManagment.fromJson(response.data);
      })
    );
  }


  crearProfesorService$(profesor: ProfesorManagment): Observable<ProfesorManagment> {
    let url = `${this.base_url}profesor`;
    return this.httpClient.post<IGeneric<ProfesorManagment>>(url, profesor).pipe(
      map((response) => {
        return ProfesorManagment.fromJson(response.data);
      })
    );
  }


  editarProfesorService$(id: string, profesor: Partial<ProfesorManagment>): Observable<ProfesorManagment> {
    let url = `${this.base_url}profesor/${id}`;
    return this.httpClient.patch<IGeneric<ProfesorManagment>>(url, profesor).pipe(
      map((response) => {
        return ProfesorManagment.fromJson(response.data);
      })
    );

  }


  eliminarProfesorService$(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.base_url}profesor/${id}`);
  }


  listarDropdownProfesoresService$() { }

}
