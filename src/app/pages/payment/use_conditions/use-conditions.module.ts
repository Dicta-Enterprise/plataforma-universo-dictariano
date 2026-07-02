import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsRoutingModule } from './use-conditions-routing.module';
import { TermsConditionsComponent } from './use-conditions.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';

@NgModule({
  declarations: [TermsConditionsComponent],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
    AuthThemeModule,
  ],
})
export class TermsConditionsModule {}
