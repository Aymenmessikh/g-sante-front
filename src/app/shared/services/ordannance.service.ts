import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../../Classes/Post/Post";
import {OrdananceDto} from "../../Classes/Cosnultation/OrdananceDto";

@Injectable({
  providedIn: 'root'
})
export class OrdannanceService {
  private  apiServerUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  public getOrdannanceById(id:number):Observable<OrdananceDto>{
    return this.http.get<OrdananceDto>(`${this.apiServerUrl}/ordannance/getById/${id}`)
  }
}
