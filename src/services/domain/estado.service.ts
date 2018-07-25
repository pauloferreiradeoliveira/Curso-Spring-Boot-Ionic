import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";


@Injectable()
export class EstadoService{

  private baseUrlEstados = `${API_CONFIG.baseUrl}/estados`;

  constructor(public http: HttpClient){
  }

  public findAll(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(this.baseUrlEstados);
  }
}
