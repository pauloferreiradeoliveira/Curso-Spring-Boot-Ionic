import { Injectable } from "@angular/core";

import { LocalUser } from "../models/local_user";
import { STORAGE_kEYS } from "../config/storage_key.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {

  getLocalUser() : LocalUser {
    let urs = localStorage.getItem(STORAGE_kEYS.localUser);
    if(urs == null){
      return null;
    } else {
      return JSON.parse(urs);
    }
  }

  setLocalUser( obj: LocalUser){
    if (obj == null){
      localStorage.removeItem(STORAGE_kEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_kEYS.localUser, JSON.stringify(obj));
    }
  }

  getLocalCart() : Cart {
    let urs = localStorage.getItem(STORAGE_kEYS.cart);
    if(urs == null){
      return null;
    } else {
      return JSON.parse(urs);
    }
  }

  setLocalCart( obj: Cart){
    if (obj == null){
      localStorage.removeItem(STORAGE_kEYS.cart);
    } else {
      localStorage.setItem(STORAGE_kEYS.cart, JSON.stringify(obj));
    }
  }
}
