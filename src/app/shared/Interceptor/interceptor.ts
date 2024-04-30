import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')!=null) {
      const token = localStorage.getItem('token');
      const modifierRequete = req.clone({
        setHeaders: {
          Authorization: "Bearer "+token
        }
      });
      return next.handle(modifierRequete);
    }
    return next.handle(req);
  }
}
