import { Observable } from 'rxjs';
import { GalaxiaManagment } from '../../class/managment/managment';

export interface GalaxiaRepository {
  listarGalaxiasService$(): Observable<GalaxiaManagment[]>;
  obtenerGalaxiaService$(galaxiaId: string): Observable<GalaxiaManagment>;
  crearGalaxiaService$(galaxia: GalaxiaManagment): Observable<GalaxiaManagment>;
  editarGalaxiaService$(
    galaxiaId: string,
    galaxia: GalaxiaManagment
  ): Observable<GalaxiaManagment>;
  eliminarGalaxiaService$(galaxiaId: string): Observable<GalaxiaManagment>;
}
