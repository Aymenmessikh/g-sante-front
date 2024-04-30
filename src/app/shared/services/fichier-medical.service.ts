import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {Observable} from "rxjs";
import {AfficherDossierMedical} from "../../Classes/FichierMedical/AfficherDossierMedical";
import {HttpClient} from "@angular/common/http";
import {FichierMedical} from "../../Classes/FichierMedical/FichierMedical";

@Injectable({
  providedIn: 'root'
})
export class FichierMedicalService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public AjouterDossier(dossier:FichierMedical,code:string):Observable<FichierMedical>{
    return this.http.post<FichierMedical>(`${this.apiServerUrl}/Dossier/save/${code}`,dossier)
  }
  public ModifierDossier(dossier:FichierMedical,id:number):Observable<FichierMedical>{
    return this.http.put<FichierMedical>(`${this.apiServerUrl}/Dossier/modifier/${id}`,dossier)
  }
  public getAllDossier():Observable<FichierMedical[]>{
    return this.http.get<FichierMedical[]>(`${this.apiServerUrl}/Dossier/getAll`)
  }
  public getDossier(code:string):Observable<AfficherDossierMedical>{
    return this.http.get<AfficherDossierMedical>(`${this.apiServerUrl}/Dossier/getbyCode/${code}`)
  }
  public SuprimmerDossier(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Dossier/delete/${id}`)
  }
}
