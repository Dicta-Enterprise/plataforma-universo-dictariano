import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  // constructor(private authCookieService:AuthCookieService) {}

  // intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const authToken = this.authCookieService.getToken();

  //   if (authToken) {
  //     const clonedReq = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  //     });
  //     return next.handle(clonedReq);
  //   }

  //   return next.handle(req);
  // }
}
