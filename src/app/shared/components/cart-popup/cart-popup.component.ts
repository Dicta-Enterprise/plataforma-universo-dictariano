import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaFacade } from '../../patterns/facade/models/categoria-facade';
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

  categorias: Categoria[] = [];
  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = { label: 'Público', color: '#33CCFF' };

  stars = [1, 2, 3, 4, 5];

  constructor(
    private cartService: CartService,
    private router: Router,
    private cursoFacade: CursoFacade,
    private categoriaFacade: CategoriaFacade
  ) {}

  ngOnInit() {
    this.categoriaFacade.listarCategorias();
    this.categoriaFacade.categorias$.asObservable().subscribe(cats => {
      this.categorias = cats;

      cats.forEach(cat => {
        const key = cat.nombre.toLowerCase().replace('ñ', 'n'); // si en tu repo está como 'Ã±', usa eso igual que en cart.component.ts

        const colorMap: Record<string, string> = {
          ninos: '#33FF66',
          jovenes: 'rgb(255, 204, 0)',
          padres: '#33CCFF',
        };

        this.categoryMap[cat.id] = {
          label: cat.nombre,
          color: colorMap[key] || '#33CCFF',
        };
      });
    });

    this.cursoFacade.listarCursos();

    combineLatest([
      this.cursoFacade.cursos$.asObservable(),
      this.items$
    ]).subscribe(([cursos, itemsEnCarrito]) => {
      const idsEnCarrito = new Set(itemsEnCarrito.map(i => i.id));
      this.cursosSugeridos = cursos.filter(c => !idsEnCarrito.has(c.id)).slice(0, 2);
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

  getCategory(categoriaId?: string) {
    return this.categoryMap[categoriaId ?? ''] ?? this.defaultCategory;
  }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
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