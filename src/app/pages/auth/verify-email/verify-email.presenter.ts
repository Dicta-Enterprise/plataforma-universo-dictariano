import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StepPresenter } from 'src/app/core/helpers/form/step.presenter';

@Injectable({ providedIn: 'root' })
export class VerifyEmailPresenter extends StepPresenter<{ code: string }> {
  public code!: FormControl;

  constructor(private readonly fb: FormBuilder) { super(); }

  createForm(): void {
    this.code = new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern(/^\d{6}$/),
    ]);
    this.form = this.fb.group({ code: this.code });
  }
}