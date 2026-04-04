import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  steps: MenuItem[] = [];
  cursosSugeridos: Cursos[] = [];

  constructor(public cart: CartService, private cursoFacade: CursoFacade) {}

  ngOnInit() {
    this.steps = [
      { label: 'Detalles del carrito' },
      { label: 'Inicia sesión' },
      { label: 'Proceder al pago' }
    ];
    this.cursoFacade.listarCursos();
    this.cursoFacade.cursos$.asObservable().subscribe(cursos => {
      this.cursosSugeridos = cursos.slice(0, 4);
    });
  }

  remove(id: number) {
    this.cart.removeFromCart(id);
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