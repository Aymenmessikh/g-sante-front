import { Injectable } from '@angular/core';
import {environment} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { AjouterPost } from 'src/app/Classes/Post/AjouterPost';
import {Post} from "../../Classes/Post/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private  apiServerUrl=environment.apiUrl
  constructor(private http:HttpClient) { }
  public AjouterPost(post:AjouterPost):Observable<AjouterPost>{
    return this.http.post<AjouterPost>(`${this.apiServerUrl}/post/save`,post)
  }
  public modifierPost(post:AjouterPost,id:number):Observable<AjouterPost>{
    return this.http.put<AjouterPost>(`${this.apiServerUrl}/post/modifier/${id}`,post)
  }
  public getAllPost():Observable<Post[]>{
    return this.http.get<Post[]>(`${this.apiServerUrl}/post/getAll`)
  }
  public getPostById(id:number):Observable<Post>{
    return this.http.get<Post>(`${this.apiServerUrl}/post/getPostById/${id}`)
  }
  public SuprimmerPost(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/post/delete/${id}`)
  }
}
