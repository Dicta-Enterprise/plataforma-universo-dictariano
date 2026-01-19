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
    public readonly RegisterFormPresenter: RegisterFormPresenter,
    private readonly registerFacade: RegisterFacade
  ) {}

  ngOnInit(): void {
    this.RegisterFormPresenter.createForm();
  }

  submit(): void {
    if (this.RegisterFormPresenter.Invalid) {
      this.RegisterFormPresenter.MarkAllAsTouched();
      return;
    }

    this.registerFacade.registrarUsuario(
      this.RegisterFormPresenter.Value
    );
  }

  ngOnDestroy(): void {
    this.RegisterFormPresenter.destroy();
  }
}
