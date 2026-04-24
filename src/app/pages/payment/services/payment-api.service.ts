import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { PaymentRepository } from 'src/app/core/repositories/payment/payment.repository';
import { CrearOrdenRequest } from 'src/app/core/class/payment/payment.request.class';
import { CrearOrdenResponse } from 'src/app/core/class/payment/payment.response.class';

@Injectable()
export class PaymentApiService implements PaymentRepository {

  constructor(private http: HttpClient) {}

  crearOrden(request: CrearOrdenRequest): Observable<CrearOrdenResponse> {
    return this.http
      .post<{ data: CrearOrdenResponse }>(
        `${environment.URL_BACKEND_TRANSACTION}orders`,
        request
      )
      .pipe(map(res => res.data));
  }
}