import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

@Injectable({ providedIn: 'root' })
export class CartStorageService {
  private readonly CART_KEY = 'cartItems';
  private readonly CARRITO_ID_PREFIX = 'carritoId_';

  getItems(): Curso[] {
    try {
      const data = localStorage.getItem(this.CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveItems(items: Curso[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }

  clearItems(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  getCarritoId(userId: number): number | null {
    const val = localStorage.getItem(`${this.CARRITO_ID_PREFIX}${userId}`);
    return val ? parseInt(val, 10) : null;
  }

  saveCarritoId(userId: number, carritoId: number): void {
    localStorage.setItem(`${this.CARRITO_ID_PREFIX}${userId}`, String(carritoId));
  }
}