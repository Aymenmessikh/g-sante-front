import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AjouterEmploye} from "../../../Classes/Employe/AjouterEmploye";
import {EmployeServiceService} from "../../../shared/services/employe-service.service";
import {Post} from "../../../Classes/Post/Post";
import {PostService} from "../../../shared/services/post.service";
@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.scss']
})
export class AjouterEmployeComponent implements OnInit{
sex=["Femme","Homme"];
  posts!:Post[];
  employer!: AjouterEmploye;
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  constructor(private service:EmployeServiceService,private router:Router,private servicePost:PostService,
              private notification:ToastrService) {
    this.resetForm()
  }
  resetForm(){
    this.employer={
      idPost:0,
      mail:"",
      tel:"",
      date_naissance:new Date(),
      nom:"",
      prenom:"",
      sex:"",
      ville:"",
      address:"",
      codePostal:""
    }}
  public getAllPost(){
    this.servicePost.getAllPost().subscribe((response)=>{
      this.posts=response;
    },error =>
    {console.log(error)})
  }
  public Ajouter(e: Event) {
    e.preventDefault();
    console.log(this.employer);
    this.service.AjouterEmp(this.employer).subscribe(
      (response) => {
        this.resetForm();
        this.notification.success("Employé Ajouter avec Succès.")
        this.router.navigate(["/listEmployer"])
      },
      (error) => {
        this.notification.error("Les informations existent. S'il vous plaît, veuillez les modifier.")
      }
    );
  }
  ngOnInit(): void {
    this.getAllPost()
  }
}
