import { Injectable } from '@angular/core';
import { CategoriaRepository } from '../../repositories/managment/categoria.repository';
import { map, Observable } from 'rxjs';
import { CategoriaManagment } from '../../class/managment/managment';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  IGeneric,
  IGenericArrays,
} from '../../interfaces/genericas/IGeneric.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaRepositoryImpl implements CategoriaRepository {
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

  obtenerCategoriaService$(
    categoriaId: string
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${categoriaId}`;

    return this.httpClient.get<IGeneric<CategoriaManagment>>(url).pipe(
      map((response) => {
        return CategoriaManagment.fromJson(response.data._value);
      })
    );
  }

  crearCategoriaService$(
    categoria: CategoriaManagment,
    imagen: File
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias`;
    const formData = new FormData();
    // Agregar campos del formulario
    formData.append('nombre', categoria.nombre);
    formData.append('descripcion', categoria.descripcion);
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
    categoria: CategoriaManagment
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${categoria.id}`;

    return this.httpClient
      .patch<IGeneric<CategoriaManagment>>(url, categoria)
      .pipe(
        map((response) => {
          return CategoriaManagment.fromJson(response.data);
        })
      );
  }

  eliminarCategoriaService$(
    categoriaId: string
  ): Observable<CategoriaManagment> {
    let url = `${this.base_url}categorias/${categoriaId}`;
    return this.httpClient.delete<IGeneric<CategoriaManagment>>(url).pipe(
      map((response) => {
        return CategoriaManagment.fromJson(response.data._value);
      })
    );
  }
}
