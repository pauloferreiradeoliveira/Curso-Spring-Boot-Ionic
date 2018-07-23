import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_kEYS } from "../config/storage_key.config";

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
}
