import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private jwtHelper: JwtHelperService;
    constructor() {
        this.jwtHelper = new JwtHelperService(); // Instantiate manually to avoid DI issues
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(cloned);
        }
        return next.handle(req);
    }
}

// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private jwtHelper: JwtHelperService) {} // Ensure SomeService does not depend on HTTP requests

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Modify request as needed
//     const modifiedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer token') });
//     return next.handle(modifiedReq);
//   }
// }
