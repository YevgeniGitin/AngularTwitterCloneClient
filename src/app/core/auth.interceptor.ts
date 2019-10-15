import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    //log the request data
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if(token){
            //create clone of the header and add properties
            const reqClone = req.clone({
                headers:req.headers.set('Authorization','Bearer '+token)
            });
            //add the clone header
            return next.handle(reqClone);
        }else{
            //add the original header
            return next.handle(req);
        }        
    }
}