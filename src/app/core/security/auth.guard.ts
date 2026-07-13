import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.sessionChecked$.pipe(
      filter((checked) => checked === true),
      take(1),
      map(() => {
        if (this.authService.isLoggedIn()) {
          return true;
        }
        sessionStorage.setItem('returnUrl', state.url);

        this.router.navigate(['/auth/register']);
        return false;
      })
    );
  }
}