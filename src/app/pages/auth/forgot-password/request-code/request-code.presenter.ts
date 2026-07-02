import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ForgotPassword } from 'src/app/core/class/auth/forgot-password.class';
import { StepPresenter } from 'src/app/core/helpers/form/step.presenter';

@Injectable({ providedIn: 'root' })
export class RequestCodePresenter extends StepPresenter<ForgotPassword> {
  public email!: FormControl;

  constructor(private readonly fb: FormBuilder) { super(); }

  createForm(): void {
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.form = this.fb.group({ email: this.email });
  }
}