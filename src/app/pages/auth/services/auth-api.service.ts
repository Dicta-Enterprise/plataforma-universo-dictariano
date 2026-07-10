import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJwtPayload } from 'src/app/core/interfaces/auth/IAuth.interface';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly baseUrl = `${environment.URL_BACKEND_AUTH}auth`;

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
