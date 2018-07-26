import { Injectable } from "@angular/core";

import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

  constructor (public storage: StorageService){}

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

  removeProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCard();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1){
      cart.items.splice(position,1);
    }
    this.storage.setLocalCart(cart);
    return cart;
  }

  increaseQuantityProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCard();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1){
      cart.items[position].quantidade++;
    }
    this.storage.setLocalCart(cart);
    return cart;
  }

  decreaseteQuantityProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCard();
    let position = cart.items.findIndex(x => x.produto.id == produto.id);
    if (position != -1){
      cart.items[position].quantidade--;
      if(cart.items[position].quantidade < 1){
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setLocalCart(cart);
    return cart;
  }

  totalCart(): number {
    let cart = this.getCard();
    let sum = 0;
    cart.items.forEach(element => {
      sum += element.produto.valor * element.quantidade;
    });
    return sum;
  }




}
