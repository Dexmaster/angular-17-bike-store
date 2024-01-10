import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@shared/auth/auth.service';
import { SnackbarService } from '@shared/snackbar/snackbar.service';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const snack = inject(SnackbarService);
  const authToken = authService.getAuthorizationToken();

  // Clone the request and set authorization header.
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        // Client error
        errorMsg = `${error.error.message}`;
      } else {
        // Server error
        errorMsg = `[${error.status}] ${error.message}`;
      }
      // if user gets unauthorised we want to clean credentials
      if (error.status === 401) {
        errorMsg = '[401] Your authorization session expired.';
        authService.logout();
      }
      snack.error(errorMsg);

      return throwError(() => errorMsg);
    })
  );
};
