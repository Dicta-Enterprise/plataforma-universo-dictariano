import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ResetPassword } from 'src/app/core/class/auth/forgot-password.class';
import { StepPresenter } from 'src/app/core/helpers/form/step.presenter';
import { PasswordValidator } from 'src/app/core/validators/password.validator';

@Injectable({ providedIn: 'root' })
export class ResetPasswordPresenter extends StepPresenter<ResetPassword> {
  public newPassword!: FormControl;
  public confirmPassword!: FormControl;

  constructor(private readonly fb: FormBuilder) { super(); }

  createForm(): void {
    this.newPassword = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirmPassword = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.form = this.fb.group(
      {
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword,
      },
      {
        validators: PasswordValidator('newPassword', 'confirmPassword'), 
      },
    );
  }
}