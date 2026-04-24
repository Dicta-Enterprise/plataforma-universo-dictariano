import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';
import { environment } from '../../../../environments/environment';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { CategoriaFacade } from 'src/app/shared/patterns/facade/models/categoria-facade';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {

  // ── Stepper ───────────────────────────────────────────────────────────────
  steps: MenuItem[] = [
    { label: 'Detalles del carrito' },
    { label: 'Inicia sesión' },
    { label: 'Proceder al pago' }
  ];

  // ── Estado general ────────────────────────────────────────────────────────
  selectedMethod: 'credit' | 'debit' | null = null;
  selectedInstallments: number = 1;
  selectedIssuerId: string = '';
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  // ── Formulario (solo campos NO-PCI) ───────────────────────────────────────
  paymentForm!: FormGroup;

  // ── Mercado Pago SDK ──────────────────────────────────────────────────────
  mp: any;
  cardNumberElement: any;
  expirationDateElement: any;
  securityCodeElement: any;

  // Indica si el SDK ya está listo para montar los iframes
  private mpReady = false;

  // ── Datos dinámicos desde la API de MP ────────────────────────────────────
  docTypes:     { id: string; name: string }[] = [];
  issuers:      { id: string; name: string }[] = [];
  installments: { installments: number; recommended_message: string }[] = [];

  paymentMethodId = '';
  cardBrand       = '';
  requiresIssuer  = false;

  // ── Categorías ────────────────────────────────────────────────────────────
  categoryMap: Record<string, { label: string; color: string }> = {};
  defaultCategory = { label: 'Público', color: '#33CCFF' };
  stars = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public cart: CartService,
    private authService: AuthService,
    private categoriaFacade: CategoriaFacade,
    private cdr: ChangeDetectorRef   // ← necesario para forzar detección después del SDK
  ) {}

  // ══════════════════════════════════════════════════════════════════════════
  // LIFECYCLE
  // ══════════════════════════════════════════════════════════════════════════

  async ngOnInit() {
    if (this.cart.items.length === 0) {
      this.router.navigate(['/cart']);
      return;
    }
    this.loadCategorias();
    this.buildForm();

    // Carga el SDK y los tipos de documento.
    // NO se montan los iframes aquí porque el DOM todavía no existe.
    await this.initMercadoPago();
  }

  ngAfterViewInit() {
    // El DOM ya está renderizado. Si el SDK terminó de cargar, monta los iframes.
    // Si aún no terminó, el flag mpReady lo activará en initMercadoPago().
    if (this.mpReady) {
      this.mountPCIFields();
    }
  }

  ngOnDestroy() {
    this.cardNumberElement?.unmount();
    this.expirationDateElement?.unmount();
    this.securityCodeElement?.unmount();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // INICIALIZACIÓN
  // ══════════════════════════════════════════════════════════════════════════

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
    this.mp = new (window as any).MercadoPago(
      environment.mercadoPagoPublicKey,
      { locale: 'es-CO' }
    );

    await this.loadIdentificationTypes();

    // Marca el SDK como listo.
    // Si ngAfterViewInit ya corrió (caso normal en async), monta ahora.
    // Si no (SDK muy rápido), ngAfterViewInit lo montará al finalizar.
    this.mpReady = true;

    if (document.getElementById('form-checkout__cardNumber')) {
      this.mountPCIFields();
    }
    // Si los divs aún no existen (no debería ocurrir, pero por seguridad):
    // ngAfterViewInit se encargará gracias al flag mpReady.
  }

  // ── Tipos de documento ────────────────────────────────────────────────────
  private async loadIdentificationTypes() {
    try {
      const types = await this.mp.getIdentificationTypes();
      this.docTypes = types;
      if (types.length > 0) {
        this.paymentForm.get('docType')?.setValue(types[0].id);
      }
    } catch (e) {
      console.error('Error obteniendo tipos de documento:', e);
    }
  }

  // ── Campos PCI — iframes de Mercado Pago ─────────────────────────────────
  // PRE-CONDICIÓN: los tres <div> con los IDs correspondientes ya están en el DOM.
  private mountPCIFields() {
    // Guarda contra doble mount (puede llamarse desde ngAfterViewInit e initMercadoPago)
    if (this.cardNumberElement) return;

    this.cardNumberElement = this.mp.fields
      .create('cardNumber', { placeholder: '1234 5678 9012 3456' })
      .mount('form-checkout__cardNumber');

    this.expirationDateElement = this.mp.fields
      .create('expirationDate', { placeholder: 'MM/YY' })
      .mount('form-checkout__expirationDate');

    this.securityCodeElement = this.mp.fields
      .create('securityCode', { placeholder: 'CVV' })
      .mount('form-checkout__securityCode');

    // Listener binChange: se dispara cada vez que cambian los primeros 6 dígitos
    this.cardNumberElement.on('binChange', async (data: { bin: string }) => {
      const { bin } = data;

      if (!bin) {
        this.resetCardState();
        return;
      }

      try {
        const { results } = await this.mp.getPaymentMethods({ bin });
        if (!results?.length) return;

        const paymentMethod   = results[0];
        this.paymentMethodId  = paymentMethod.id;
        this.cardBrand        = paymentMethod.id;

        this.updatePCIFieldsSettings(paymentMethod);
        await this.loadIssuers(paymentMethod, bin);
        await this.loadInstallments(bin);

        // Fuerza detección de cambios porque estamos en una Promise fuera de Zone.js
        this.cdr.detectChanges();

      } catch (e) {
        console.error('Error en binChange:', e);
      }
    });
  }

  private updatePCIFieldsSettings(paymentMethod: any) {
    const { settings } = paymentMethod;
    if (!settings?.length) return;
    this.cardNumberElement.update({ settings: settings[0].card_number });
    this.securityCodeElement.update({ settings: settings[0].security_code });
  }

  // ── Emisores ──────────────────────────────────────────────────────────────
  private async loadIssuers(paymentMethod: any, bin: string) {
    const needsIssuer = paymentMethod.additional_info_needed?.includes('issuer_id');
    this.requiresIssuer = needsIssuer;

    if (needsIssuer) {
      try {
        this.issuers = await this.mp.getIssuers({ paymentMethodId: paymentMethod.id, bin });
        this.selectedIssuerId = this.issuers[0]?.id ?? '';
      } catch (e) {
        console.error('Error obteniendo emisores:', e);
        this.issuers = [];
      }
    } else {
      this.issuers = paymentMethod.issuer ? [paymentMethod.issuer] : [];
      this.selectedIssuerId = this.issuers[0]?.id ?? '';
    }
  }

  // ── Cuotas dinámicas ──────────────────────────────────────────────────────
  private async loadInstallments(bin: string) {
    try {
      const response = await this.mp.getInstallments({
        amount:        String(this.totalAmount),
        bin,
        paymentTypeId: this.selectedMethod === 'credit' ? 'credit_card' : 'debit_card'
      });

      this.installments = response?.[0]?.payer_costs ?? [];
      const one = this.installments.find(i => i.installments === 1);
      this.selectedInstallments = one?.installments ?? this.installments[0]?.installments ?? 1;

    } catch (e) {
      console.error('Error obteniendo cuotas:', e);
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

  // ══════════════════════════════════════════════════════════════════════════
  // SUBMIT
  // ══════════════════════════════════════════════════════════════════════════

  async submit() {
    if (!this.selectedMethod || this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting   = true;
    this.errorMessage   = '';
    this.successMessage = '';
    const form = this.paymentForm.value;

    try {
      const cardToken = await this.mp.fields.createCardToken({
        cardholderName:       form.holder,
        identificationType:   form.docType,
        identificationNumber: form.docNumber,
      });

      const detalleOrden = this.cart.items.map((item: any) => ({
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
          fechapago: new Date().toISOString(),
          monto: parseFloat(Math.floor(this.totalAmount).toFixed(2)), // 1154.00
          nombrepagante: form.holder,
          emailpagante: form.email,
          moneda: 'COP',
          metodopago: this.paymentMethodId || 'master',
          tipotarjeta: this.selectedMethod === 'credit' ? 'credit_card' : 'debit_card',
          token: cardToken.id,
          cuotas: this.selectedMethod === 'debit' ? 1 : this.selectedInstallments,
          processing_mode: 'automatic',
        }
      };

      this.http.post(`${environment.URL_BACKEND_TRANSACTION}orders`, body).subscribe({
        next: (res: any) => {
          this.isSubmitting = false;
          const estado = res?.data?.estadoOrden; // ← agregar .data

          if (estado === 'processed' || estado === 'COMPLETADO') {
            this.successMessage = '¡Pago exitoso! Revisa tu correo.';
            this.cart.clearCart();
            setTimeout(() => this.router.navigate(['/mis-cursos']), 2000);
          } else if (estado === 'processing') {
            this.successMessage = 'Pago en proceso. Te notificaremos por correo cuando se confirme.';
            this.cart.clearCart();
            setTimeout(() => this.router.navigate(['/mis-cursos']), 3000);
          } else {
            this.errorMessage = 'Pago no aprobado por la entidad bancaria. Intenta con otra tarjeta.';
          }
        }
      });

    } catch (error: any) {
      this.isSubmitting = false;
      this.errorMessage = 'No se pudo procesar la tarjeta. Verifica los datos.';
      console.error('Error tokenizando con MP:', error);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════════════════════

  get totalAmount(): number {
    const total = this.cart.items.reduce(
      (sum: number, item: any) => sum + Math.floor(item.precio), 0
    );
    return parseFloat(total.toFixed(2)); // ej: 1154.00
  }

  isInvalid(field: string): boolean {
    const ctrl = this.paymentForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  getStarClass(rating: number, star: number) {
    return star <= Math.round(rating)
      ? 'pi pi-star-fill rating-star-filled'
      : 'pi pi-star rating-star-empty';
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

  
}