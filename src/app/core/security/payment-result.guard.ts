// src/app/core/security/payment-result.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const paymentResultGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasData = !!sessionStorage.getItem('payment_result_items');

  if (!hasData) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};