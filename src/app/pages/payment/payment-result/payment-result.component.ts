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

    this.route.queryParams.subscribe(params => {
      this.status = params['status'] === 'rejected' ? 'rejected' : 'success';
    });

    const storedItems = sessionStorage.getItem('payment_result_items');
    const storedEmail = sessionStorage.getItem('payment_result_email');
    const storedTotal = sessionStorage.getItem('payment_result_total');
    const storedDate  = sessionStorage.getItem('payment_result_date');

    this.items = storedItems ? JSON.parse(storedItems) : [];
    this.email = storedEmail ?? '';
    this.total = storedTotal ? Number(storedTotal) : 0;
    this.date  = storedDate
      ? new Date(storedDate).toLocaleDateString('es-CO', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        })
      : '';
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

  get isSuccess() { return this.status === 'success'; }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }

  goToCourses() {
    sessionStorage.removeItem('payment_result_items');
    sessionStorage.removeItem('payment_result_email');
    sessionStorage.removeItem('payment_result_total');
    sessionStorage.removeItem('payment_result_date');
    this.router.navigate(['/mis-cursos']);
  }

  goToCart() {
    sessionStorage.removeItem('payment_result_items');
    sessionStorage.removeItem('payment_result_email');
    sessionStorage.removeItem('payment_result_total');
    sessionStorage.removeItem('payment_result_date');
    this.router.navigate(['/cart']);
  }

  retryPayment() {
    sessionStorage.removeItem('payment_result_items');
    sessionStorage.removeItem('payment_result_email');
    sessionStorage.removeItem('payment_result_total');
    sessionStorage.removeItem('payment_result_date');
    this.router.navigate(['/payment']);
  }
}