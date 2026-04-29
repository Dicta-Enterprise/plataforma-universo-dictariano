import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<Curso[]>([]);
  private showPopupSubject = new BehaviorSubject<boolean>(false);

  items$ = this.itemsSubject.asObservable();
  showPopup$ = this.showPopupSubject.asObservable();

  constructor(private http: HttpClient) {}

  get items(): Curso[] {
    return this.itemsSubject.value;
  }

  createCarrito(idUsuario: number, cursos: { idcurso: string }[]) {
    const body = {
      idUsuario,
      cursos
    };
    return this.http.post(environment.URL_BACKEND_CARRITO + 'carrito', body);
  }

  addToCart(curso: Curso) {
    if (!this.items.find(c => c.id === curso.id)) {
      const updated = [...this.items, curso];
      this.itemsSubject.next(updated);
      this.saveCartToLocalStorage(updated);
    }
    this.showPopupSubject.next(true);
  }

  removeFromCart(cursoId: number) {
    const updated = this.items.filter(c => c.id !== cursoId);
    this.itemsSubject.next(updated);
    this.saveCartToLocalStorage(updated);
  }

  clearCart() {
    this.itemsSubject.next([]);
    this.clearCartFromLocalStorage();
  }

  saveCartToLocalStorage(items: Curso[]) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
  getCartFromLocalStorage(): Curso[] {
    const data = localStorage.getItem('cartItems');
    return data ? JSON.parse(data) : [];
  }
  loadCartFromLocalStorage() {
    const items = this.getCartFromLocalStorage();
    if (items && items.length > 0) {
      this.itemsSubject.next(items);
    }
  }
  clearCartFromLocalStorage() {
    localStorage.removeItem('cartItems');
  }

  createOrUpdateCartForUser(idUsuario: number, cursos: { idcurso: string }[]) {
    return this.createCarrito(idUsuario, cursos);
  }

  closePopup() {
    this.showPopupSubject.next(false);
  }

  getTotal(): number {
    return this.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
  }
}