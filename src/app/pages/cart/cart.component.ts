import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  constructor(public cart: CartService) {}

  remove(id: number) {
    this.cart.removeFromCart(id);
  }

  clear() {
    this.cart.clearCart();
  }
}
