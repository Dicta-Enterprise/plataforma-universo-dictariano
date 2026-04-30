import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';
import { Categoria } from 'src/app/core/class/models';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ICarritoResponse } from 'src/app/core/interfaces/cart/ICart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  steps: MenuItem[] = [];
  cursosSugeridos: Cursos[] = [];
  categorias: Categoria[] = [];
  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = { label: 'Público', color: '#33CCFF' };
  stars = [1, 2, 3, 4, 5];

  idUsuario: number | null = null;
  isLoggedIn = false;

  constructor(
    public cart: CartService,
    private authService: AuthService,
    private cursoFacade: CursoFacade,
    private categoriaFacade: CategoriaFacade,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe(isLogged => {
      this.isLoggedIn = isLogged;

      if (isLogged) {
        const rawId = this.authService.getUserId();
        this.idUsuario = rawId ? parseInt(rawId) : null;
        this.cart.setUserSession(true, this.idUsuario);
        this.syncCartAfterLogin();
      } else {
        this.idUsuario = null;
        this.cart.setUserSession(false, null);
      }
    });

    this.authService.checkSession();

    this.categoriaFacade.listarCategorias();
    this.categoriaFacade.categorias$.asObservable().subscribe(cats => {
      this.categorias = cats;
      cats.forEach(cat => {
        const key = cat.nombre.toLowerCase().replace('ñ', 'n');
        const colorMap: Record<string, string> = {
          'ninos': '#33FF66',
          'jovenes': 'rgb(255, 204, 0)',
          'padres': '#33CCFF'
        };
        this.categoryMap[cat.id] = {
          label: cat.nombre,
          color: colorMap[key] || '#33CCFF'
        };
      });
    });

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

  syncCartAfterLogin(): void {
    if (!this.idUsuario) return;

    if (this.cart.getCarritoId()) return;

    this.cart.syncAfterLogin(this.idUsuario).subscribe({
      next: (res: ICarritoResponse | null) => {
        if (res?.id) {
          this.cart.saveCarritoIdForUser(this.idUsuario!, res.id);
        }
        this.cart.clearCartFromLocalStorage();
      },
      error: () => { /* error al sincronizar carrito */ }
    });
  }

  onCheckout(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.router.navigate(['/checkout']);
  }

  remove(id: number): void {
    this.cart.removeFromCart(id);
  }

  getStarClass(rating: number, star: number): string {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }
}