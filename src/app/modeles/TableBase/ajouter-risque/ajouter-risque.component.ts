import {Component, OnInit} from '@angular/core';
import {Risque} from "../../../Classes/RisqueAnalyse/risque";
import {Analyse} from "../../../Classes/RisqueAnalyse/Analyse";
import {RisqueService} from "../../../shared/services/risque.service";
import {AnalyseService} from "../../../shared/services/analyse.service";
import {ToastrService} from "ngx-toastr";
import {PeriodiciteRisqueDto} from "../../../Classes/RisqueAnalyse/PeriodiciteRisqueDto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-risque',
  templateUrl: './ajouter-risque.component.html',
  styleUrls: ['./ajouter-risque.component.scss']
})
export class AjouterRisqueComponent implements OnInit{
  risque!:Risque;
  analyse!:Analyse[];
  lignPeriode!:PeriodiciteRisqueDto
  ajouterControleMedicale=false
  periodicite=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  constructor(private service:RisqueService,private route:Router,
              private analyseService:AnalyseService,private notification:ToastrService) {
    this.resetForm()
    this.resetPriodiciteRisque()
  }
  ngOnInit(): void {
    this.getAnalyse()
    this.risque.periodiciteRisqueDtos.splice(0,1)
  }
  resetForm(){
    this.risque={
      periodiciteRisqueDtos: [
        {
          periodicite:0,
          controleMedicale:"",
          idPeriodicite:0
        }
      ],
      description: "",
      risque:"",
      id:0
    }
  }
  resetPriodiciteRisque(){
    this.lignPeriode={
      controleMedicale: "", idPeriodicite: 0, periodicite: 0

    }
  }
  addControleMedicale(){
    this.risque.periodiciteRisqueDtos.push(this.lignPeriode);
    console.log(this.lignPeriode)
    this.resetPriodiciteRisque()
    this.changeAjouterControleMedicale()
  }
  public getAnalyse(){
    this.analyseService.getAllAnalyse().subscribe(reponse=>{
      this.analyse=reponse
    },(errors)=>{
      console.log(errors)
    })
  }
  public ajouter(e:Event){
    this.service.Ajouter(this.risque).subscribe((response)=>{
      this.risque=response;
      console.log(this.risque)
      this.resetForm()
      this.notification.success("Risque Ajouter avec Succès.")
      this.route.navigate(["/listRisque"])
    },(errors)=>{console.log(errors)
      this.notification.info("Risque existe.")})
  }
  changeAjouterControleMedicale(){
    this.ajouterControleMedicale=!this.ajouterControleMedicale
  }
  delete(data:any){
  }

}
