import { Injectable } from '@angular/core';
import { CategoriaRepository } from '../../repositories/models/categoria.repository';
import { map, Observable } from 'rxjs';
import { Categoria } from '../../class/models';
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

  listarCategoriasService$(): Observable<Categoria[]> {
    const url = `${this.base_url}categorias`;

    return this.httpClient.get<IGenericArrays<Categoria>>(url).pipe(
      map((response: IGenericArrays<Categoria>) => {
        return response.data._value.map((categoria) => {
          return Categoria.fromJson(categoria);
        });
      })
    );
  }

  obtenerCategoriaService$(
    categoriaId: string
  ): Observable<Categoria> {
    const url = `${this.base_url}categorias/${categoriaId}`;

    return this.httpClient.get<IGeneric<Categoria>>(url).pipe(
      map((response) => {
        return Categoria.fromJson(response.data._value);
      })
    );
  }

  crearCategoriaService$(
    categoria: Categoria,
    imagen: File
  ): Observable<Categoria> {
    const url = `${this.base_url}categorias`;
    const formData = new FormData();
    // Agregar campos del formulario
    formData.append('nombre', categoria.nombre);
    formData.append('descripcion', categoria.descripcion);
    // Agrega otros campos según tu DTO

    // Agregar archivo
    formData.append('file', imagen, imagen.name);

    return this.httpClient
      .post<IGeneric<Categoria>>(url, formData)
      .pipe(
        map((response) => {
          return Categoria.fromJson(response.data);
        })
      );
  }

  editarCategoriaService$(
    categoria: Categoria
  ): Observable<Categoria> {
    const url = `${this.base_url}categorias/${categoria.id}`;

    return this.httpClient
      .patch<IGeneric<Categoria>>(url, categoria)
      .pipe(
        map((response) => {
          return Categoria.fromJson(response.data);
        })
      );
  }

  eliminarCategoriaService$(
    categoriaId: string
  ): Observable<Categoria> {
    const url = `${this.base_url}categorias/${categoriaId}`;
    return this.httpClient.delete<IGeneric<Categoria>>(url).pipe(
      map((response) => {
        return Categoria.fromJson(response.data._value);
      })
    );
  }
}
