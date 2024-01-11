import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@shared/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthorizationToken();

  // Clone the request and set authorization header.
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Client Error: ${error.error.message}`;
      } else {
        errorMsg = `Server Error Code: ${error.status}, Message: ${error.message}`;
      }
      return throwError(() => errorMsg);
    })
  );
};
