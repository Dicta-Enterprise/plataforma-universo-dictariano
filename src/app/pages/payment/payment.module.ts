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

@NgModule({
  declarations: [PaymentComponent],
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
  ]
})
export class PaymentModule {}