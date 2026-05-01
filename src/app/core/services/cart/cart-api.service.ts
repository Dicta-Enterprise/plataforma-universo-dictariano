import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import {
  ICarritoResponse,
  ICursoCarritoPayload,
  IEliminarCarritoResponse,
} from '../../interfaces/cart/ICart.interface';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private readonly base = environment.URL_BACKEND_CARRITO;

  constructor(private http: HttpClient) {}

  crearCarrito(idUsuario: number, cursos: ICursoCarritoPayload[]): Observable<ICarritoResponse> {
    return this.http.post<ICarritoResponse>(`${this.base}carrito`, { idUsuario, cursos });
  }

  patchCarrito(
    carritoId: number,
    cursosAgregar: ICursoCarritoPayload[],
    cursosEliminar: string[]
  ): Observable<ICarritoResponse> {
    return this.http.patch<ICarritoResponse>(`${this.base}carrito`, {
      carritoId,
      cursosAgregar,
      cursosEliminar,
    });
  }

  getCarritoById(carritoId: number): Observable<ICarritoResponse> {
    return this.http.get<ICarritoResponse>(`${this.base}carrito/${carritoId}`);
  }

  getCarritoByUsuarioId(userId: number): Observable<ICarritoResponse> {
    return this.http.get<ICarritoResponse>(`${this.base}carrito/usuario/${userId}`);
  }

  deleteCarritoByUsuario(idUsuario: number): Observable<IEliminarCarritoResponse> {
    return this.http.delete<IEliminarCarritoResponse>(`${this.base}carrito/${idUsuario}`);
  }
}