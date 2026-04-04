import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<Curso[]>([]);
  private showPopupSubject = new BehaviorSubject<boolean>(false);
  
  items$ = this.itemsSubject.asObservable();
  showPopup$ = this.showPopupSubject.asObservable();

  get items(): Curso[] {
    return this.itemsSubject.value;
  }

  addToCart(curso: Curso) {
    if (!this.items.find(c => c.id === curso.id)) {
      this.itemsSubject.next([...this.items, curso]);
    }
    this.showPopupSubject.next(true);
  }

  removeFromCart(cursoId: number) {
    this.itemsSubject.next(this.items.filter(c => c.id !== cursoId));
  }

  clearCart() {
    this.itemsSubject.next([]);
  }

  closePopup() {
    this.showPopupSubject.next(false);
  }

  getTotal(): number {
    return this.items.reduce((acc, curr) => acc + (curr.precio || 0), 0);
  }
}
