import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
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
        const isAuthEndPoint = req.url.includes('/auth/login');
        if (error.status === 401 && !isAuthEndPoint) {
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
