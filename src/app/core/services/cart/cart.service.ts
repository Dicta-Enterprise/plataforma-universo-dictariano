import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';
import { ICarritoResponse, ICursoCarritoPayload, IEliminarCarritoResponse } from '../../interfaces/cart/ICart.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<Curso[]>(this.getCartFromLocalStorage());
  private showPopupSubject = new BehaviorSubject<boolean>(false);
  private carritoId: number | null = null;
  private isLoggedIn = false;
  private currentUserId: number | null = null;

  items$ = this.itemsSubject.asObservable();
  showPopup$ = this.showPopupSubject.asObservable();

  constructor(private http: HttpClient) {}

  get items(): Curso[] {
    return this.itemsSubject.value;
  }

  setUserSession(isLogged: boolean, userId: number | null): void {
    this.isLoggedIn = isLogged;
    this.currentUserId = userId;
    if (!isLogged) {
      this.carritoId = null;
    } else if (userId) {
      // Recuperar carritoId de localStorage si existe
      const saved = this.getSavedCarritoIdForUser(userId);
      if (saved) this.carritoId = saved;
    }
  }

  setCarritoId(id: number): void {
    this.carritoId = id;
  }

  getCarritoId(): number | null {
    return this.carritoId;
  }

  saveCartToLocalStorage(items: Curso[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  getCartFromLocalStorage(): Curso[] {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  }

  loadCartFromLocalStorage(): void {
    const items = this.getCartFromLocalStorage();
    if (items.length > 0) {
      this.itemsSubject.next(items);
    }
  }

  clearCartFromLocalStorage(): void {
    localStorage.removeItem('cartItems');
  }

  addToCart(curso: Curso): void {
    if (this.items.find(c => c.id === curso.id)) {
      this.showPopupSubject.next(true);
      return;
    }

    const updated = [...this.items, curso];
    this.itemsSubject.next(updated);

    if (this.isLoggedIn && this.carritoId) {
      this.patchCarrito([{ idcurso: String(curso.id) }], []).subscribe();
    } else {
      this.saveCartToLocalStorage(updated);
    }

    this.showPopupSubject.next(true);
  }

  removeFromCart(cursoId: number): void {
    const updated = this.items.filter(c => c.id !== cursoId);
    this.itemsSubject.next(updated);

    if (this.isLoggedIn && this.carritoId) {
      this.patchCarrito([], [String(cursoId)]).subscribe();
    } else {
      this.saveCartToLocalStorage(updated);
    }
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    this.clearCartFromLocalStorage();
    this.carritoId = null;
  }

  closePopup(): void {
    this.showPopupSubject.next(false);
  }

  getTotal(): number {
    return this.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
  }

  crearCarrito(idUsuario: number, cursos: ICursoCarritoPayload[]): Observable<ICarritoResponse> {
    return this.http.post<ICarritoResponse>(`${environment.URL_BACKEND_CARRITO}carrito`, { idUsuario, cursos });
  }

  patchCarrito(cursosAgregar: ICursoCarritoPayload[], cursosEliminar: string[]): Observable<ICarritoResponse | null> {
    if (!this.carritoId) return of(null);
    return this.http.patch<ICarritoResponse>(`${environment.URL_BACKEND_CARRITO}carrito`, {
      carritoId: this.carritoId,
      cursosAgregar,
      cursosEliminar
    });
  }

  getCarritoById(carritoId: number): Observable<ICarritoResponse> {
    return this.http.get<ICarritoResponse>(`${environment.URL_BACKEND_CARRITO}carrito/${carritoId}`);
  }

  deleteCarritoByUsuario(idUsuario: number): Observable<IEliminarCarritoResponse> {
    return this.http.delete<IEliminarCarritoResponse>(`${environment.URL_BACKEND_CARRITO}carrito/${idUsuario}`);
  }

  syncAfterLogin(idUsuario: number): Observable<ICarritoResponse | null > {
    const localItems = this.getCartFromLocalStorage();
    const cursos = localItems.map(c => ({ idcurso: String(c.id) }));

    const savedCarritoId = this.getSavedCarritoIdForUser(idUsuario);

    if (savedCarritoId) {
      this.carritoId = savedCarritoId;
      if (cursos.length === 0) return of(null);
      return this.patchCarrito(cursos, []);
    } else {
      if (cursos.length === 0) return of(null);
      return this.crearCarrito(idUsuario, cursos);
    }
  }

  saveCarritoIdForUser(idUsuario: number, carritoId: number): void {
    localStorage.setItem(`carritoId_${idUsuario}`, String(carritoId));
    this.carritoId = carritoId;
  }

  private getSavedCarritoIdForUser(idUsuario: number): number | null {
    const val = localStorage.getItem(`carritoId_${idUsuario}`);
    return val ? parseInt(val, 10) : null;
  }

  ensureCarritoId(idUsuario: number): Observable<ICarritoResponse | null > {
    const savedId = this.getSavedCarritoIdForUser(idUsuario);
    if (savedId) {
      this.carritoId = savedId;
      return of(null);
    }
    // No tenemos carritoId, crear carrito vacío para obtenerlo
    return this.crearCarrito(idUsuario, []).pipe(
      tap((res: ICarritoResponse) => {
        if (res?.id) {
          this.saveCarritoIdForUser(idUsuario, res.id);
        }
      })
    );
  }
}