import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginFormPresenter } from './login-form.presenter';
import { LoginFacade } from 'src/app/shared/patterns/facade/managment/login-facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    public readonly loginFormPresenter: LoginFormPresenter,
    private readonly loginFacade: LoginFacade
  ) {}

  ngOnInit(): void {
    this.loginFormPresenter.createForm();
  }

  submit(): void {
    if (this.loginFormPresenter.Invalid) {
      this.loginFormPresenter.MarkAllAsTouched();
      return;
    }

    this.loginFacade.iniciarSesion(
      this.loginFormPresenter.Value
    );
  }

  ngOnDestroy(): void {
    this.loginFacade.destroy();
  }
}
