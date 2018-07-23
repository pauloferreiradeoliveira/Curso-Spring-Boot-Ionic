import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(public storage: StorageService, public alertController: AlertController){}

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
          case 401:
            this.handle401();
            break;

          case 403:
            this.handle403;
            break;

          default:
            this.handleDefaultError(erroObj);
        }

        return Observable.throw(erroObj);
      }) as any
  }

  private handle403(){
    this.storage.setLocalUser(null);
  }

  private handle401(){
    let alert = this.alertController.create({
        title: 'Erro 401: Falha de Autenticação',
        message: 'Email ou senha incorretos',
        enableBackdropDismiss: false,
        buttons: [
          {text : 'Ok'}
        ]
      });

      alert.present();

  }

  private handleDefaultError(erroObj){
    let alert = this.alertController.create({
      title: `Erro ${erroObj.status}: ${erroObj.error}`,
      message: erroObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {text : 'Ok'}
      ]
    });

    alert.present();
  }

}

export const ErroInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
