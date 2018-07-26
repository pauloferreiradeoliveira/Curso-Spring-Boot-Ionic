import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

  private baseUrlProduto = `${API_CONFIG.baseUrl}/produtos`;

  constructor(public http: HttpClient){
  }

  public findByCategoria(categoria_id: string): Observable<any> {
    return this.http.get<ProdutoDTO[]>(`${this.baseUrlProduto}?categorias=${categoria_id}`);
  }

  findById(produto_id: string): Observable<ProdutoDTO>{
    return this.http.get<ProdutoDTO>(`${this.baseUrlProduto}/${produto_id}`);
  }


  getSmallImageFromBucket(id: string) : Observable<any> {
    let urlImagem =  `${API_CONFIG.bucketBaseUrl}prod${id}-small.jpg`;
    return this.http.get(urlImagem, {responseType:'blob'});
  }

  getImageFromBucket(id: string) : Observable<any> {
    let urlImagem =  `${API_CONFIG.bucketBaseUrl}prod${id}.jpg`;
    return this.http.get(urlImagem, {responseType:'blob'});
  }

  getUrlImagemSmall(id: string): string {
    return `${API_CONFIG.bucketBaseUrl}prod${id}-small.jpg`;
  }

  getUrlImagem(id: string): string {
    return `${API_CONFIG.bucketBaseUrl}prod${id}.jpg`;
  }
}
