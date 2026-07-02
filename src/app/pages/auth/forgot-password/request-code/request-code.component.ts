import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestCodePresenter } from './request-code.presenter';
import { ForgotPasswordFacade } from 'src/app/shared/patterns/facade/models/forgot-password.facade';

@Component({
  selector: 'app-request-code',
  templateUrl: './request-code.component.html',
  styleUrls: ['./request-code.component.css']
})
export class RequestCodeComponent implements OnInit, OnDestroy {
  constructor(
    public readonly presenter: RequestCodePresenter,
    public readonly facade: ForgotPasswordFacade,
  ) {}

  ngOnInit(): void { this.presenter.createForm(); }

  submit(): void {
    if (this.presenter.Invalid) {
      this.presenter.MarkAllAsTouched();
      return;
    }
    this.facade.solicitarCodigo(this.presenter.Value.email);
  }

  ngOnDestroy(): void { this.facade.destroy(); }
}