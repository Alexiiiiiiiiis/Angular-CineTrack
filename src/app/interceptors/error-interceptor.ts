import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.status === 0
          ? 'Serveur injoignable'
          : (error.error?.message ?? 'Une erreur est survenue');
      console.error(`[HTTP ${error.status}] ${message}`);
      // → afficher un toast / une notification ici
      return throwError(() => error);
    }),
  );
};
