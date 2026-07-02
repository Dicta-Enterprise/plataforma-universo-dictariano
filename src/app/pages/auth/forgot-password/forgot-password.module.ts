import { NgModule } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { AuthThemeModule } from 'src/app/core/themes/auth/auth-primeng.module';
import { SharedDirectiveModule } from 'src/app/shared/directive/shared-directive.module';
import { RequestCodeComponent } from './request-code/request-code.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    RequestCodeComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
  ],
  imports: [
    ForgotPasswordRoutingModule,
    AuthThemeModule,
    SharedDirectiveModule,
  ],
})
export class ForgotPasswordModule {}