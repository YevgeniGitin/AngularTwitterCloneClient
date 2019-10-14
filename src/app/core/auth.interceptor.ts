import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    //log the request data
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('user');
        if(token){
            const reqClone = req.clone({
                headers:req.headers.set('Authorization','Bearer '+token)
            });
            return next.handle(reqClone);
        }else{
            return next.handle(req);
        }        
    }
}