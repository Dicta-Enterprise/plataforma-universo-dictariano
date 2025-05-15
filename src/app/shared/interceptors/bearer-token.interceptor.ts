import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthCookieService } from 'src/app/core/service/service.core';
import { AuthService } from 'src/app/services/service.root';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor(private readonly authCookieService: AuthCookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authCookieService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
