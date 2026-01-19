import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StepPresenter } from 'src/app/core/helpers/step.presenter';
import { RegisterManagment } from 'src/app/core/class/managment/register/Register-managment.class';
import { PasswordValidator } from 'src/app/core/validators/password.validator';
@Injectable({
  providedIn: 'root',
})
export class RegisterFormPresenter extends StepPresenter<RegisterManagment> {
  public username!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.username = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  }

  public createForm(): void {
    this.initForm();
    this.form = this.fb.group({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    }, {
        validators: PasswordValidator('password', 'confirmPassword'),
      });
  }
}
