import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  private readonly baseUrl = 'http://localhost:3000/api/auth';

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