import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickAddressPage } from './pick-address';
import { CepPipe } from '../../pipes/cep.pipe';

@NgModule({
  declarations: [
    PickAddressPage,
    CepPipe
  ],
  imports: [
    IonicPageModule.forChild(PickAddressPage),
  ],
})
export class PickAddressPageModule {}
