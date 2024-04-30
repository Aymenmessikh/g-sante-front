import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Allergie} from "../../Classes/FichierMedical/Allergie";
import {environment} from "../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AllergieService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getAllAllergie():Observable<Allergie[]>{
    return this.http.get<Allergie[]>(`${this.apiServerUrl}/allergie/getAll`)
  }
  public getAllergieById(id:number):Observable<Allergie>{
    return this.http.get<Allergie>(`${this.apiServerUrl}/allergie/getAllergieById/${id}`)
  }
  public modifier(allergie:Allergie,id:number):Observable<Allergie>{
    return this.http.put<Allergie>(`${this.apiServerUrl}/allergie/modifier/${id}`,allergie);
  }
  public AjouterAllergie(allergie:Allergie):Observable<Allergie>{
    return this.http.post<Allergie>(`${this.apiServerUrl}/allergie/save`,allergie)
  }
  public Suprimmer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/allergie/delete/${id}`)
  }
}
