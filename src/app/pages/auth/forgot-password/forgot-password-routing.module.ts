import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestCodeComponent } from './request-code/request-code.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordCodeGuard, ForgotPasswordGuard } from 'src/app/core/security/forgot-password-email.guard';

const routes: Routes = [
  { path: 'request-code',  component: RequestCodeComponent },
  { path: 'verify-code',   component: VerifyCodeComponent, canActivate: [ForgotPasswordGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [ForgotPasswordCodeGuard] },
  { path: '', redirectTo: 'request-code', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}