import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Simula el usuario autenticado
  private _isAuthenticated = false;
  private _userImg = '';

  private userImgSubject = new BehaviorSubject<string>('https://randomuser.me/api/portraits/men/11.jpg');
public userImg$ = this.userImgSubject.asObservable();
  constructor() {
    // Si ya tienes login real, aquí pondrías la lógica real
    // Para demo:
    this._isAuthenticated = !!localStorage.getItem('userToken');
    this._userImg = localStorage.getItem('userImg') || '';
  }

  isLoggedIn(): boolean {
    return this._isAuthenticated;
  }

  updateUserImg(url: string): void {
  this.userImgSubject.next(url);
}

  getUserImg(): string {
    return this.userImgSubject.getValue(); // Placeholder
  }

  // Demo login/logout:
  loginDemo() {
    this._isAuthenticated = true;
    this._userImg = 'https://randomuser.me/api/portraits/men/11.jpg';
    localStorage.setItem('userToken', 'demo');
    localStorage.setItem('userImg', this._userImg);
  }

  logoutDemo() {
    this._isAuthenticated = false;
    this._userImg = '';
    localStorage.removeItem('userToken');
    localStorage.removeItem('userImg');
  }
}
