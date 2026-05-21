import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

interface CartSnapshot {
  items: Curso[];
  savedAt: number | null;
}

@Injectable({ providedIn: 'root' })
export class CartStorageService {
  private readonly CART_KEY = 'cartItems';
  private readonly CARRITO_ID_PREFIX = 'carritoId_';
  private readonly TTL_DAYS = 3;

  getItems(): Curso[] {
    try {
      const snapshot = this.getSnapshot();
      return snapshot?.items ?? [];
    } catch {
      return [];
    }
  }

  saveItems(items: Curso[]): void {
    const current = this.getSnapshot();
    const snapshot: CartSnapshot = {
      items,
      savedAt: current?.savedAt === null ? null : Date.now(),
    };
    localStorage.setItem(this.CART_KEY, JSON.stringify(snapshot));
  }

  clearExpiration(): void {
    const current = this.getSnapshot();
    if (!current) return;
    localStorage.setItem(this.CART_KEY, JSON.stringify({ items: current.items, savedAt: null }));
  }

  restoreExpiration(): void {
    const current = this.getSnapshot();
    if (!current) return;
    localStorage.setItem(this.CART_KEY, JSON.stringify({ items: current.items, savedAt: Date.now() }));
  }

  isExpired(): boolean {
    const snapshot = this.getSnapshot();
    if (!snapshot) return false;
    if (snapshot.savedAt === null) return false;
    const ttlMs = this.TTL_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() - snapshot.savedAt > ttlMs;
  }

  clearItems(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  getCarritoId(userId: number): number | null {
    const val = localStorage.getItem(`${this.CARRITO_ID_PREFIX}${userId}`);
    return val ? parseInt(val, 10) : null;
  }

  clearCarritoId(userId: number): void {
    localStorage.removeItem(`${this.CARRITO_ID_PREFIX}${userId}`);
  }

  saveCarritoId(userId: number, carritoId: number): void {
    localStorage.setItem(`${this.CARRITO_ID_PREFIX}${userId}`, String(carritoId));
  }

  private getSnapshot(): CartSnapshot | null {
    try {
      const raw = localStorage.getItem(this.CART_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}