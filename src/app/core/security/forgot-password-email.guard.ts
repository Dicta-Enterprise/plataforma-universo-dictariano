import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { ForgotPasswordFacade } from 'src/app/shared/patterns/facade/models/forgot-password.facade';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordGuard implements CanActivate {
  constructor(
    private readonly facade: ForgotPasswordFacade,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.facade.email$.pipe(
      take(1),
      map(email => {
        if (!email) {
          return this.router.createUrlTree(['/auth/forgot-password/request-code']);
        }
        return true;
      }),
    );
  }
}

@Injectable({ providedIn: 'root' })
export class ForgotPasswordCodeGuard implements CanActivate {
  constructor(
    private readonly facade: ForgotPasswordFacade,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.facade.code$.pipe(
      take(1),
      map(code => {
        if (!code) {
          return this.router.createUrlTree(['/auth/forgot-password/request-code']);
        }
        return true;
      }),
    );
  }
}