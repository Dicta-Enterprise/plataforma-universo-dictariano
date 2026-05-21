import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { Cursos } from 'src/app/core/class/models/cursos/Cursos.class';
import { CategoriaFacade, CategoriaUI } from 'src/app/shared/patterns/facade/models/categoria-facade';
import { ProfesorFacade, ProfesorUI } from 'src/app/shared/patterns/facade/models/profesor-facade';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  steps: MenuItem[] = [];
  cursosSugeridos: Cursos[] = [];
  stars = [1, 2, 3, 4, 5];
  isLoggedIn = false;

  private destroy$ = new Subject<void>();

  constructor(
    public cart: CartService,
    public categoriaFacade: CategoriaFacade,
    public profesorFacade: ProfesorFacade,
    private authService: AuthService,
    private cursoFacade: CursoFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.steps = [
      { label: 'Detalles del carrito' },
      { label: 'Inicia sesión' },
      { label: 'Proceder al pago' },
    ];

    this.categoriaFacade.listarCategorias();
    this.profesorFacade.listarProfesores();

    this.cursoFacade.listarCursos();
    this.cursoFacade.cursos$
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cursos => (this.cursosSugeridos = cursos.slice(0, 4)));

    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLogged => (this.isLoggedIn = isLogged));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCheckout(): void {
    if (!this.isLoggedIn) {
      sessionStorage.setItem('returnUrl', '/cart');
      this.router.navigate(['/auth/login']);
      return;
    }
    this.router.navigate(['/checkout']);
  }

  remove(id: number): void {
    this.cart.removeFromCart(id);
  }

  getCategory(categoriaId?: string): CategoriaUI {
    return this.categoriaFacade.getCategoryById(categoriaId ?? '');
  }

  getProfesor(profesorId?: string): ProfesorUI {
    return this.profesorFacade.getProfesorById(profesorId ?? '');
  }

  getStarClass(rating: number, star: number): string {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }
}