import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("Dentro del interceptor");
    // console.log(request);
    // console.log(next);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado';
        
        if (error.status === 401) {
          errorMessage = 'No autorizado. Por favor, inicie sesión.';
        } else if (error.status === 404) {
          errorMessage = 'Recurso no encontrado.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
      
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 5000
        });
      
        return throwError(() => error);
      })
    );
  }
}