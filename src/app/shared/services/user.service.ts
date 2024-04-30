import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../Classes/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public getUser(token:string):Observable<UserDto>{
    return this.http.get<UserDto>(`${this.apiServerUrl}/user/get`, { params: { token } })
  }
}
