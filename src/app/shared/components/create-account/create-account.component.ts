import { Component } from '@angular/core';
import {RegistreRequest} from "../../../Classes/RegistreRequest";
import {AuthService} from "../../services";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ValidationCallbackData} from "devextreme-angular/common";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  loading = false;
  formData!: RegistreRequest;
  roles=["Medecin","Medecin Chef","Gestionnaire"]

  constructor(private authService: AuthService, private router: Router,private notification:ToastrService) {
    this.resetForm()
  }
  resetForm(){
    this.formData={
      ConfirmePassword: "",
      email: "",
      nom: "",
      prenom: "",
      role: "",
      password: ""

    }
  }
  async onSubmit(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.authService.registre(this.formData).subscribe(response=>{
        this.formData=response
        this.notification.success('Le compte cree avec Succes')
        this.loading = false;
      },error =>{ console.log(error)
        this.notification.error('Utlisature Existe')
      }
    )
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}
