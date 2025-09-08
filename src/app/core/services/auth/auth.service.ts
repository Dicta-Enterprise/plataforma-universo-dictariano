//Cuando conecte .NET, solo cambiar register() y login() para usar HttpClient y quita la “DB simulada”.

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSession, AuthUser } from 'src/app/core/class/auth/auth-session.class';

type UserStored = AuthUser & { password: string }; // simulamos almacenamiento

const SESSION_KEY = 'AUTH_SESSION';
const USERS_KEY   = 'AUTH_USERS'; // “base de datos” simulada

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  // ========= Session handling =========
  // lee primero sessionStorage, si no hay, intenta localStorage
  getSession(): AuthSession | null {
    const fromSession = sessionStorage.getItem(SESSION_KEY);
    const raw = fromSession ?? localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  }

  // guarda siempre en sessionStorage por defecto
  setSession(s: AuthSession | null) {
    if (s) sessionStorage.setItem(SESSION_KEY, JSON.stringify(AuthSession.toJson(s)));
    else {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY); // por si estaba “recordada”
    }
  }

  /** Si remember=true, copia la sesión actual a localStorage (persistente). */
  persistCurrentSession(remember: boolean) {
    const s = this.getSession();
    if (!s) return;
    if (remember) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(AuthSession.toJson(s)));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  // logout ya limpia ambas memorias:
  logout() {
    this.setSession(null);
    this.router.navigateByUrl('/auth/login');
  }

  /** ¿Hay sesión válida? */
  isLoggedIn(): boolean {
    return !!this.getSession();
  }

  /** Devuelve el avatar del usuario logueado (o uno por defecto). */
  getUserImg(): string {
    return (
      this.getSession()?.user?.avatar ||
      'https://ui-avatars.com/api/?name=U&background=0ea5e9&color=fff'
    );
  }


  // ========= “DB” simulada =========
  private loadUsers(): UserStored[] {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as UserStored[]) : [];
  }
  private saveUsers(users: UserStored[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // ========= Register/Login estrictos =========
  async register(nombre: string, email: string, password: string): Promise<void> {
    // validaciones mínimas
    if (!nombre.trim()) throw new Error('El nombre es obligatorio');
    if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error('Email inválido');
    if (password.length < 6) throw new Error('La contraseña debe tener 6+ caracteres');

    const users = this.loadUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) throw new Error('Ya existe una cuenta con ese email');

    const newUser: UserStored = {
      id: Date.now(),
      nombre,
      email,
      password,       // (queda plano mientras no haya backend)
      avatar: '',
    };
    users.push(newUser);
    this.saveUsers(users);
    // NO logueamos automáticamente: el equipo pidió volver al login
  }

  async login(email: string, password: string): Promise<void> {
    const users = this.loadUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      // cuenta inexistente o password incorrecta
      throw new Error('Credenciales inválidas. Verifica tu email/contraseña o regístrate.');
    }

    const session: AuthSession = {
      access_token: 'fake-token-' + user.id,
      user: { id: user.id, nombre: user.nombre, email: user.email, avatar: user.avatar }
    };
    this.setSession(session);
  }
}
