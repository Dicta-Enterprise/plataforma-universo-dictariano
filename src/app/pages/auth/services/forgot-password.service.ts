import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  private readonly baseUrl = `${environment.URL_BACKEND_AUTH}auth`;

  constructor(private http: HttpClient) {}

  solicitarCodigo(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/forgot-password`,
      { email }
    );
  }

  verificarCodigo(email: string, code: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/verify-reset-code`,
      { email, code }
    );
  }

  resetPassword(email: string, code: string, newPassword: string, confirmPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/reset-password`,
      { email, code, newPassword, confirmPassword }
    );
  }
}