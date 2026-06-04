import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';

export interface MpStatusInfo {
  category: 'success' | 'pending' | 'rejected';
  title: string;
  subtitle: string;
  hint: string;
}
export interface PaymentResultItem {
  id: string | number;
  nombre: string;
  precio: number;
  rating?: number;
  valoraciones?: number;
  categoriaId: string;
  imagen?: string;
}

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent implements OnInit {

  statusInfo!: MpStatusInfo;
  email = '';
  total = 0;
  date  = '';
  items: PaymentResultItem[] = [];
  stars = [1, 2, 3, 4, 5];
  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = { label: 'Público', color: '#33CCFF' };

  // Valores de status_detail que MP devuelve en transactions.payments[0].status_detail
  private readonly STATUS_MAP: Record<string, MpStatusInfo> = {

    // ── Aprobado ─────────────────────────────────────────────────────────────
    'accredited': {
      category: 'success',
      title: 'Pago realizado con éxito',
      subtitle: 'Tus cursos ya están disponibles en tu cuenta.',
      hint: 'Te enviamos una factura electrónica a tu correo.'
    },

    // ── Pendientes ───────────────────────────────────────────────────────────
    'in_process': {
      category: 'pending',
      title: 'Pago pendiente de confirmación',
      subtitle: 'Tu pago está siendo revisado.',
      hint: 'Te notificaremos por correo cuando se confirme. No repitas el pago.'
    },

    // ── Rechazados — Orders API ─────────────────────────────────────────────

    'required_call_for_authorize': {
      category: 'rejected',
      title: 'Autorización requerida',
      subtitle: 'Se requiere una llamada para autorizar el pago.',
      hint: 'Llama al número del dorso de tu tarjeta para autorizar el cobro y luego reintenta.'
    },
    'insufficient_amount': {
      category: 'rejected',
      title: 'Saldo insuficiente',
      subtitle: 'El saldo disponible no es suficiente para cubrir el monto de la transacción.',
      hint: 'Recarga tu tarjeta o usa otro método de pago.'
    },
    'bad_filled_card_data': {
      category: 'rejected',
      title: 'Datos de tarjeta incorrectos',
      subtitle: 'La transacción falló debido a datos de la tarjeta completados incorrectamente.',
      hint: 'Verifica el número de tarjeta, CVV y fecha de vencimiento e intenta de nuevo.'
    },
    'invalid_installments': {
      category: 'rejected',
      title: 'Cuotas no válidas',
      subtitle: 'La transacción falló debido a cuotas inválidas.',
      hint: 'Selecciona un número de cuotas diferente e intenta nuevamente.'
    },
    'processing_error': {
      category: 'rejected',
      title: 'Error de procesamiento',
      subtitle: 'La transacción falló debido a un error de procesamiento.',
      hint: 'Si el problema persiste, comunícate con soporte e indica el número de tu orden.'
    },
    'card_disabled': {
      category: 'rejected',
      title: 'Tarjeta deshabilitada',
      subtitle: 'La transacción falló debido a que la tarjeta está desactivada. Esto puede ocurrir cuando la tarjeta ha sido bloqueada o desactivada por el emisor.',
      hint: 'Comunícate con tu banco para conocer el estado de tu tarjeta o usa otra tarjeta.'
    },
    'invalid_card_token': {
      category: 'rejected',
      title: 'Token de tarjeta inválido',
      subtitle: 'La transacción falló debido a un token de tarjeta inválido.',
      hint: 'Verifica los datos e intenta de nuevo. Si persiste, usa otra tarjeta.'
    },
    'max_attempts_exceeded': {
      category: 'rejected',
      title: 'Límite de intentos alcanzado',
      subtitle: 'La transacción falló debido a que se excedió el número máximo de intentos.',
      hint: 'Espera unos minutos antes de intentar nuevamente o usa otra tarjeta.'
    },
    'rejected_by_issuer': {
      category: 'rejected',
      title: 'Pago rechazado por el banco',
      subtitle: 'La transacción falló debido a un rechazo por parte del emisor de la tarjeta.',
      hint: 'Comunícate con tu banco para obtener más información o usa otra tarjeta.'
    },
    'failed': {
      category: 'rejected',
      title: 'Pago fallido',
      subtitle: 'No se pudo completar la transacción.',
      hint: 'Intenta nuevamente o usa otro método de pago.'
    },

  };

  private readonly SUCCESS_DEFAULT: MpStatusInfo = {
    category: 'success',
    title: 'Pago realizado con éxito',
    subtitle: 'Tus cursos ya están disponibles en tu cuenta.',
    hint: 'Te enviamos una factura electrónica a tu correo.'
  };

  private readonly PENDING_DEFAULT: MpStatusInfo = {
    category: 'pending',
    title: 'Pago pendiente de confirmación',
    subtitle: 'Tu pago está siendo revisado.',
    hint: 'Te notificaremos por correo cuando se confirme. No repitas el pago.'
  };

  private readonly REJECTED_DEFAULT: MpStatusInfo = {
    category: 'rejected',
    title: 'No se pudo procesar el pago',
    subtitle: 'No se realizó ningún cargo a tu tarjeta.',
    hint: 'Intenta nuevamente o usa otro método de pago.'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaFacade: CategoriaFacade,
    public cart: CartService
  ) {}

  ngOnInit() {
    this.loadCategorias();
    this.resolveStatus();
    this.loadSessionData();
  }

  private resolveStatus() {
    const params    = this.route.snapshot.queryParams;
    const status    = params['status'];  // 'success' | 'pending' | 'rejected'
    const reason    = params['reason'];  // status_detail de MP
    const stored    = sessionStorage.getItem('payment_result_estado') ?? '';
    const mpDetail  = reason || stored;

    if (status === 'success') {
      this.statusInfo = this.STATUS_MAP[mpDetail] ?? this.SUCCESS_DEFAULT;
      return;
    }
    if (status === 'pending') {
      this.statusInfo = this.STATUS_MAP[mpDetail] ?? this.PENDING_DEFAULT;
      return;
    }
    // rejected (o cualquier otro valor inesperado)
    this.statusInfo = this.STATUS_MAP[mpDetail] ?? this.REJECTED_DEFAULT;
  }

  private loadSessionData() {
    const storedItems = sessionStorage.getItem('payment_result_items');
    const storedEmail = sessionStorage.getItem('payment_result_email');
    const storedTotal = sessionStorage.getItem('payment_result_total');
    const storedDate  = sessionStorage.getItem('payment_result_date');

    this.items = storedItems ? (JSON.parse(storedItems) as PaymentResultItem[]) : [];
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

  get isSuccess()  { return this.statusInfo?.category === 'success';  }
  get isPending()  { return this.statusInfo?.category === 'pending';  }
  get isRejected() { return this.statusInfo?.category === 'rejected'; }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating ?? 0)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }

  private clearSession() {
    ['payment_result_items', 'payment_result_email',
      'payment_result_total', 'payment_result_date',
      'payment_result_estado'].forEach(k => sessionStorage.removeItem(k));
  }

  goToCourses()  { this.clearSession(); this.router.navigate(['/mis-cursos']); }
  goToCart()     { this.clearSession(); this.router.navigate(['/cart']);       }
  retryPayment() { this.clearSession(); this.router.navigate(['/payment']);    }
  goToHome() { this.clearSession(); this.router.navigate(['/home']); }
}