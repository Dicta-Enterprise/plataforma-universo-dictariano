import { NgModule } from '@angular/core';
import { VerifyEmailRoutingModule } from './verify-email-routing.module';
import { VerifyEmailComponent } from './verify-email.component';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [
    VerifyEmailRoutingModule,
    AuthThemeModule,
    SharedDirectiveModule,
  ],
})
export class VerifyEmailModule {}