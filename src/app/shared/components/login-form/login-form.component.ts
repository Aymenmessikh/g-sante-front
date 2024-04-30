import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator'
import { AuthService } from '../../services';
import {LoginRequest} from "../../../Classes/LoginRequest";
import {LoginResponse} from "../../../Classes/LoginResponse";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData!: LoginRequest;
  loginResponse!:LoginResponse

  constructor(private authService: AuthService, private router: Router,private notification:ToastrService) {
    this.resetForm()
    localStorage.clear()
  }
  resetForm(){
    this.formData={
      email: "", password: ""

    }
}
  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.authService.login(this.formData).subscribe(response=>{
      this.loginResponse=response
      localStorage.setItem("token",this.loginResponse.token)
      localStorage.setItem("role",this.loginResponse.role)
      localStorage.setItem("nom",this.loginResponse.nom)
      localStorage.setItem("prenom",this.loginResponse.prenom)
      this.loading = false;
      this.notification.success("Login")
      this.router.navigate(['/home']);
    },error => {console.log(error)
    this.notification.error('Faild')
      this.loading = false;
    }

    )
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
