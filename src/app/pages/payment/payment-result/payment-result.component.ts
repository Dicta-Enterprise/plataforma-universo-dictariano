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
  title: string;
  description?: string;
  price: number;
  rating?: number;
  categoryId?: string;
  imageUrl?: string;
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
      title: 'Autorización requerida por tu banco',
      subtitle: 'Tu banco necesita que autorices este pago manualmente.',
      hint: 'Llama al número del dorso de tu tarjeta para autorizar el cobro y luego reintenta.'
    },
    'pending_contingency': {
      category: 'pending',
      title: 'Pago en revisión',
      subtitle: 'El banco está procesando la transacción.',
      hint: 'Puede tardar hasta 2 días hábiles. No repitas el pago.'
    },
    'pending_review_manual': {
      category: 'pending',
      title: 'Pago en revisión manual',
      subtitle: 'Tu pago está siendo revisado por nuestro equipo de seguridad.',
      hint: 'Te notificaremos el resultado en hasta 2 días hábiles.'
    },
    'pending_waiting_payment': {
      category: 'pending',
      title: 'Esperando confirmación de pago',
      subtitle: 'Aún no hemos recibido la confirmación de tu banco.',
      hint: 'Si ya realizaste el pago, espera unos minutos y revisa tu correo.'
    },
    'pending_waiting_transfer': {
      category: 'pending',
      title: 'Transferencia pendiente',
      subtitle: 'Estamos esperando que se complete la transferencia.',
      hint: 'Verifica el estado en la app de tu banco.'
    },

    // ── Rechazados ───────────────────────────────────────────────────────────
    'cc_rejected_insufficient_amount': {
      category: 'rejected',
      title: 'Saldo insuficiente',
      subtitle: 'Tu tarjeta no tiene fondos suficientes para este pago.',
      hint: 'Recarga tu tarjeta o usa otro método de pago.'
    },
    'cc_rejected_bad_filled_security_code': {
      category: 'rejected',
      title: 'Código de seguridad incorrecto',
      subtitle: 'El CVV ingresado no coincide con el de tu tarjeta.',
      hint: 'Verifica el código de 3 dígitos al dorso de tu tarjeta e intenta de nuevo.'
    },
    'cc_rejected_bad_filled_date': {
      category: 'rejected',
      title: 'Fecha de vencimiento incorrecta',
      subtitle: 'La fecha ingresada no es válida o tu tarjeta está vencida.',
      hint: 'Revisa la fecha de vencimiento e intenta de nuevo.'
    },
    'cc_rejected_bad_filled_other': {
      category: 'rejected',
      title: 'Datos de tarjeta incorrectos',
      subtitle: 'Hay un error en los datos del formulario.',
      hint: 'Revisa todos los campos e intenta nuevamente.'
    },
    'cc_rejected_call_for_authorize': {
      category: 'rejected',
      title: 'Autorización requerida',
      subtitle: 'Tu banco necesita que autorices este pago manualmente.',
      hint: 'Llama al número del dorso de tu tarjeta para autorizar el cobro y luego reintenta.'
    },
    'cc_rejected_card_disabled': {
      category: 'rejected',
      title: 'Tarjeta deshabilitada',
      subtitle: 'Tu tarjeta no está activa para pagos en línea.',
      hint: 'Actívala desde la app de tu banco o llama a servicio al cliente.'
    },
    'cc_rejected_card_type_not_allowed': {
      category: 'rejected',
      title: 'Tipo de tarjeta no permitido',
      subtitle: 'Esta tarjeta no está habilitada para este tipo de transacción.',
      hint: 'Prueba con una tarjeta de crédito o débito diferente.'
    },
    'cc_rejected_duplicated_payment': {
      category: 'rejected',
      title: 'Pago duplicado',
      subtitle: 'Ya existe un pago idéntico registrado recientemente.',
      hint: 'Verifica si el pago anterior fue procesado antes de volver a intentarlo.'
    },
    'cc_rejected_high_risk': {
      category: 'rejected',
      title: 'Pago rechazado por seguridad',
      subtitle: 'El pago fue bloqueado por nuestros sistemas de prevención de fraude.',
      hint: 'Comunícate con tu banco o intenta con otra tarjeta.'
    },
    'cc_rejected_invalid_installments': {
      category: 'rejected',
      title: 'Cuotas no válidas',
      subtitle: 'El número de cuotas seleccionado no está disponible para esta tarjeta.',
      hint: 'Selecciona un número de cuotas diferente e intenta nuevamente.'
    },
    'cc_rejected_max_attempts': {
      category: 'rejected',
      title: 'Límite de intentos alcanzado',
      subtitle: 'Superaste el número máximo de intentos permitidos.',
      hint: 'Espera unos minutos antes de intentar nuevamente o usa otra tarjeta.'
    },
    'cc_rejected_other_reason': {
      category: 'rejected',
      title: 'Pago rechazado',
      subtitle: 'Tu banco rechazó el pago sin especificar el motivo.',
      hint: 'Comunícate con tu banco para obtener más información o usa otra tarjeta.'
    },
    'rejected_by_bank': {
      category: 'rejected',
      title: 'Rechazado por el banco',
      subtitle: 'Tu banco no autorizó esta transacción.',
      hint: 'Comunícate con tu banco o usa otro método de pago.'
    },
    'rejected_insufficient_data': {
      category: 'rejected',
      title: 'Datos insuficientes',
      subtitle: 'Faltan datos necesarios para procesar el pago.',
      hint: 'Verifica que todos los campos estén completos e intenta de nuevo.'
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

  get isSuccess()  { return this.statusInfo?.category === 'success';  }
  get isPending()  { return this.statusInfo?.category === 'pending';  }
  get isRejected() { return this.statusInfo?.category === 'rejected'; }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating)
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