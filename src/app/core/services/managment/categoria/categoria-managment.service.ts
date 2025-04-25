import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable, tap } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
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
        return response.data._value.map((categoria) => {
          return CategoriaManagment.fromJson(categoria);
        });
      })
    );
  }

  obtenerCategoriaService$(id: string): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${id}`;

    return this.httpClient.get<IGeneric<CategoriaManagment>>(url).pipe(
      map((response) => {
        return CategoriaManagment.fromJson(response.data._value);
      })
    );
  }




  crearCategoriaService$(
    Categoria: CategoriaManagment,
    imagen:File
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias`;
    const formData = new FormData();
    // Agregar campos del formulario
    formData.append('nombre', Categoria.nombre);
    formData.append('descripcion', Categoria.descripcion);
    // Agrega otros campos según tu DTO
    
    // Agregar archivo
    formData.append('file', imagen, imagen.name);

    return this.httpClient
      .post<IGeneric<CategoriaManagment>>(url, formData)
      .pipe(
        map((response) => {
          return CategoriaManagment.fromJson(response.data);
        })
      );
  }




  editarCategoriaService$(
    Categoria: CategoriaManagment,
    categoriaId: string
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


  eliminarCategoriaService$(id: string):Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${id}`;
    return this.httpClient.delete<IGeneric<CategoriaManagment>>(url).pipe(
      map((response) => {
        return CategoriaManagment.fromJson(response.data._value);
      })
    );
  }

  listarDropdownCategoriasService$() {}
}
