import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";


@Injectable()
export class CidadeService{

  private baseUrlCidade = `${API_CONFIG.baseUrl}/estados`;

  constructor(public http: HttpClient){
  }

  public findAll(estado_id: string): Observable<CidadeDTO[]> {
    return this.http.get<CidadeDTO[]>(`${this.baseUrlCidade}/${estado_id}/cidades`);
  }


}
