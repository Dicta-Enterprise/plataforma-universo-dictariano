import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SppinerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly spinnerService: SppinerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}

