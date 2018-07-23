import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/cliente.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {

  }

  ionViewDidLoad() {
    let localuser = this.storage.getLocalUser();

    if(localuser && localuser.email){
      this.clienteService.findByEmail(localuser.email).subscribe(
        response => {
          this.cliente = response;
          this.getImageIfExists();
        },
        error => {
          if (error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists(){
    this.clienteService.getImageFromBuket(this.cliente.id)
      .subscribe(
        response => {
          this.cliente.imageURL = `${API_CONFIG.bucketBaseUrl}cp${this.cliente.id}.jpg`
        },
        error => {}
      )
  }

}
