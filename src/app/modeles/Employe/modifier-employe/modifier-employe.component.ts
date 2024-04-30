import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {PostService} from "../../../shared/services/post.service";
import {ToastrService} from "ngx-toastr";
import {Post} from "../../../Classes/Post/Post";
import {ListEmploye} from "../../../Classes/Employe/ListEmploye";
import {AjouterEmploye} from "../../../Classes/Employe/AjouterEmploye";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeServiceService} from "../../../shared/services/employe-service.service";

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.scss']
})
export class ModifierEmployeComponent implements OnInit{
  code!:string|any;
  employe!:ListEmploye;
  posts!:Post[];
  emp!:AjouterEmploye;
  text:string='Modifier';
  edit:boolean=true;
  sex=["Homme","Femme"];
  constructor(private routes:ActivatedRoute,
              private service:EmployeServiceService,private servicePost:PostService,
              private location: Location,private rout:Router,private notification:ToastrService) {
  }
  public getEmployeByCode(){
    this.service.getEmployeByCode(this.code).subscribe(response=>{
        this.employe=response;
        console.log(this.employe)
      },error => {
        console.log(error);
      }

    )
  }
  color:string="red";
  Edit(){
    this.edit=!this.edit;
  }
  submitButtonOptions = {
    text: "Modifier",
    type:"default",
    useSubmitBehavior: true
  }
  saveChanges(e:any) {
    this.service.updateEmploye(this.employe,this.code).subscribe(response => {
      this.notification.success("Employé Modifier avec Succès.")
      this.annuler()
      this.Edit();
    }, error => {
      this.notification.error("Error")
      console.error('Erreur lors de la mise à jour', error);
    });
  }
  public getAllPost(){
    this.servicePost.getAllPost().subscribe((response)=>{
      this.posts=response;
    },error =>
    {console.log(error)})
  }
  annuler(){
    this.location.back();
  }

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.code = params['code'];
    });
    this.getEmployeByCode();
    this.getAllPost()

  }
}
