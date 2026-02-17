import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private router: Router
  ) {}

  login(): void {
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.loggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUserImg(): string {
    return 'https://randomuser.me/api/portraits/men/11.jpg';
  }
}