import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message =
        error.status === 0
          ? 'Serveur injoignable'
          : error.status === 401
            ? 'Connexion requise'
            : (error.error?.message ?? 'Une erreur est survenue');
      console.error(`[HTTP ${error.status}] ${message}`);
      // Les pages d'auth gèrent leur propre message inline : pas de toast.
      const isAuthRoute = req.url.endsWith('/login') || req.url.endsWith('/register');
      if (!isAuthRoute) {
        toast.error(message);
      }
      return throwError(() => error);
    }),
  );
};
