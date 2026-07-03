import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { StepPresenter } from 'src/app/core/helpers/form/step.presenter';
import { Register } from 'src/app/core/class/auth/register.class';
import { PasswordValidator } from 'src/app/core/validators/password.validator';
@Injectable({
  providedIn: 'root',
})
export class RegisterFormPresenter extends StepPresenter<Register> {
  public username!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public confirmPassword!: FormControl;
  public acceptTerms!: FormControl;

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  public initForm(): void {
    this.username = new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]);
    
    this.email = new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) 
    ]);
    this.password = new FormControl(null, [Validators.required]);
    this.confirmPassword = new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.acceptTerms = new FormControl(false, [Validators.requiredTrue]);
  }



  public createForm(): void {
    this.initForm();
    this.form = this.fb.group(
      {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        acceptTerms: this.acceptTerms, 
      },
      {
        validators: PasswordValidator('password', 'confirmPassword'),
      },
    );
  }
}
