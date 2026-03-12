import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaRepository } from 'src/app/core/repositories/models/categoria.repository';
import { CATEGORIA_REPOSITORY } from 'src/app/core/tokens/models/categoria.token';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private base_url = environment.URL_BACKEND;

  constructor(
    @Inject(CATEGORIA_REPOSITORY)
    private readonly categoriaRepository: CategoriaRepository,
    private httpClient: HttpClient
  ) {}

  listarCategoriasService$(): Observable<Categoria[]> {
    return this.categoriaRepository.listarCategoriasService$();
  }

  obtenerCategoriaService$(id: string): Observable<Categoria> {
    return this.categoriaRepository.obtenerCategoriaService$(id);
  }

  crearCategoriaService$(
    Categoria: Categoria,
    imagen: File
  ): Observable<Categoria> {
    return this.categoriaRepository.crearCategoriaService$(Categoria, imagen);
  }

  editarCategoriaService$(
    Categoria: Categoria
  ): Observable<Categoria> {
    return this.categoriaRepository.editarCategoriaService$(Categoria);
  }

  eliminarCategoriaService$(id: string): Observable<Categoria> {
    return this.categoriaRepository.eliminarCategoriaService$(id);
  }

  listarDropdownCategoriasService$() {}
}
