import { Injectable } from "@angular/core";

import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

  constructor (public storage: StorageService){

  }

  createOrClearCart(): Cart {
    let cart : Cart = { items : []};
    this.storage.setLocalCart(cart);
    return cart;
  }

  getCard(): Cart {
    let cart: Cart = this.storage.getLocalCart();
    if (cart == null){
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCard();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position == -1){
      cart.items.push({ quantidade: 1, produto: produto});
    }
    this.storage.setLocalCart(cart);
    return cart;
  }


}
