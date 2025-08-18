import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartComponent } from 'src/app/pages/cart/cart.component';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<Curso[]>([]);
  items$ = this.itemsSubject.asObservable();

  get items(): Curso[] {
    return this.itemsSubject.value;
  }

  addToCart(curso: Curso) {
    if (!this.items.find(c => c.id === curso.id)) {
      this.itemsSubject.next([...this.items, curso]);
    }
  }

  removeFromCart(cursoId: number) {
    this.itemsSubject.next(this.items.filter(c => c.id !== cursoId));
  }

  clearCart() {
    this.itemsSubject.next([]);
  }

  getTotal(): number {
    return this.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
  }
}
