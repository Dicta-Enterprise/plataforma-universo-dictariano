import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LocalStorageInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const responseBody:any = event.body;
          
          if (responseBody.token) {
            localStorage.setItem('authToken', responseBody.token);
          }

          // Store additional data as needed
          if (responseBody.idUsuario) {
            localStorage.setItem('idUsuario', responseBody.idUsuario.toString());
          }

          if (responseBody.nombre_Completo) {
            localStorage.setItem('nombre_Completo', responseBody.nombre_Completo);
          }
          
          // Handle other fields similarly...
        }
      })
    );
  }
}
