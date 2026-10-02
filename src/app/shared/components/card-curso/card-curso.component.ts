import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/core/class/models';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-card-curso',
  templateUrl: './card-curso.component.html',
  styleUrls: ['./card-curso.component.css'],
})
export class CardCursoComponent {
  @Input() curso!: Cursos;
  @Input() bg_color: string;
  @Input() primary_color!: string;
  @Input() secondary_color!: string;
  cantidad_en_carrito = 0;
  isPhone = false;

  constructor(
    private readonly router: Router,
    private readonly cart: CartService,
  ) {
    this.setIsPhone();
    window.addEventListener('resize', () => {
      this.setIsPhone();
    });
  }

  public setIsPhone(): void {
    this.isPhone = innerWidth < 500;
  }

  public get dynamicHoverClass(): string {
    return 'hover:shadow-[0_0_20px_' + this.primary_color + ']';
  }

  irADetalle() {
    if (this.curso && this.curso.id) {
      this.router.navigate(['/courses/detalle', this.curso.id]);
    }
  }
  agregarAlCarrito() {
    this.cart.addToCart(this.curso);
  }
  getCursoCarrito() {
    this.cantidad_en_carrito = 0;
    this.cart.items.forEach((e) => {
      if (e.id == this.curso.id) {
        this.cantidad_en_carrito += 1;
      }
    });
    return this.cantidad_en_carrito;
  }
}
