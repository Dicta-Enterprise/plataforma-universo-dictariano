import { Component, OnInit, OnDestroy } from '@angular/core';
import { VerifyEmailPresenter } from './verify-email.presenter';
import { VerifyEmailFacade } from 'src/app/shared/patterns/facade/models/verify-email.facade';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  tiempoRestante = 10 * 60;
  timerExpired = false;
  private destroy$ = new Subject<void>();

  constructor(
    public readonly presenter: VerifyEmailPresenter,
    public readonly facade: VerifyEmailFacade,
  ) {}

  ngOnInit(): void {
    this.presenter.createForm();
    this.iniciarTimer();
  }

  iniciarTimer(): void {
    const EXPIRACION_MS = 1 * 60 * 1000; // 1 minutos
    const sentAt = sessionStorage.getItem('verifyCodeSentAt');

    if (sentAt) {
      const elapsed = Date.now() - parseInt(sentAt);
      const remaining = Math.floor((EXPIRACION_MS - elapsed) / 1000);
      this.tiempoRestante = remaining > 0 ? remaining : 0;
    } else {
      this.tiempoRestante = EXPIRACION_MS / 1000;
    }

    if (this.tiempoRestante <= 0) {
      this.timerExpired = true;
      return;
    }

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
    this.facade.verificarEmail(this.presenter.Value.code);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.facade.destroy();
  }
}