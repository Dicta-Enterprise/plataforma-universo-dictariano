import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { RegisterFacade } from 'src/app/shared/patterns/facade/models/register-facade';

@Injectable({ providedIn: 'root' })
export class VerifyEmailGuard implements CanActivate {
  constructor(
    private readonly registerFacade: RegisterFacade,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.registerFacade.email$.pipe(
      take(1),
      map(email => {
        const sessionEmail = sessionStorage.getItem('pendingVerifyEmail');
        if (!email && !sessionEmail) {
          return this.router.createUrlTree(['/auth/register']);
        }
        return true;
      }),
    );
  }
}