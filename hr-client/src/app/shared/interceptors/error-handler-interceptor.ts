import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { inject } from '@angular/core';

export function errorHandlerInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const notification: NotificationService = inject(NotificationService);
  return next(req).pipe(
    catchError((error) => {
      console.log('error is intercept');
      notification.errorMethod('Danych nie można usunąć');
      console.error(error);
      return throwError(error.message);
    }),
  );
}
