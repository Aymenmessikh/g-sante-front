import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ListEmploye} from "../../../Classes/Employe/ListEmploye";
import {AjouterEmploye} from "../../../Classes/Employe/AjouterEmploye";
import {EmployeServiceService} from "../../../shared/services/employe-service.service";
@Component({
  selector: 'app-get-employe',
  templateUrl: './get-employe.component.html',
  styleUrls: ['./get-employe.component.scss']
})
export class GetEmployeComponent implements OnInit{
  code!:string|any;
  employe!:ListEmploye;
  emp!:AjouterEmploye;
  sex=["Homme","Femme"];
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  constructor(private routes:ActivatedRoute,private service:EmployeServiceService,private route:Router) {
  }
  public getEmployeByCode(){
    this.code=localStorage.getItem("code");
    this.service.getEmployeByCode(this.code).subscribe(response=>{
        this.employe=response;
      },error => {
        console.log(error);
      }

    )
  }
  public Ajouter(e: Event) {
    e.preventDefault();
  }
  modifier() {
    this.route.navigate(["/modifierEmploye",this.code])
  }
  edit:boolean=false;
  ngOnInit(): void {
    this.getEmployeByCode();
  }
}
