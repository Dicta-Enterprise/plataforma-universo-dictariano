import { Component, OnInit, OnDestroy } from '@angular/core';
import { VerifyCodePresenter } from './verify-code.presenter';
import { interval, Subject, takeUntil } from 'rxjs';
import { ForgotPasswordFacade } from 'src/app/shared/patterns/facade/models/forgot-password.facade';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit, OnDestroy {
  tiempoRestante = 15 * 60;
  timerExpired = false;
  private destroy$ = new Subject<void>();

  constructor(
    public readonly presenter: VerifyCodePresenter,
    public readonly facade: ForgotPasswordFacade,
  ) {}

  ngOnInit(): void {
    this.presenter.createForm();
    this.iniciarTimer();
  }

  iniciarTimer(): void {
    this.tiempoRestante = 15 * 60;
    this.timerExpired = false;

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.tiempoRestante > 0) {
          this.tiempoRestante--;
        } else {
          this.timerExpired = true;
        }
      });
  }

  get timerFormateado(): string {
    const min = Math.floor(this.tiempoRestante / 60).toString().padStart(2, '0');
    const seg = (this.tiempoRestante % 60).toString().padStart(2, '0');
    return `${min}:${seg}`;
  }

  submit(): void {
    if (this.presenter.Invalid || this.timerExpired) return;
    this.presenter.MarkAllAsTouched();
    this.facade.verificarCodigo(this.presenter.Value.code);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.facade.destroy();
  }
}