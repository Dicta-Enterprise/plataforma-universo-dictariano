import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';

export interface MpStatusInfo {
  category: 'success' | 'pending' | 'rejected';
  title: string;
  subtitle: string;
  subCode?: string;
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
  styleUrls: ['./payment-result.component.css'],
})
export class PaymentResultComponent implements OnInit {
  statusInfo!: MpStatusInfo;
  email = '';
  total = 0;
  date = '';
  items: PaymentResultItem[] = [];
  stars = [1, 2, 3, 4, 5];

  // Mapa exhaustivo de respuestas de Mercado Pago (status_detail)
  readonly MP_STATUS_MAP: Record<
    string,
    { title: string; subtitle: string; hint: string; subCode: string }
  > = {
      cc_rejected_bad_filled_date: {
        title: 'Fecha incorrecta',
        subtitle: 'Fecha de vencimiento incorrecta o tarjeta vencida.',
        hint: 'Revisa la fecha de expiración ingresada en tu tarjeta e inténtalo de nuevo.',
        subCode: 'EXPI',
      },
      cc_rejected_bad_filled_security_code: {
        title: 'CVV incorrecto',
        subtitle: 'Código de seguridad incorrecto.',
        hint: 'Revisa el código de 3 o 4 dígitos al reverso de tu tarjeta.',
        subCode: 'CALL',
      },
      cc_rejected_bad_filled_card_number: {
        title: 'Número inválido',
        subtitle: 'El número de tarjeta no es válido.',
        hint: 'Verifica los dígitos de tu tarjeta e intenta nuevamente.',
        subCode: 'CALL',
      },
      cc_rejected_insufficient_amount: {
        title: 'Fondos insuficientes',
        subtitle: 'Fondos insuficientes en la tarjeta.',
        hint: 'Verifica tu saldo o intenta con otro medio de pago.',
        subCode: 'CONT',
      },
      cc_rejected_card_disabled: {
        title: 'Tarjeta inhabilitada',
        subtitle: 'Tarjeta inhabilitada o bloqueada por el banco.',
        hint: 'Contacta a tu banco o utiliza una tarjeta diferente.',
        subCode: 'EXPI',
      },
      cc_rejected_call_for_authorize: {
        title: 'Autorización requerida',
        subtitle: 'Requiere autorización telefónica previa del banco.',
        hint: 'Llama a tu banco para habilitar la transacción e intenta nuevamente.',
        subCode: 'SECU',
      },
      cc_rejected_high_risk: {
        title: 'Pago rechazado',
        subtitle: 'Rechazado por el sistema de prevención de fraude.',
        hint: 'Intenta pagar con otro medio de pago o mediante otra tarjeta.',
        subCode: 'SURE',
      },
      cc_rejected_duplicated_payment: {
        title: 'Pago duplicado',
        subtitle: 'Ya hiciste un pago por este valor recientemente.',
        hint: 'Si necesitas hacer otro pago, espera unos minutos o usa otra tarjeta.',
        subCode: 'FUND',
      },
      cc_rejected_max_attempts: {
        title: 'Límite de intentos',
        subtitle: 'Superaste el límite de intentos permitidos.',
        hint: 'Por favor, intenta con otra tarjeta o medio de pago.',
        subCode: 'FUND',
      },
      cc_rejected_other_reason: {
        title: 'Pago no procesado',
        subtitle: 'Rechazo general por parte del banco emisor.',
        hint: 'Comunícate con tu entidad bancaria para autorizar la compra.',
        subCode: 'FUND',
      },
      in_process: {
        title: 'Pago en proceso',
        subtitle: 'Pago en revisión por la entidad financiera.',
        hint: 'Estamos procesando tu pago. Te notificaremos por correo cuando se confirme.',
        subCode: 'PEND',
      },
      pending_review_manual: {
        title: 'Pago en verificación',
        subtitle: 'Tu pago está siendo verificado por seguridad.',
        hint: 'En menos de 24 horas te avisaremos por correo si fue aprobado.',
        subCode: 'PEND',
      },
      pending_contingency: {
        title: 'Pago en proceso de confirmación',
        subtitle: 'Estamos procesando tu pago con el banco emisor.',
        hint: 'No te preocupes, no es necesario reintentar la compra. Te avisaremos por correo en cuanto se confirme.',
        subCode: 'PEND',
      },
    };

  private readonly SUCCESS_DEFAULT: MpStatusInfo = {
    category: 'success',
    title: 'Pago realizado con éxito',
    subtitle: 'Tus cursos ya están disponibles en tu cuenta.',
    hint: 'Te enviamos una factura electrónica a tu correo.',
  };

  private readonly PENDING_DEFAULT: MpStatusInfo = {
    category: 'pending',
    title: 'Pago pendiente de confirmación',
    subtitle: 'Tu pago está siendo revisado.',
    hint: 'Te notificaremos por correo cuando se confirme. No repitas el pago.',
  };

  private readonly REJECTED_DEFAULT: MpStatusInfo = {
    category: 'rejected',
    title: 'No se pudo procesar el pago',
    subtitle: 'No se realizó ningún cargo a tu tarjeta.',
    hint: 'Intenta nuevamente o usa otro método de pago.',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public categoriaFacade: CategoriaFacade,
    public cart: CartService,
  ) {}

  ngOnInit() {
    this.categoriaFacade.listarCategorias();
    this.loadSessionData();
    this.resolveStatus();
  }

  private resolveStatus(): void {
    const params = this.route.snapshot.queryParams;
    const status = (params['status'] ?? '').toLowerCase();
    const reason = params['reason'];
    const stored = sessionStorage.getItem('payment_result_estado') ?? '';

    const mpDetail = (reason || stored).trim();
    const mappedDetail = this.MP_STATUS_MAP[mpDetail];

    // 1. Caso Exitoso
    if (status === 'success') {
      this.statusInfo = mappedDetail
        ? { category: 'success', ...mappedDetail }
        : this.SUCCESS_DEFAULT;
      return;
    }

    // 2. Caso Pendiente / En proceso
    if (status === 'pending') {
      this.statusInfo = mappedDetail
        ? { category: 'pending', ...mappedDetail }
        : this.PENDING_DEFAULT;
      return;
    }

    // 3. Caso Rechazado / Error
    this.statusInfo = mappedDetail
      ? { category: 'rejected', ...mappedDetail }
      : this.REJECTED_DEFAULT;
  }

  private loadSessionData() {
    const storedItems = sessionStorage.getItem('payment_result_items');
    const storedEmail = sessionStorage.getItem('payment_result_email');
    const storedTotal = sessionStorage.getItem('payment_result_total');
    const storedDate = sessionStorage.getItem('payment_result_date');

    this.items = storedItems
      ? (JSON.parse(storedItems) as PaymentResultItem[])
      : [];
    this.email = storedEmail ?? '';
    this.total = storedTotal ? Number(storedTotal) : 0;
    this.date = storedDate
      ? new Date(storedDate).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      : '';
  }

  get isSuccess() {
    return this.statusInfo?.category === 'success';
  }
  get isPending() {
    return this.statusInfo?.category === 'pending';
  }
  get isRejected() {
    return this.statusInfo?.category === 'rejected';
  }

  getStarClass(rating: number | undefined, star: number): string {
    const currentRating = rating ?? 0;
    return star <= Math.round(currentRating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
  }

  private clearSession() {
    [
      'payment_result_items',
      'payment_result_email',
      'payment_result_total',
      'payment_result_date',
      'payment_result_estado',
    ].forEach((k) => sessionStorage.removeItem(k));
  }

  retryPayment() {
    this.clearSession();
    this.router.navigate(['/payment']);
  }

  goToHome() {
    this.clearSession();
    this.router.navigate(['/home']);
  }
}
