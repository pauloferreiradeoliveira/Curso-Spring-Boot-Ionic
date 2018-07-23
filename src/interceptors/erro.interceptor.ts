import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(public storage: StorageService){}

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
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

        switch(erroObj.status){
          case 403:
            this.handle403;
            break;
        }

        return Observable.throw(erroObj);
      }) as any
  }

  private handle403(){
    this.storage.setLocalUser(null);
  }

}

export const ErroInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
