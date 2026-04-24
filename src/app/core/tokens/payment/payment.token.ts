import { InjectionToken } from '@angular/core';
import { PaymentRepository } from '../../repositories/payment/payment.repository';

export const PAYMENT_REPOSITORY = new InjectionToken<PaymentRepository>(
  'PAYMENT_REPOSITORY'
);