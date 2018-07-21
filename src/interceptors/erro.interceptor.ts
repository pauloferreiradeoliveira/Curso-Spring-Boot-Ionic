import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
    console.log("passou");
    return next.handle(req)
      .catch((error,caugth) => {

        let erroObj = error;
        if (erroObj.error){
          erroObj = erroObj.error;
        }

        if(!erroObj.status){
          erroObj = JSON.parse(erroObj);
        }
        console.log("Erro detectado pelo Interceptor");
        console.log(erroObj);

        return Observable.throw(erroObj);
      }) as any
  }

}

export const ErroInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
