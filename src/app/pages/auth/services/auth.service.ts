import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { IJwtPayload } from 'src/app/core/interfaces/auth/IAuth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<IJwtPayload | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private cartService: CartService
  ) {}

  checkSession(): void {
    this.authApiService.profile().subscribe({
      next: (user: IJwtPayload) => {
        this.userSubject.next(user);
        this.loggedInSubject.next(true);
      },
      error: () => {
        this.loggedInSubject.next(false);
        this.userSubject.next(null);
      },
    });
  }

  getUserId(): string | null {
    return this.userSubject.value?.sub ?? null;
  }

  login(): void {
    this.authApiService.profile().pipe(
      filter((user): user is IJwtPayload => !!user),
      take(1)
    ).subscribe(user => {
      this.userSubject.next(user);
      this.loggedInSubject.next(true);

      const userId = parseInt(user.sub, 10);
      this.cartService.setUserSession(true, userId);
      this.cartService.syncAfterLogin(userId).pipe(take(1)).subscribe({
        next: res => {
          if (res?.id) this.cartService.saveCarritoIdForUser(userId, res.id);
        }
      });

      const returnUrl = sessionStorage.getItem('returnUrl') || '/';
      sessionStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    });
  }

  logout(): void {
    this.authApiService.logout().subscribe({
      next: () => {
        this.loggedInSubject.next(false);
        this.userSubject.next(null);
        this.cartService.setUserSession(false, null);
        this.router.navigate(['/auth/login']);
      },
    });
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUserImg(): string {
    return 'https://randomuser.me/api/portraits/men/11.jpg';
  }
}