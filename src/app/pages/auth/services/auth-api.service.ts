import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJwtPayload } from 'src/app/core/interfaces/auth/IAuth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true },
    );
  }

  profile(): Observable<IJwtPayload> {
    return this.http.get<IJwtPayload>(`${this.baseUrl}/profile`, { withCredentials: true });
  }
}
