import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import {
  CategoriaManagment,
  CursoManagment,
} from 'src/app/core/class/managment/managment';
import {
  IGeneric,
  IGenericArrays,
} from 'src/app/core/interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(private httpClient: HttpClient) {}

  listarCategoriasService$(): Observable<CategoriaManagment[]> {
    let url = `${this.base_url}categorias`;
    return this.httpClient.get<IGenericArrays<CategoriaManagment>>(url).pipe(
      map((response: IGenericArrays<CategoriaManagment>) => {
        response.data = response.data.map((categoria) => {
          return CategoriaManagment.fromJson(categoria);
        });

        return response.data;
      })
    );
  }

  obtenerCategoriaService$(id: string): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${id}`;

    return this.httpClient.get<IGeneric<CategoriaManagment>>(url).pipe(
      map((response) => {
        return CategoriaManagment.fromJson(response.data);
      })
    );
  }

  crearCategoriaService$(
    Categoria: CategoriaManagment
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias`;

    return this.httpClient
      .post<IGeneric<CategoriaManagment>>(url, Categoria)
      .pipe(
        map((response) => {
          return CategoriaManagment.fromJson(response.data);
        })
      );
  }

  editarCategoriaService$(
    Categoria: CategoriaManagment,
    categoriaId:string
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${categoriaId}`;

    return this.httpClient
      .patch<IGeneric<CategoriaManagment>>(url, Categoria)
      .pipe(
        map((response) => {
          return CategoriaManagment.fromJson(response.data);
        })
      );
  }

  eliminarCategoriaService$(id: number) {}

  listarDropdownCategoriasService$() {}
}
