import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/security/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  private hasToken(): boolean {
    return !!this.tokenStorage.getToken();
  }

  login(token: string): void {
    this.tokenStorage.setToken(token);
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.tokenStorage.clearToken();
    this.loggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getUserImg(): string {
    return 'https://randomuser.me/api/portraits/men/11.jpg';
  }
}