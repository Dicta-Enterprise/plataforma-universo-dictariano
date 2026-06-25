import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResetPasswordPresenter } from './reset-password.presenter';
import { ForgotPasswordFacade } from 'src/app/shared/patterns/facade/models/forgot-password.facade';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    public readonly presenter: ResetPasswordPresenter,
    public readonly facade: ForgotPasswordFacade,
  ) {}

  ngOnInit(): void { this.presenter.createForm(); }

  submit(): void {
    if (this.presenter.Invalid) {
      this.presenter.MarkAllAsTouched();
      return;
    }
    const { newPassword, confirmPassword } = this.presenter.Value;
    this.facade.resetPassword(newPassword, confirmPassword);
  }

  ngOnDestroy(): void { this.facade.destroy(); }

  get passwordRules() {
    const value = this.presenter.Form.get('newPassword')?.value || '';
    return {
      minLength:  value.length >= 8,
      hasUpper:   /[A-Z]/.test(value),
      hasLower:   /[a-z]/.test(value),
      hasNumber:  /\d/.test(value),
      hasSymbol:  /[\W_]/.test(value),
    };
  }
}