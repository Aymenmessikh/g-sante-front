import {Component, OnInit} from '@angular/core';
import {AnalyseService} from "../../../shared/services/analyse.service";
import {RisqueService} from "../../../shared/services/risque.service";
import {ToastrService} from "ngx-toastr";
import {Risque} from "../../../Classes/RisqueAnalyse/risque";
import {Analyse} from "../../../Classes/RisqueAnalyse/Analyse";
import {PeriodiciteRisqueDto} from "../../../Classes/RisqueAnalyse/PeriodiciteRisqueDto";
@Component({
  selector: 'app-risque',
  templateUrl: './risque.component.html',
  styleUrls: ['./risque.component.scss']
})
export class RisqueComponent implements OnInit{
  risquess!:Risque[];
  lignPeriode!:PeriodiciteRisqueDto
  popupVisible = false;
  AjouterRisque=false;
  ModifierRisque=false;
  DettaileRisque=false;
  risqueId!:number;
  getrisqueById!:Risque;
  modifierRisque!:Risque;
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  submitButtonOption = {
    text: "Modifier",
    type:"default",
    useSubmitBehavior: true
  }
  risque!:Risque;
  analyse!:Analyse[];
  constructor(private service:RisqueService,private analyseService:AnalyseService,private notification:ToastrService) {
    this.resetForm()
    this.resetPriodiciteRisque()
  }
  ngOnInit(): void {
    this.getAll();
    this.getAnalyse()
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
  }
  changeAjouterRisque(){
    this.AjouterRisque=true;
  }
  changeModifierRisque(e: { row: { data: { id: number } } }){
    this.risqueId = e.row.data.id;
    this.getRisqueByid()
    this.ModifierRisque=true;
  }
  changeDettaileRisque(e: { row: { data: { id: number } } }){
    this.risqueId = e.row.data.id;
    this.DettaileRisque=true;
    this.getRisqueByid()
  }
  annuler(){
    this.popupVisible=false;
  }
  supimmer(){
    this.service.Suprimmer(this.risqueId).subscribe(response=>{
      this.notification.success("Risque Suprimmer avec Succès.")
      this.getAll()
      this.popupVisible=false
    },(errors)=>{
      this.notification.info("Tu ne peux pas supprimer cet Risque.")
    })
  }
  public delete(e: { row: { data: { id: number } } }){
    this.risqueId = e.row.data.id;
    this.popupVisible=true;
  }
  public getAll(){
    this.service.getAll().subscribe((response)=>{
      this.risquess=response
    },(errors)=>{console.log(errors)})
  }
  public getRisqueByid(){
    this.service.getRisqueById(this.risqueId).subscribe((response)=>{
      this.getrisqueById=response
    },(errors)=>{console.log(errors)})
  }
  public getAnalyse(){
    this.analyseService.getAllAnalyse().subscribe(reponse=>{
      this.analyse=reponse
    },(errors)=>{
      console.log(errors)
    })
  }

  onTreeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
   // this.risque. = selectedValues;
  }

  public ajouter(e:Event){
    this.service.Ajouter(this.risque).subscribe((response)=>{
      this.risque=response;
      this.resetForm()
      this.getAll()
      this.notification.success("Risque Ajouter avec Succès.")
      this.AjouterRisque=false
    },(errors)=>{console.log(errors)
      this.notification.info("Risque existe.")})
  }
  Modifier(e:Event){
    this.service.modifier(this.risque,this.risqueId).subscribe(response=>{
      this.risque=response
      this.resetForm()
      this.getAll()
      this.notification.success("Risque Modifier avec Succès")
      this.ModifierRisque=false
    },error => {console.log(error)
      this.notification.info("Risque existe.")})
  }
}
