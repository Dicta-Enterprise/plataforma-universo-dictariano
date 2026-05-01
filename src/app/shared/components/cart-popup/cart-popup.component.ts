import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { CategoriaFacade, CategoriaUI } from 'src/app/shared/patterns/facade/models/categoria-facade';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css'],
})
export class CartPopupComponent implements OnInit, OnDestroy {
  showPopup$ = this.cartService.showPopup$;
  items$ = this.cartService.items$;
  cursosSugeridos: Cursos[] = [];
  stars = [1, 2, 3, 4, 5];

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cursoFacade: CursoFacade,
    public categoriaFacade: CategoriaFacade
  ) {}

  ngOnInit(): void {
    this.categoriaFacade.listarCategorias();

    this.cursoFacade.listarCursos();

    combineLatest([
      this.cursoFacade.cursos$.asObservable(),
      this.items$,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([cursos, itemsEnCarrito]) => {
        const idsEnCarrito = new Set(itemsEnCarrito.map(i => i.id));
        this.cursosSugeridos = cursos.filter(c => !idsEnCarrito.has(c.id)).slice(0, 2);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close(): void {
    this.cartService.closePopup();
  }

  remove(id: number): void {
    this.cartService.removeFromCart(id);
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  agregarAlCarrito(curso: Cursos): void {
    this.cartService.addToCart(curso);
  }

  irAlCarrito(): void {
    this.cartService.closePopup();
    this.router.navigate(['/cart']);
  }

  getCategory(categoriaId?: string): CategoriaUI {
    return this.categoriaFacade.getCategoryById(categoriaId ?? '');
  }

  getStarClass(rating: number, star: number): string {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }
}