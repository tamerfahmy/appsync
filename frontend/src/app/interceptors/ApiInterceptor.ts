import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('public/') || req.url.startsWith('api/')) {
      const userToken = this.userService.getUserToken();
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${userToken}`
        }
      });
      return next.handle(this.appendBaseUrl(authReq));
    }

    return next.handle(req);
  }

  private appendBaseUrl(req: HttpRequest<any>): HttpRequest<any> {
    const apiReq = req.clone({ url: `${environment.BASE_API_URL}${req.url}` });
    return apiReq;
  }
}
