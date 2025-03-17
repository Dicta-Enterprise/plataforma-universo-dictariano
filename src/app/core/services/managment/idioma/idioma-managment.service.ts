import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IdiomaManagment } from 'src/app/core/class/managment/managment';
import { IGenericArrays } from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class IdiomaManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) { }

  listarIdiomasService$(): Observable<IdiomaManagment[]> {
    let url = `${this.base_url}idiomas`;
    return this.httpClient.get<IGenericArrays<IdiomaManagment>>(url).pipe(
      map((response: IGenericArrays<IdiomaManagment>) => {
        response.data = response.data.map((idioma) => {
          return IdiomaManagment.fromJson(idioma);
        });

        return response.data;
      })
    );
  }

  obtenerIdiomaService$(id: number) { }

  crearIdiomaService$(idioma: IdiomaManagment) { }

  editarIdiomaService$(idioma: IdiomaManagment) { }

  eliminarIdiomaService$(id: string): Observable<boolean> {
    return this.httpClient.delete<{ status: number }>(`${this.base_url}idiomas/${id}`).pipe(
      map(response => response.status === 200 || response.status === 204),
      catchError(error => {
        console.error('Error al eliminar idioma:', error);
        return throwError(() => new Error('Error al eliminar el idioma'));
      })
    );
  }

  listarDropdownIdiomasService$() { }
}
