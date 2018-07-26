import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCard();
    this.items = cart.items;
    this.loadImageUrls();
  }

  private loadImageUrls(){
    this.items.forEach(element => {
      this.produtoService.getSmallImageFromBucket(element.produto.id)
        .subscribe(response => {
          element.produto.imageUrl = this.produtoService.getUrlImagemSmall(element.produto.id);
        }, error => {});
    });
  }

  removeItem(produto: ProdutoDTO){
    this.items = this.cartService.removeProduto(produto).items;
  }


  increaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.increaseQuantityProduto(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartService.decreaseteQuantityProduto(produto).items;
  }

  total() : number{
    return this.cartService.totalCart();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('PickAddressPage');
  }
}
