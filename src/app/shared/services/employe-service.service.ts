import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AjouterEmploye} from "../../Classes/Employe/AjouterEmploye";
import {ListEmploye} from "../../Classes/Employe/ListEmploye";

@Injectable({
  providedIn: 'root'
})
export class EmployeServiceService {
  private  apiServerUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  public AjouterEmp(employe:AjouterEmploye):Observable<AjouterEmploye> {
    return this.http.post<AjouterEmploye>(`${this.apiServerUrl}/Emp/save`, employe)
  }
  public updateEmploye(employe: ListEmploye, code: string):Observable<ListEmploye> {
    return this.http.put<ListEmploye>(`${this.apiServerUrl}/Emp/update/${code}`, employe)
  }
  public getAllEmploye():Observable<ListEmploye[]>{
    return this.http.get<ListEmploye[]>(`${this.apiServerUrl}/Emp/getAll`)
  }
  public getEmployeByCode(code:string):Observable<ListEmploye>{
    return this.http.get<ListEmploye>(`${this.apiServerUrl}/Emp/getbyCode/${code}`)
  }
  public SuprimmerEmp(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Emp/delete/${id}`)
  }
}
