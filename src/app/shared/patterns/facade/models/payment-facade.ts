import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PAYMENT_REPOSITORY } from 'src/app/core/tokens/payment/payment.token';
import { PaymentRepository } from 'src/app/core/repositories/payment/payment.repository';
import { CrearOrdenRequest } from 'src/app/core/class/payment/payment.request.class';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Injectable({ providedIn: 'root' })
export class PaymentFacade implements OnDestroy {

  private destroy$ = new Subject<void>();

  successMessage = '';
  errorMessage   = '';
  isSubmitting   = false;

  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: PaymentRepository,
    private readonly cart: CartService,
    private readonly router: Router
  ) {}

  crearOrden(request: CrearOrdenRequest): void {
    this.isSubmitting  = true;
    this.successMessage = '';
    this.errorMessage   = '';

    this.paymentRepository.crearOrden(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;

          if (res.estadoOrden === 'processed' || res.estadoOrden === 'COMPLETADO') {
            this.successMessage = '¡Pago exitoso! Revisa tu correo.';
            this.cart.clearCart();
            setTimeout(() => this.router.navigate(['/mis-cursos']), 2000);
          } else if (res.estadoOrden === 'processing') {
            this.successMessage = 'Pago en proceso. Te notificaremos por correo.';
            this.cart.clearCart();
            setTimeout(() => this.router.navigate(['/mis-cursos']), 3000);
          } else {
            this.errorMessage = 'Pago no aprobado por la entidad bancaria.';
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.status === 400
            ? 'Datos inválidos. Revisa la información ingresada.'
            : 'Error en el servidor. Intenta nuevamente.';
        }
      });
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}