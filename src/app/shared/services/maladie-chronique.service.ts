import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {MaladieChronique} from "../../Classes/FichierMedical/MaladieChronique";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MaladieChroniqueService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getAll():Observable<MaladieChronique[]>{
    return this.http.get<MaladieChronique[]>(`${this.apiServerUrl}/mChron/getAll`)
  }
  public getById(id:number):Observable<MaladieChronique>{
    return this.http.get<MaladieChronique>(`${this.apiServerUrl}/mChron/getMaladieChroniqyeById/${id}`)
  }
  public modifier(maChron:MaladieChronique,id:number):Observable<MaladieChronique>{
    return this.http.put<MaladieChronique>(`${this.apiServerUrl}/mChron/modifier/${id}`,maChron);
  }
  public Ajouter(maladieChronique:MaladieChronique):Observable<MaladieChronique>{
    return this.http.post<MaladieChronique>(`${this.apiServerUrl}/mChron/save`,maladieChronique)
  }
  public Suprimmer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/mChron/delete/${id}`)
  }
}
