import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = req.clone({
      withCredentials: true
    })

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        const isAuthEndPoint = 
        req.url.includes('/auth/login') || 
        req.url.includes('/auth/profile') || 
        req.url.includes('/auth/google');
        if (error.status === 401 && !isAuthEndPoint) {
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
