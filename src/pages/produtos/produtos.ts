import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtosService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtosService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      }, error => {});
  }

  loadImageUrls(){
    this.items.forEach(element => {
      this.produtosService.getSmallImageFromBucket(element.id)
        .subscribe(response => {
          element.imageUrl = this.produtosService.getUrlImagemSmall(element.id);
        }, error => {});
    });
  }

  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage', {produto_id : produto_id});
  }
}
