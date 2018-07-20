import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { API_CONFIG } from "../../config/api.config";
import { CategotiaDTO } from "../../models/categoria.dto";


@Injectable()
export class CategoriaService{

  private baseUrlCategoria = `${API_CONFIG.baseUrl}/categorias`;

  constructor(public http: HttpClient){
  }

  public findAll(): Observable<CategotiaDTO[]> {
    return this.http.get<CategotiaDTO[]>(this.baseUrlCategoria);
  }
}
