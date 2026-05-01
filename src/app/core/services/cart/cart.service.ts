import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { ICarritoResponse, ICursoCarritoPayload } from '../../interfaces/cart/ICart.interface';
import { CartStorageService } from './cart-storage.service';
import { CartApiService } from './cart-api.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<Curso[]>(this.storage.getItems());
  private showPopupSubject = new BehaviorSubject<boolean>(false);

  private carritoId: number | null = null;
  private isLoggedIn = false;
  private currentUserId: number | null = null;

  items$ = this.itemsSubject.asObservable();
  showPopup$ = this.showPopupSubject.asObservable();

  constructor(
    private storage: CartStorageService,
    private api: CartApiService
  ) {}

  get items(): Curso[] {
    return this.itemsSubject.value;
  }

  getCarritoId(): number | null {
    return this.carritoId;
  }

  getTotal(): number {
    return this.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
  }

  setUserSession(isLogged: boolean, userId: number | null): void {
    this.isLoggedIn = isLogged;
    this.currentUserId = userId;

    if (!isLogged) {
      this.carritoId = null;
    } else if (userId) {
      const saved = this.storage.getCarritoId(userId);
      if (saved) this.carritoId = saved;
    }
  }

  saveCarritoIdForUser(userId: number, carritoId: number): void {
    this.storage.saveCarritoId(userId, carritoId);
    this.carritoId = carritoId;
  }

  addToCart(curso: Curso): void {
    if (this.items.find(c => c.id === curso.id)) {
      this.showPopupSubject.next(true);
      return;
    }
    this.updateItems([...this.items, curso]);
    this.showPopupSubject.next(true);
  }

  removeFromCart(cursoId: number): void {
    this.updateItems(this.items.filter(c => c.id !== cursoId));
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    this.storage.clearItems();
    this.carritoId = null;
  }

  closePopup(): void {
    this.showPopupSubject.next(false);
  }

  syncAfterLogin(userId: number): Observable<ICarritoResponse | null> {
    const localItems = this.storage.getItems();
    const cursos: ICursoCarritoPayload[] = localItems.map(c => ({ idcurso: String(c.id) }));

    return this.api.getCarritoByUsuarioId(userId).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) return of(null);
        throw err; 
      }),
      switchMap(backendCart => {
        if (backendCart?.id) {
          this.saveCarritoIdForUser(userId, backendCart.id);
          if (cursos.length === 0) return of(backendCart);

          const backendIds = new Set(backendCart.cursos);
          const nuevos = cursos.filter(c => !backendIds.has(c.idcurso));
          if (nuevos.length === 0) return of(backendCart);

          return this.api.patchCarrito(backendCart.id, nuevos, []);
        }

        if (cursos.length === 0) return of(null);
        return this.api.crearCarrito(userId, cursos);
      }),
      tap(res => {
        if (res?.id) this.saveCarritoIdForUser(userId, res.id);
      })
    );
  }

  private updateItems(items: Curso[]): void {
    const previous = this.items;
    this.itemsSubject.next(items);
    this.storage.saveItems(items); 
    if (this.isLoggedIn && this.carritoId) {
      const prevIds = new Set(previous.map(c => String(c.id)));
      const currIds = new Set(items.map(c => String(c.id)));

      const added = items
        .filter(c => !prevIds.has(String(c.id)))
        .map(c => ({ idcurso: String(c.id) }));
      const removed = previous
        .filter(c => !currIds.has(String(c.id)))
        .map(c => String(c.id));

      this.api.patchCarrito(this.carritoId, added, removed).subscribe({
        error: () => {
          this.itemsSubject.next(previous);
          this.storage.saveItems(previous);
        },
      });
    }
  }
}