import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPopupComponent } from './cart-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CartPopupComponent],
  imports: [
    CommonModule,   
    SharedModule,  
    ButtonModule,  
  ],
  exports: [
    CartPopupComponent  
  ]
})
export class CartPopupModule { }