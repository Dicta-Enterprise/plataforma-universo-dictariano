import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';
import { PrivacyPolicyContentComponent } from './privacy-policy-content/privacy-policy-content.component';
import { PrivacyPolicyModalComponent } from './privacy-policy-modal.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    PrivacyPolicyContentComponent,  
    PrivacyPolicyModalComponent,    
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    AuthThemeModule,
  ],
  exports: [
    PrivacyPolicyContentComponent, 
    PrivacyPolicyModalComponent,    
  ],
})
export class PrivacyPolicyModule {}
