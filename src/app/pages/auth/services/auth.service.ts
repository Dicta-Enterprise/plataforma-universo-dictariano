import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CartStorageService } from 'src/app/core/services/cart/cart-storage.service';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { IJwtPayload } from 'src/app/core/interfaces/auth/IAuth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<IJwtPayload | null>(null);
  public user$ = this.userSubject.asObservable();
  public isLoggedIn$ = this.user$.pipe(map(user => !!user)); 

  private userImgSubject = new BehaviorSubject<string>('https://randomuser.me/api/portraits/men/11.jpg');
  public userImg$ = this.userImgSubject.asObservable();

  private sessionCheckedSubject = new BehaviorSubject<boolean>(false);
  public sessionChecked$ = this.sessionCheckedSubject.asObservable();

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private cartService: CartService,
    private cartStorage: CartStorageService,
    private cursosService: CursosService
  ) {}

  updateUserImg(url: string): void {
    this.userImgSubject.next(url);
  }

  checkSession(): Promise<void> {
    return new Promise(resolve => {
      this.authApiService.profile().subscribe({
        next: (user: IJwtPayload) => {
          this.userSubject.next(user);
          const userId = parseInt(user.sub, 10);
          this.cartService.setUserSession(true, userId);
          this.cartStorage.clearExpiration(); 
          this.sessionCheckedSubject.next(true);
          resolve();
        },
        error: () => {
          this.userSubject.next(null);
          this.cartService.setUserSession(false, null);
          this.cartStorage.restoreExpiration(); 
          this.sessionCheckedSubject.next(true);
          resolve();
        },
      });
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
      this.sessionCheckedSubject.next(true);

      const userId = parseInt(user.sub, 10);
      this.cartService.setUserSession(true, userId);

      const cursosResolver = (ids: string[]) =>
        this.cursosService.listarCursosService$().pipe(
          map(todos => todos.filter(c => ids.includes(String(c.id))))
        );

      this.cartService.syncAfterLogin(userId, cursosResolver)
        .pipe(take(1))
        .subscribe({
          complete: () => {
            this.cartStorage.clearExpiration();
            this.navigateAfterLogin();
          },
          error: () => {
            this.navigateAfterLogin();
          }
        });
    });
  }

  private navigateAfterLogin(): void {
    const returnUrl = sessionStorage.getItem('returnUrl');

    if (returnUrl) {
      sessionStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    this.userSubject.next(null);
    this.sessionCheckedSubject.next(true); 
    this.cartService.setUserSession(false, null);
    this.cartStorage.restoreExpiration();

    this.authApiService.logout().subscribe();
    
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUserImg(): string {
    return this.userImgSubject.getValue();
  }
}