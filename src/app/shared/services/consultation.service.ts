import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Consultation} from "../../Classes/Cosnultation/Consultation";
import {Intervention} from "../../Classes/Cosnultation/Intervention";
import {AjouterConsultation} from "../../Classes/Cosnultation/AjouterConsultation";

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public AjouterConsultation(consultation:AjouterConsultation,code:string):Observable<AjouterConsultation>{
    return this.http.post<AjouterConsultation>(`${this.apiServerUrl}/cons/save/${code}`,consultation)
  }
  public getAllConsultation():Observable<Consultation[]>{
    return this.http.get<Consultation[]>(`${this.apiServerUrl}/cons/getAllConsultation`)
  }
  public getAllItervention():Observable<Intervention[]>{
    return this.http.get<Intervention[]>(`${this.apiServerUrl}/cons/getAllIntervention`)
  }
  public getConsultationByEmployer(code:string):Observable<Consultation[]>{
    return this.http.get<Consultation[]>(`${this.apiServerUrl}/cons/getConsultationbyCodeEmp/${code}`)
  }
  public SuprimmerConsultation(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/cons/delete/${id}`)
  }
}
