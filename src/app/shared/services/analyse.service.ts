import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Analyse} from "../../Classes/RisqueAnalyse/Analyse";
import {AfficherPeriodicteRisque} from "../../Classes/RisqueAnalyse/AfficherPeriodicteRisque";
import {PeriodiciteMaladieChroniqueDto} from "../../Classes/FichierMedical/PeriodiciteMaladieChroniqueDto";
import {AfficherControleMaladiesChronique} from "../../Classes/RisqueAnalyse/AfficherControleMaladiesChronique";

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getAllAnalyse():Observable<Analyse[]>{
    return this.http.get<Analyse[]>(`${this.apiServerUrl}/analyse/getAll`)
  }
  public getAllAnalyseByRisque(code: string): Observable<AfficherPeriodicteRisque[]> {
    return this.http.get<AfficherPeriodicteRisque[]>(`${this.apiServerUrl}/analyse/getAnalyseByRisque/${code}`);
  }
  public getAllAnalyseByMaladiesChronique(id: number[]): Observable<AfficherControleMaladiesChronique[]> {
    return this.http.get<AfficherControleMaladiesChronique[]>(`${this.apiServerUrl}/analyse/getAnalyseByMaladieChronique/${id}`);
  }
  public getAnalyse(id:number):Observable<Analyse>{
    return this.http.get<Analyse>(`${this.apiServerUrl}/analyse/getAnalyseById/${id}`)
  }

  public AjouterAnalyse(analyse:Analyse):Observable<Analyse>{
    return this.http.post<Analyse>(`${this.apiServerUrl}/analyse/save`,analyse)
  }
  public modifierAnalyse(analyse:Analyse,id:number):Observable<Analyse>{
    return this.http.put<Analyse>(`${this.apiServerUrl}/analyse/modifier/${id}`,analyse)
  }
  public Suprimmer(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/analyse/delete/${id}`)
  }
}
