import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class VerifyEmailService {
  private readonly baseUrl = `${environment.URL_BACKEND_AUTH}auth`;

  constructor(private http: HttpClient) {}

  verificarEmail(email: string, code: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/verify-email`,
      { email, code }
    );
  }
}