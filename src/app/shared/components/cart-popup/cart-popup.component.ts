import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent {
  showPopup$ = this.cartService.showPopup$;
  items$ = this.cartService.items$;

  constructor(private cartService: CartService, private router: Router) {}

  close() { this.cartService.closePopup(); }

  remove(id: number) { this.cartService.removeFromCart(id); }

  getTotal(): number { return this.cartService.getTotal(); }

  irAlCarrito() {
    this.cartService.closePopup();
    this.router.navigate(['/cart']);
  }

  irAPagar() {
    // TODO: implementar pago
  }

  getPublicoColor(categoria: string): string {
    const map: Record<string, string> = {
      'Niños':   'var(--color-green-500)',
      'Jóvenes': 'var(--color-yellow-500)',
      'Padres':  'var(--color-light-blue-500)',
    };
    return map[categoria] ?? 'var(--color-light-blue-500)'; 
  }
}