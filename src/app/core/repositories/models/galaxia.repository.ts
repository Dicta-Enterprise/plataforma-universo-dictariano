import { Observable } from 'rxjs';
import { Galaxias } from '../../class/models';

export interface GalaxiaRepository {
  listarGalaxiasService$(): Observable<Galaxias[]>;
  obtenerGalaxiaService$(galaxiaId: string): Observable<Galaxias>;
  crearGalaxiaService$(galaxia: Galaxias): Observable<Galaxias>;
  editarGalaxiaService$(
    galaxia: Galaxias
  ): Observable<Galaxias>;
  eliminarGalaxiaService$(galaxiaId: string): Observable<Galaxias>;
}
