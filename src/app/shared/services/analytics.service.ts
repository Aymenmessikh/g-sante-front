import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NombredeConsultationparMois} from "../../Classes/Analytics/nombredeConsultationparMois";
import {MaladieChroniquePlusCaurant} from "../../Classes/Analytics/maladieChroniquePlusCaurant";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getNombreConsultationParMois():Observable<NombredeConsultationparMois[]>{
    return this.http.get<NombredeConsultationparMois[]>(`${this.apiServerUrl}/analytics/getNombreConsultationParMois`)
  }
  public getMaladiesChrinique():Observable<MaladieChroniquePlusCaurant[]>{
    return this.http.get<MaladieChroniquePlusCaurant[]>(`${this.apiServerUrl}/analytics/`)
  }
}
