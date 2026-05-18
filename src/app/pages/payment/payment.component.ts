import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';
import { Curso } from 'src/app/core/class/curso/curso.class';

// ── Interfaces ────────────────────────────────────────────────────────────────

interface MpField {
  mount(id: string): MpField;
  unmount(): void;
  on(event: string, handler: (data: unknown) => void): void;
  update(options: Record<string, unknown>): void;
}

interface MpPaymentMethod {
  id: string;
  additional_info_needed?: string[];
  issuer?: { id: string; name: string };
  settings?: { card_number: unknown; security_code: unknown }[];
}

interface MpInstallmentCost {
  installments: number;
  recommended_message: string;
}

interface MpInstallmentResponse {
  payer_costs?: MpInstallmentCost[];
}

interface BinChangeData {
  bin: string;
}

interface ValidityChangeData {
  errorMessages: { message: string; cause: string }[];
}

interface OrderResponse {
  data?: { estadoOrden?: string };
}

interface MpInstance {
  getIdentificationTypes(): Promise<{ id: string; name: string; min_length: number; max_length: number }[]>;
  getPaymentMethods(opts: { bin: string }): Promise<{ results: MpPaymentMethod[] }>;
  getIssuers(opts: { paymentMethodId: string; bin: string }): Promise<{ id: string; name: string }[]>;
  getInstallments(opts: { amount: string; bin: string; paymentTypeId: string }): Promise<MpInstallmentResponse[]>;
  fields: {
    create(type: string, opts: Record<string, unknown>): MpField;
    createCardToken(opts: Record<string, unknown>): Promise<{ id: string }>;
  };
}

// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  steps: MenuItem[] = [
    { label: 'Detalles del carrito' },
    { label: 'Inicia sesión' },
    { label: 'Proceder al pago' }
  ];

  selectedMethod: 'credit' | 'debit' | null = null;
  selectedInstallments = 1;
  selectedIssuerId = '';
  isSubmitting = false;
  errorMessage = '';

  paymentForm!: FormGroup;

  mp: MpInstance | null = null;

  cardNumberElement:    MpField | null = null;
  expirationDateElement: MpField | null = null;
  securityCodeElement:  MpField | null = null;

  private mpReady = false;

  docTypes:     { id: string; name: string; min_length: number; max_length: number }[] = [];
  issuers:      { id: string; name: string }[] = [];
  installments: MpInstallmentCost[] = [];

  paymentMethodId = '';
  cardBrand       = '';
  requiresIssuer  = false;

  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = { label: 'Público', color: '#33CCFF' };
  stars = [1, 2, 3, 4, 5];

  selectedDocType: { min_length: number; max_length: number } | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public cart: CartService,
    private authService: AuthService,
    private categoriaFacade: CategoriaFacade,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    if (this.cart.items.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }
    this.loadCategorias();
    this.buildForm();
    await this.initMercadoPago();
  }

  ngOnDestroy() {
    this.cardNumberElement?.unmount();
    this.expirationDateElement?.unmount();
    this.securityCodeElement?.unmount();
  }

  private buildForm() {
    this.paymentForm = this.fb.group({
      holder:    ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      docType:   ['', Validators.required],
      docNumber: ['', Validators.required],
    });
  }

  private async initMercadoPago() {
    await loadMercadoPago();
    const win = window as unknown as { MercadoPago: new (key: string, opts: Record<string, unknown>) => MpInstance };
    this.mp = new win.MercadoPago(
      environment.mercadoPagoPublicKey,
      { locale: 'es-CO' }
    );
    await this.loadIdentificationTypes();
    this.mpReady = true;
  }

  private async loadIdentificationTypes() {
    try {
      const types = await this.mp!.getIdentificationTypes();
      this.docTypes = types;
      if (types.length > 0) {
        this.paymentForm.get('docType')?.setValue(types[0].id);
        this.selectedDocType = types[0];
        this.updateDocValidation(types[0]);
      }
    } catch {
      // identification types unavailable
    }
  }

  onDocTypeChange(selectedId: string) {
    const selected = this.docTypes.find(t => t.id === selectedId);
    if (selected) {
      this.selectedDocType = selected;
      this.updateDocValidation(selected);
      this.paymentForm.get('docNumber')?.reset();
    }
  }

  private updateDocValidation(docType: { min_length: number; max_length: number }) {
    this.paymentForm.get('docNumber')?.setValidators([
      Validators.required,
      Validators.minLength(docType.min_length),
      Validators.maxLength(docType.max_length),
      Validators.pattern(/^\d+$/)
    ]);
    this.paymentForm.get('docNumber')?.updateValueAndValidity();
  }

  private mountPCIFields() {
    if (this.cardNumberElement) return;

    this.cardNumberElement = this.mp!.fields
      .create('cardNumber', { placeholder: '1234 5678 9012 3456', style: { color: '#ffffff', fontSize: '14px' }})
      .mount('form-checkout__cardNumber');

    this.expirationDateElement = this.mp!.fields
      .create('expirationDate', { placeholder: 'MM/YY', style: { color: '#ffffff', fontSize: '14px' }})
      .mount('form-checkout__expirationDate');

    this.securityCodeElement = this.mp!.fields
      .create('securityCode', { placeholder: 'CVV', style: { color: '#ffffff', fontSize: '14px' }})
      .mount('form-checkout__securityCode');

    this.cardNumberElement.on('ready', () => {
      this.attachFieldListeners(this.cardNumberElement!, 'form-checkout__cardNumber');
      this.cardNumberElement!.on('binChange', async (data: unknown) => {
        const { bin } = data as BinChangeData;
        if (!bin) { this.resetCardState(); return; }
        try {
          const { results } = await this.mp!.getPaymentMethods({ bin });
          if (!results?.length) return;
          const paymentMethod  = results[0];
          this.paymentMethodId = paymentMethod.id;
          this.cardBrand       = paymentMethod.id;
          this.updatePCIFieldsSettings(paymentMethod);
          await this.loadIssuers(paymentMethod, bin);
          await this.loadInstallments(bin);
          this.cdr.detectChanges();
        } catch {
          // bin lookup failed
        }
      });
    });

    this.expirationDateElement.on('ready', () => {
      this.attachFieldListeners(this.expirationDateElement!, 'form-checkout__expirationDate');
    });

    this.securityCodeElement.on('ready', () => {
      this.attachFieldListeners(this.securityCodeElement!, 'form-checkout__securityCode');
    });
  }

  private attachFieldListeners(fieldInstance: MpField, containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) return;

    fieldInstance.on('focus', () => el.classList.add('mp-field--focus'));

    fieldInstance.on('blur', () => {
      el.classList.remove('mp-field--focus');
      el.classList.add('mp-field--blur');
    });

    fieldInstance.on('validityChange', (data: unknown) => {
      const { errorMessages } = data as ValidityChangeData;
      if (errorMessages.length > 0) {
        el.classList.add('mp-field--invalid');
        el.classList.remove('mp-field--valid');
        fieldInstance.update({ invalid: true });
      } else {
        el.classList.remove('mp-field--invalid');
        el.classList.add('mp-field--valid');
        fieldInstance.update({ invalid: false });
      }
      this.cdr.detectChanges();
    });
  }

  private updatePCIFieldsSettings(paymentMethod: MpPaymentMethod) {
    const { settings } = paymentMethod;
    if (!settings?.length) return;
    this.cardNumberElement!.update({ settings: settings[0].card_number });
    this.securityCodeElement!.update({ settings: settings[0].security_code });
  }

  private async loadIssuers(paymentMethod: MpPaymentMethod, bin: string) {
    const needsIssuer = paymentMethod.additional_info_needed?.includes('issuer_id');
    this.requiresIssuer = !!needsIssuer;
    if (needsIssuer) {
      try {
        this.issuers = await this.mp!.getIssuers({ paymentMethodId: paymentMethod.id, bin });
        this.selectedIssuerId = this.issuers[0]?.id ?? '';
      } catch {
        this.issuers = [];
      }
    } else {
      this.issuers = paymentMethod.issuer ? [paymentMethod.issuer] : [];
      this.selectedIssuerId = this.issuers[0]?.id ?? '';
    }
  }

  private async loadInstallments(bin: string) {
    try {
      const response = await this.mp!.getInstallments({
        amount:        String(this.totalAmount),
        bin,
        paymentTypeId: this.selectedMethod === 'credit' ? 'credit_card' : 'debit_card'
      });
      this.installments = [...(response?.[0]?.payer_costs ?? [])];
      const one = this.installments.find(i => i.installments === 1);
      this.selectedInstallments = one?.installments ?? this.installments[0]?.installments ?? 1;
    } catch {
      this.installments = [];
    }
  }

  private resetCardState() {
    this.paymentMethodId      = '';
    this.cardBrand            = '';
    this.issuers              = [];
    this.installments         = [];
    this.requiresIssuer       = false;
    this.selectedInstallments = 1;
    this.selectedIssuerId     = '';
  }

  async submit() {
    if (!this.selectedMethod || this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';
    const form = this.paymentForm.value as { holder: string; email: string; docType: string; docNumber: string };

    try {
      const cardToken = await this.mp!.fields.createCardToken({
        cardholderName:       form.holder,
        identificationType:   form.docType,
        identificationNumber: form.docNumber,
      });

      const detalleOrden = this.cart.items.map((item: Curso) => ({
        idcurso:     item.id,
        nombrecurso: item.nombre,
        precio:      parseFloat(Math.floor(item.precio).toFixed(2)),
      }));

      const body = {
        idusuario: this.authService.getCurrentUserId() || 1,
        estado: 'PENDIENTE',
        detalleOrden,
        pago: {
          idorden: 1,
          fechapago:     new Date().toISOString(),
          monto:         parseFloat(Math.floor(this.totalAmount).toFixed(2)),
          nombrepagante: form.holder,
          emailpagante:  form.email,
          moneda:        'COP',
          metodopago:    this.paymentMethodId || 'master',
          tipotarjeta:   this.selectedMethod === 'credit' ? 'credit_card' : 'debit_card',
          token:         cardToken.id,
          cuotas:        this.selectedMethod === 'debit' ? 1 : this.selectedInstallments,
          processing_mode: 'automatic',
        }
      };

      this.http.post<OrderResponse>(`${environment.URL_BACKEND_TRANSACTION}orders`, body).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          const estado = res?.data?.estadoOrden;
          const items = [...this.cart.items];
          const total  = this.totalAmount;
          const email  = (this.paymentForm.value as { email: string }).email;

          sessionStorage.setItem('payment_result_items', JSON.stringify(items));
          sessionStorage.setItem('payment_result_email', email);
          sessionStorage.setItem('payment_result_total', String(total));
          sessionStorage.setItem('payment_result_date',  new Date().toISOString());

          if (estado === 'processed' || estado === 'COMPLETADO' || estado === 'processing') {
            this.cart.clearCart();
            this.router.navigate(['payment', 'result'], { queryParams: { status: 'success' } });
          } else {
            this.router.navigate(['payment', 'result'], { queryParams: { status: 'rejected' } });
          }
        },
        error: () => {
          this.isSubmitting = false;
          sessionStorage.setItem('payment_result_items', JSON.stringify([...this.cart.items]));
          sessionStorage.setItem('payment_result_total', String(this.totalAmount));
          sessionStorage.setItem('payment_result_date',  new Date().toISOString());
          this.router.navigate(['payment', 'result'], { queryParams: { status: 'rejected' } });
        }
      });

    } catch {
      this.isSubmitting = false;
      this.errorMessage = 'No se pudo procesar la tarjeta. Verifica los datos.';
    }
  }

  get totalAmount(): number {
    return parseFloat(
      this.cart.items
        .reduce((sum: number, item: Curso) => sum + Math.floor(item.precio), 0)
        .toFixed(2)
    );
  }

  isInvalid(field: string): boolean {
    const ctrl = this.paymentForm.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating) ? 'pi pi-star-fill rating-star-filled' : 'pi pi-star rating-star-empty';
  }

  selectMethod(method: 'credit' | 'debit') {
    this.selectedMethod = method;
    if (this.mpReady && !this.cardNumberElement) {
      setTimeout(() => this.mountPCIFields(), 0);
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
        this.categoryMap[cat.id] = { label: cat.nombre, color: colorMap[key] || '#33CCFF' };
      });
    });
  }
}