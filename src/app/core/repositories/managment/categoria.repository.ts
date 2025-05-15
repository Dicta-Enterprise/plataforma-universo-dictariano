import { Observable } from 'rxjs';
import { CategoriaManagment } from '../../class/managment/managment';

export interface CategoriaRepository {
  listarCategoriasService$(): Observable<CategoriaManagment[]>;
  obtenerCategoriaService$(categoriaId: string): Observable<CategoriaManagment>;
  crearCategoriaService$(
    categoria: CategoriaManagment,
    imagen: File
  ): Observable<CategoriaManagment>;
  editarCategoriaService$(
    categoria: CategoriaManagment
  ): Observable<CategoriaManagment>;
  eliminarCategoriaService$(
    categoriaId: string
  ): Observable<CategoriaManagment>;
}
