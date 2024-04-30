import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrdananceDto} from "../../Classes/Cosnultation/OrdananceDto";
import {MaladieDto} from "../../Classes/Cosnultation/MaladieDto";

@Injectable({
  providedIn: 'root'
})
export class MaladieService {
  private  apiServerUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  public getMaladieById(id:number):Observable<MaladieDto>{
    return this.http.get<MaladieDto>(`${this.apiServerUrl}/maladie/getById/${id}`)
  }
}
