import { Observable } from 'rxjs';
import { Categoria } from '../../class/models';

export interface CategoriaRepository {
  listarCategoriasService$(): Observable<Categoria[]>;
  obtenerCategoriaService$(categoriaId: string): Observable<Categoria>;
  crearCategoriaService$(
    categoria: Categoria,
    imagen: File
  ): Observable<Categoria>;
  editarCategoriaService$(
    categoria: Categoria
  ): Observable<Categoria>;
  eliminarCategoriaService$(
    categoriaId: string
  ): Observable<Categoria>;
}
