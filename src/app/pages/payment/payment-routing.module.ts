import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { paymentResultGuard } from 'src/app/core/security/payment-result.guard';

const routes: Routes = [
  { path: '',       component: PaymentComponent },
  { path: 'result', component: PaymentResultComponent, canActivate: [paymentResultGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {}