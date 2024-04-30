import {Component, OnInit} from '@angular/core';
import {MaladieChroniqueService} from "../../../shared/services/maladie-chronique.service";
import {ToastrService} from "ngx-toastr";
import {MaladieChronique} from "../../../Classes/FichierMedical/MaladieChronique";
import {Router} from "@angular/router";
import {AnalyseService} from "../../../shared/services/analyse.service";
import {Analyse} from "../../../Classes/RisqueAnalyse/Analyse";
import {PeriodiciteMaladieChroniqueDto} from "../../../Classes/FichierMedical/PeriodiciteMaladieChroniqueDto";

@Component({
  selector: 'app-ajouter-maladie-chronique',
  templateUrl: './ajouter-maladie-chronique.component.html',
  styleUrls: ['./ajouter-maladie-chronique.component.scss']
})
export class AjouterMaladieChroniqueComponent implements OnInit{
  maChron!:MaladieChronique;
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  analyse!:Analyse[];
  lignPeriode!:PeriodiciteMaladieChroniqueDto
  ajouterControleMedicale=false
  periodicite=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  constructor(private service:MaladieChroniqueService,private analyseService:AnalyseService,private notification:ToastrService,private route:Router) {
    this.resetForm()
    this.resetPriodiciteMaladieChronique()
  }
  resetForm(){
    this.maChron={
      periodiciteMaladieChroniqueDtos: [
        {
        periodicite:0,
        idPeriodicite:0,
        controleMedicale:""
      }
      ],
      malladieChronique: "",
      description: "",

      id:0
    }
  }
  resetPriodiciteMaladieChronique() {
    this.lignPeriode = {
      controleMedicale: "", idPeriodicite: 0, periodicite: 0

    }
  }
  public Ajouter(e:any){
    this.service.Ajouter(this.maChron).subscribe(response=>{
      response=this.maChron;
      console.log(this.maChron)
      this.resetForm()
      this.notification.success("Maladier Chronique Ajouter avec Succès")
      this.route.navigate(["/mchron"])
    },error => {console.log(error)
      this.notification.info(" Maladier Chronique  existe.")})
  }
  public getAnalyse(){
    this.analyseService.getAllAnalyse().subscribe(reponse=>{
      this.analyse=reponse
    },(errors)=>{
      console.log(errors)
    })
  }
  changeAjouterControleMedicale(){
    this.ajouterControleMedicale=!this.ajouterControleMedicale
  }
  delete(data:any){
  }
  addControleMedicale(){
    this.maChron.periodiciteMaladieChroniqueDtos.push(this.lignPeriode);
    console.log(this.lignPeriode)
    this.resetPriodiciteMaladieChronique()
    this.changeAjouterControleMedicale()
  }

  ngOnInit(): void {
    this.getAnalyse()
    this.maChron.periodiciteMaladieChroniqueDtos.splice(0,1);
  }
}
