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
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<IJwtPayload | null>(null);
  public user$ = this.userSubject.asObservable();

  private userImgSubject = new BehaviorSubject<string>('https://randomuser.me/api/portraits/men/11.jpg');
  public userImg$ = this.userImgSubject.asObservable();

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
      this.cartStorage.clearExpiration();

      const cursosResolver = (ids: string[]) =>
        this.cursosService.listarCursosService$().pipe(
          map(todos => todos.filter(c => ids.includes(String(c.id))))
        );

      this.cartService.syncAfterLogin(userId, cursosResolver).pipe(take(1)).subscribe();

      const returnUrl = sessionStorage.getItem('returnUrl') || '/';
      sessionStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    });
  }

  logout(): void {
    this.authApiService.logout().subscribe({
      next: () => {
        const userId = this.getUserId(); // obtén el id antes de limpiar
        this.loggedInSubject.next(false);
        this.userSubject.next(null);
        this.cartService.setUserSession(false, null);
        this.cartStorage.restoreExpiration();
        if (userId) {
          this.cartStorage.clearCarritoId(parseInt(userId, 10));
        }
        this.router.navigate(['/auth/login']);
      },
    });
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUserImg(): string {
    return this.userImgSubject.getValue();
  }
}