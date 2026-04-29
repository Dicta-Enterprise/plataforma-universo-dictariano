import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { StepsModule } from 'primeng/steps';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentFormPresenter } from './payment-form.presenter';
import { PaymentApiService } from './services/payment-api.service';
import { MercadoPagoFieldsService } from './services/mercadopago-fields.service';
import { PAYMENT_REPOSITORY } from 'src/app/core/tokens/payment/payment.token';
import { PaymentResultComponent } from './payment-result/payment-result.component';

@NgModule({
  declarations: [PaymentComponent,
    PaymentResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,         
    PaymentRoutingModule,
    StepsModule,
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    DataViewModule,
    StepsModule,
    SharedModule,
  ],
  providers: [
    PaymentFormPresenter,
    MercadoPagoFieldsService,
    {
      provide:  PAYMENT_REPOSITORY,
      useClass: PaymentApiService,
    },
  ],
})
export class PaymentModule {}