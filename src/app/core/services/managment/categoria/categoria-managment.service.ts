import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CategoriaManagment } from 'src/app/core/class/managment/managment';
import { CategoriaRepository } from 'src/app/core/repositories/managment/categoria.repository';
import { CATEGORIA_REPOSITORY } from 'src/app/core/tokens/managment/categoria.token';

@Injectable({
  providedIn: 'root',
})
export class CategoriaManagmentService {
  private base_url = environment.URL_BACKEND;

  constructor(
    @Inject(CATEGORIA_REPOSITORY)
    private readonly categoriaRepository: CategoriaRepository,
    private httpClient: HttpClient
  ) {}

  listarCategoriasService$(): Observable<CategoriaManagment[]> {
    return this.categoriaRepository.listarCategoriasService$();
  }

  obtenerCategoriaService$(id: string): Observable<CategoriaManagment> {
    return this.categoriaRepository.obtenerCategoriaService$(id);
  }

  crearCategoriaService$(
    Categoria: CategoriaManagment,
    imagen: File
  ): Observable<CategoriaManagment> {
    return this.categoriaRepository.crearCategoriaService$(Categoria, imagen);
  }

  editarCategoriaService$(
    Categoria: CategoriaManagment
  ): Observable<CategoriaManagment> {
    return this.categoriaRepository.editarCategoriaService$(Categoria);
  }

  eliminarCategoriaService$(id: string): Observable<CategoriaManagment> {
    return this.categoriaRepository.eliminarCategoriaService$(id);
  }

  listarDropdownCategoriasService$() {}
}
