import { Injectable } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { environment } from 'environments/environment';

@Injectable()
export class MercadoPagoFieldsService {

  private mp: any;

  cardNumberElement:     any;
  expirationDateElement: any;
  securityCodeElement:   any;

  docTypes:     { id: string; name: string }[] = [];
  issuers:      { id: string; name: string }[] = [];
  installments: { installments: number; recommended_message: string }[] = [];

  paymentMethodId      = '';
  requiresIssuer       = false;
  selectedIssuerId     = '';
  selectedInstallments = 1;

  async init(): Promise<void> {
    await loadMercadoPago();
    this.mp = new (window as any).MercadoPago(
      environment.mercadoPagoPublicKey,
      { locale: 'es-CO' }
    );
    await this.loadIdentificationTypes();
  }

  private async loadIdentificationTypes(): Promise<void> {
    try {
      this.docTypes = await this.mp.getIdentificationTypes();
    } catch (e) {
      console.error('Error obteniendo tipos de documento:', e);
      this.docTypes = [];
    }
  }

  mountPCIFields(onBinChange: (data: { bin: string }) => void): void {
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

    this.cardNumberElement.on('binChange', onBinChange);
  }

  unmount(): void {
    this.cardNumberElement?.unmount();
    this.expirationDateElement?.unmount();
    this.securityCodeElement?.unmount();
  }

  async handleBinChange(
    bin: string,
    totalAmount: number,
    selectedMethod: 'credit' | 'debit'
  ): Promise<void> {
    const { results } = await this.mp.getPaymentMethods({ bin });
    if (!results?.length) return;

    const paymentMethod  = results[0];
    this.paymentMethodId = paymentMethod.id;

    this.updatePCIFieldsSettings(paymentMethod);
    await this.loadIssuers(paymentMethod, bin);
    await this.loadInstallments(bin, totalAmount, selectedMethod);
  }

  private updatePCIFieldsSettings(paymentMethod: any): void {
    const { settings } = paymentMethod;
    if (!settings?.length) return;
    this.cardNumberElement.update({ settings: settings[0].card_number });
    this.securityCodeElement.update({ settings: settings[0].security_code });
  }

  private async loadIssuers(paymentMethod: any, bin: string): Promise<void> {
    const needsIssuer   = paymentMethod.additional_info_needed?.includes('issuer_id');
    this.requiresIssuer = needsIssuer;

    if (needsIssuer) {
      try {
        this.issuers = await this.mp.getIssuers({
          paymentMethodId: paymentMethod.id, bin
        });
      } catch (e) {
        console.error('Error obteniendo emisores:', e);
        this.issuers = [];
      }
    } else {
      this.issuers = paymentMethod.issuer ? [paymentMethod.issuer] : [];
    }
    this.selectedIssuerId = this.issuers[0]?.id ?? '';
  }

  private async loadInstallments(
    bin: string,
    totalAmount: number,
    selectedMethod: 'credit' | 'debit'
  ): Promise<void> {
    try {
      const response = await this.mp.getInstallments({
        amount:        String(totalAmount),
        bin,
        paymentTypeId: selectedMethod === 'credit' ? 'credit_card' : 'debit_card'
      });
      this.installments         = response?.[0]?.payer_costs ?? [];
      const one                 = this.installments.find(i => i.installments === 1);
      this.selectedInstallments = one?.installments ?? this.installments[0]?.installments ?? 1;
    } catch (e) {
      console.error('Error obteniendo cuotas:', e);
      this.installments = [];
    }
  }

  async createCardToken(data: {
    cardholderName:       string;
    identificationType:   string;
    identificationNumber: string;
  }): Promise<{ id: string }> {
    return this.mp.fields.createCardToken(data);
  }

  resetCardState(): void {
    this.paymentMethodId      = '';
    this.issuers              = [];
    this.installments         = [];
    this.requiresIssuer       = false;
    this.selectedInstallments = 1;
    this.selectedIssuerId     = '';
  }
}