import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
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
    const user = this.userSubject.value;
    return user?.sub ?? null;
  }

  login(): void {
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.authApiService.logout().subscribe({
      next: () => {
        this.loggedInSubject.next(false);
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
