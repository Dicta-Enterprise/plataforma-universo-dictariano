import { Observable } from 'rxjs';
import { Cursos } from '../../class/models';

export interface CursoRepository {
  listarCursosService$(): Observable<Cursos[]>;
  obtenerCursoService$(cursoId: string): Observable<Cursos>;
  crearCursoService$(curso: Cursos): Observable<Cursos>;
  editarCursoService$(
    curso: Cursos
  ): Observable<Cursos>;
  eliminarCursoService$(cursoId: string): Observable<Cursos>;
}
