import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Vacssin} from "../../Classes/FichierMedical/Vacssin";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VacssinService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getAll():Observable<Vacssin[]>{
    return this.http.get<Vacssin[]>(`${this.apiServerUrl}/vacssin/getAll`)
  }
  public getVaccinById(id:number):Observable<Vacssin>{
    return this.http.get<Vacssin>(`${this.apiServerUrl}/vacssin/getVaccinById/${id}`)
  }
  public Ajouter(vacssin:Vacssin):Observable<Vacssin>{
    return this.http.post<Vacssin>(`${this.apiServerUrl}/vacssin/save`,vacssin)
  }
  public modifier(vacssin:Vacssin,id:number):Observable<Vacssin>{
    return this.http.put<Vacssin>(`${this.apiServerUrl}/vacssin/modifier/${id}`,vacssin)
  }
  public Suprimmer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/vacssin/delete/${id}`)
  }
}
