import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent implements OnInit {
  showPopup$ = this.cartService.showPopup$;
  items$ = this.cartService.items$;
  cursosSugeridos: Cursos[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private cursoFacade: CursoFacade
  ) {}

  ngOnInit() {
    this.cursoFacade.listarCursos();

    // Combina cursos + items del carrito para filtrar los que ya están
    combineLatest([
      this.cursoFacade.cursos$.asObservable(),
      this.items$
    ]).subscribe(([cursos, itemsEnCarrito]) => {
      const idsEnCarrito = new Set(itemsEnCarrito.map(i => i.id));
      this.cursosSugeridos = cursos
        .filter(c => !idsEnCarrito.has(c.id))
        .slice(0, 2);
    });
  }

  close() { this.cartService.closePopup(); }
  remove(id: number) { this.cartService.removeFromCart(id); }
  getTotal(): number { return this.cartService.getTotal(); }

  agregarAlCarrito(curso: Cursos) {
    this.cartService.addToCart(curso);
  }

  irAlCarrito() {
    this.cartService.closePopup();
    this.router.navigate(['/cart']);
  }

  irAPagar() {
    // TODO: implementar pago
  }

  getPublicoColor(categoria: string): string {
    const map: Record<string, string> = {
      'Niños':   '#33FF66',
      'Jóvenes': 'rgb(255, 204, 0)',
      'Padres':  '#33CCFF',
    };
    return map[categoria] ?? '#33CCFF';
  }
}