import { Observable } from 'rxjs';
import { CursoManagment } from '../../class/managment/managment';

export interface CursoRepository {
  listarCursosService$(): Observable<CursoManagment[]>;
  obtenerCursoService$(cursoId: string): Observable<CursoManagment>;
  crearCursoService$(curso: CursoManagment): Observable<CursoManagment>;
  editarCursoService$(
    curso: CursoManagment
  ): Observable<CursoManagment>;
  eliminarCursoService$(cursoId: string): Observable<CursoManagment>;
}
