import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterFormPresenter } from './register-form.presenter';
import { RegisterFacade } from 'src/app/shared/patterns/facade/managment/register-facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(
    public readonly registerFormPresenter: RegisterFormPresenter,
    private readonly registerFacade: RegisterFacade
  ) {}

  ngOnInit(): void {
    this.registerFormPresenter.createForm();
  }

  submit(): void {
    if (this.registerFormPresenter.Invalid) {
      this.registerFormPresenter.MarkAllAsTouched();
      return;
    }

    this.registerFacade.registrarUsuario(
      this.registerFormPresenter.Value
    );
  }

  ngOnDestroy(): void {
    this.registerFacade.destroy();
  }
}
