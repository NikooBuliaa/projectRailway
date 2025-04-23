import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorhandlerService } from './errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService  implements HttpInterceptor{

  constructor(private errorhadler : ErrorhandlerService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error:HttpResponse<any>)=> {
            if(error.status ==400){
              console.log("Bad Request")
            }
            else if(error.status ==404) {
              console.log("not found", error.statusText)
            }
            else if(error.status ==500) {
              console.log("internal Server error", error.statusText)
            }
            else {
              console.log("Unknow error", error.statusText)
            }
            this.errorhadler.showDialog(error.statusText)

            throw error
        })
      )
  }
}
