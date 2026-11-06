import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import {
  ICertificateIssued,
  ICertificatePayload,
  ICertificatePublic,
  ICertificateVerification,
} from '../../interfaces/certificates/ICertificate.interface';

@Injectable({ providedIn: 'root' })
export class CertificatesApiService {
  private readonly base = environment.URL_BACKEND_CERTIFICADOS;

  constructor(private http: HttpClient) {}

  /** Emite un certificado (idealmente lo llama tu backend principal, no el navegador). */
  emitir(payload: ICertificatePayload): Observable<ICertificateIssued> {
    return this.http.post<ICertificateIssued>(`${this.base}api/certificados`, payload);
  }

  /** URL directa para descargar el PDF (úsala en un <a [href]>). */
  urlPdf(id: string): string {
    return `${this.base}api/certificados/${id}/pdf`;
  }

  /** Datos públicos de un certificado (para la página a la que lleva el QR). */
  obtenerPublico(id: string): Observable<ICertificatePublic> {
    return this.http.get<ICertificatePublic>(`${this.base}api/certificados/${id}`);
  }

  /** Verifica un PDF subido comparando su hash con el registro y la prueba en blockchain. */
  verificarPdf(archivo: File): Observable<ICertificateVerification> {
    const form = new FormData();
    form.append('pdf', archivo);
    return this.http.post<ICertificateVerification>(`${this.base}api/verificar`, form);
  }
}
