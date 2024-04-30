import {Component, OnInit} from '@angular/core';
import {AnalyseService} from "../../../shared/services/analyse.service";
import {ToastrService} from "ngx-toastr";
import {Analyse} from "../../../Classes/RisqueAnalyse/Analyse";
@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit{
  analyses!:Analyse[];
  popupVisible = false;
  AjouterAnalyse=false;
  ModifierAnalyse=false;
  analyseId!:number;
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  submitButtonOptionsModifier = {
    text: "Modifier",
    type:"default",
    useSubmitBehavior: true
  }
  analyse!:Analyse;
  resetForm() {
    this.analyse = {
      controle: "",
      idControle: 0,
      typeControle: "",
      description: ""
    }
  }
  AfficherAnalyseById!:Analyse;
  change(){
    this.AjouterAnalyse=true
  }
  Modification(){
    this.ModifierAnalyse=true
  }
  constructor(private service:AnalyseService,private notification:ToastrService) {
    this.resetForm()
  }
  public getAllAnalyse(){
    this.service.getAllAnalyse().subscribe(reponse=>{
      this.analyses=reponse
      this.resetForm()
    },(errors)=>{
      console.log(errors)
    })
  }
  public Ajouter(e:Event){
    this.service.AjouterAnalyse(this.analyse).subscribe((response)=>{
        response=this.analyse
        this.getAllAnalyse()
        this.notification.success("Controle Medicale Ajouter avec Succès.")
        this.AjouterAnalyse=false;
      },(errors)=>{
        this.notification.info("Controle Medicale existe.")
        console.log(errors)
      }
    )
  }
  getAnnalyse(e: { row: { data: { idControle: number } } }){
    this.Modification();
    this.analyseId = e.row.data.idControle;
    this.service.getAnalyse(this.analyseId).subscribe(response=>{
      this.AfficherAnalyseById=response;
    },error => console.log(error))
  }

  public Modifer(e:Event){
    this.service.modifierAnalyse(this.analyse,this.analyseId).subscribe(response=>{
        this.ModifierAnalyse=false;
        this.getAllAnalyse()
        this.notification.success("Analyse Medical Modifier avec Succès.")
        response=this.analyse
      },error => {console.log(error)
        this.notification.info("Analyse Medical existe.")
      }
    )
  }
  annuler(){
    this.popupVisible=false;
  }
  supimmer(){
    this.service.Suprimmer(this.analyseId).subscribe(response=>
    {
      this.notification.success("Analyse Medical Suprimmer avec Succès.")
      this.getAllAnalyse()
      this.popupVisible=false
    },(errors)=>{
      this.notification.info("Tu ne peux pas supprimer cette Analyse Medical.")
      console.log(errors)
    })
  }
  public delete(e: { row: { data: { idControle: number } } }){
    this.analyseId = e.row.data.idControle;
    this.popupVisible=true;
  }

  ngOnInit(): void {
    this.getAllAnalyse()
  }
}
