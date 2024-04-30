import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import {LoginRequest} from "../../Classes/LoginRequest";
import {Observable} from "rxjs";
import {RegistreRequest} from "../../Classes/RegistreRequest";
import {LoginResponse} from "../../Classes/LoginResponse";
import {HttpClient} from "@angular/common/http";
import { environment } from '../environment/environment';
import DevExpress from "devextreme";
import data = DevExpress.data;

export interface IUser {
  email: string;
  avatarUrl?: string;
}

const defaultPath = '/';
const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router,private Http:HttpClient) { }

  async logOut() {
    this.router.navigate(['/login-form']);
  }
  private  apiServerUrl=environment.apiUrl;
  public login(loginRequest:LoginRequest){
    return this.Http.post<LoginResponse>(`${this.apiServerUrl}/auth/authenticate`,loginRequest)};
  public isLogin(){
    return localStorage.getItem("token")!=null;
  }
  public isAdmin(){
    return localStorage.getItem("role")==="ADMIN";
  }
  public registre(registre:RegistreRequest): Observable<RegistreRequest>{
    return this.Http.post<RegistreRequest>(`${this.apiServerUrl}/auth/register`,registre);
  }
  GetToken(){
    return localStorage.getItem('token');
  }
}


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
