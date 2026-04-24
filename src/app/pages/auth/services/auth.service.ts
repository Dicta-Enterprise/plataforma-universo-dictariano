import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
  ) {}

  checkSession(): void {
    this.authApiService.profile().subscribe({
      next: () => this.loggedInSubject.next(true),
      error: () => this.loggedInSubject.next(false),
    });
  }

  login(): void {
    this.loggedInSubject.next(true);
  }

  logout(): void {
    this.authApiService.logout().subscribe({
      next: () => {
        this.loggedInSubject.next(false);
        localStorage.removeItem('userData');
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

  // ── NUEVO: persiste el objeto usuario que devuelve el backend ─────────────
  // Llámalo en el facade tras login exitoso si la respuesta trae el usuario
  setSession(user: { id?: number; idusuario?: number; token?: string; img?: string }): void {
    localStorage.setItem('userData', JSON.stringify(user));
    this.loggedInSubject.next(true);
  }

  // ── NUEVO: devuelve el id del usuario para el body de /api/orders ─────────
  getCurrentUserId(): number {
    try {
      const raw = localStorage.getItem('userData');
      if (!raw) return 0;
      const user = JSON.parse(raw);
      return user.id ?? user.idusuario ?? 0;
    } catch {
      return 0;
    }
  }
}