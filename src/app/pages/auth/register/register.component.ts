import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterFormPresenter } from './register-form.presenter';
import { RegisterFacade } from 'src/app/shared/patterns/facade/models/register-facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  mostrarModal = false;
  politicaLeida = false;

  constructor(
    public readonly registerFormPresenter: RegisterFormPresenter,
    private readonly registerFacade: RegisterFacade
  ) {}

  ngOnInit(): void {
    this.registerFormPresenter.createForm();
    this.registerFormPresenter.Form.get('acceptTerms')?.disable();
  }

  abrirPolitica(): void {
    this.mostrarModal = true;
  }

  onPoliticaLeida(): void {
    this.politicaLeida = true;
    this.registerFormPresenter.Form.get('acceptTerms')?.enable();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  submit(): void {
    if (!this.politicaLeida) {
      return;
    }

    if (this.registerFormPresenter.Form.invalid) {
      this.registerFormPresenter.MarkAllAsTouched();
      return;
    }

    this.registerFacade.registrarUsuario(this.registerFormPresenter.Value);
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:3000/api/auth/google';
  }

  ngOnDestroy(): void {
    this.registerFacade.destroy();
  }
}