import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {

  status: 'success' | 'rejected' = 'success';
  email    = '';
  total    = 0;
  date     = '';
  items: any[] = [];

  stars = [1, 2, 3, 4, 5];

  // Mismo categoryMap que en PaymentComponent
  // (idealmente lo moverías a un servicio compartido)
  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = { label: 'Público', color: '#33CCFF' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaFacade: CategoriaFacade,
    public cart: CartService
  ) {}

  ngOnInit() {
    this.loadCategorias();
    // Lee query params
    this.route.queryParams.subscribe(params => {
      this.status = params['status'] === 'rejected' ? 'rejected' : 'success';
      this.email  = params['email'] ?? '';
      this.total  = Number(params['total']) || 0;
      this.date   = params['date']
        ? new Date(params['date']).toLocaleDateString('es-CO', {
            day: '2-digit', month: '2-digit', year: 'numeric'
          })
        : '';
    });

    // Lee items pasados por router state (disponibles solo en la carga inmediata)
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['items']) {
      this.items = nav.extras.state['items'];
    } else {
      // Fallback: si el usuario refresca la página, intenta recuperar desde sessionStorage
      const stored = sessionStorage.getItem('payment_result_items');
      if (stored) this.items = JSON.parse(stored);
    }

    // Persiste en sessionStorage para el caso de refresh
    if (this.items.length) {
      sessionStorage.setItem('payment_result_items', JSON.stringify(this.items));
    }
  }

  private loadCategorias() {
    this.categoriaFacade.listarCategorias();
    this.categoriaFacade.categorias$.asObservable().subscribe(cats => {
      cats.forEach(cat => {
        const key = cat.nombre.toLowerCase().replace('ñ', 'n');
        const colorMap: Record<string, string> = {
          'ninos':   '#33FF66',
          'jovenes': 'rgb(255, 204, 0)',
          'padres':  '#33CCFF'
        };
        this.categoryMap[cat.id] = {
          label: cat.nombre,
          color: colorMap[key] || '#33CCFF'
        };
      });
    });
  }

  // ── Helpers ──────────────────────────────────────────────

  get isSuccess() { return this.status === 'success'; }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }

  goToCourses() {
    sessionStorage.removeItem('payment_result_items');
    this.router.navigate(['/mis-cursos']);
  }

  goToCart() {
    sessionStorage.removeItem('payment_result_items');
    this.router.navigate(['/cart']);
  }

  retryPayment() {
    sessionStorage.removeItem('payment_result_items');
    this.router.navigate(['/payment']);
  }
}