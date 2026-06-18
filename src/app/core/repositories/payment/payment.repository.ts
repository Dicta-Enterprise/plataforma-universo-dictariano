import { Observable } from 'rxjs';
import { CrearOrdenRequest } from '../../class/payment/payment.request.class';
import { CrearOrdenResponse } from '../../class/payment/payment.response.class';

export interface PaymentRepository {
  crearOrden(request: CrearOrdenRequest): Observable<CrearOrdenResponse>;
}