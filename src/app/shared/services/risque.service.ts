import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Risque} from "../../Classes/RisqueAnalyse/risque";

@Injectable({
  providedIn: 'root'
})
export class RisqueService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getAll():Observable<Risque[]>{
    return this.http.get<Risque[]>(`${this.apiServerUrl}/risque/getAll`)
  }
  public getRisqueById(id:number):Observable<Risque>{
    return this.http.get<Risque>(`${this.apiServerUrl}/risque/getRisqueById/${id}`)
  }
  public Ajouter(risque:Risque):Observable<Risque>{
    return this.http.post<Risque>(`${this.apiServerUrl}/risque/save`,risque)
  }
  public modifier(risque:Risque,id:number):Observable<Risque>{
    return this.http.put<Risque>(`${this.apiServerUrl}/risque/modifier/${id}`,risque)
  }
  public Suprimmer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/risque/delete/${id}`)
  }
}
