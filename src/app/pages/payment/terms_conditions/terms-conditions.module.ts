import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionsRoutingModule } from './terms-conditions-routing.module';
import { TermsConditionsComponent } from './terms-conditions.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';
import { TermsConditionsContentComponent } from './terms-conditions-content/terms-conditions-content.component';

@NgModule({
  declarations: [
    TermsConditionsComponent,
  ],
  imports: [
    CommonModule,
    TermsConditionsRoutingModule,
    AuthThemeModule,
    TermsConditionsContentComponent
  ],
  exports: [
    TermsConditionsContentComponent
  ],
})
export class TermsConditionsModule {}