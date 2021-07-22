import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      const reqClone = req.clone({ setHeaders: { Authorization: "Bearer" + token } })
      return next.handle(reqClone);
    }
    else {
      return next.handle(req);
    }
  }
}
