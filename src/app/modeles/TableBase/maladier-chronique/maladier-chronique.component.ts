import {Component, OnInit} from '@angular/core';
import {MaladieChroniqueService} from "../../../shared/services/maladie-chronique.service";
import {ToastrService} from "ngx-toastr";
import {MaladieChronique} from "../../../Classes/FichierMedical/MaladieChronique";
@Component({
  selector: 'app-maladier-chronique',
  templateUrl: './maladier-chronique.component.html',
  styleUrls: ['./maladier-chronique.component.scss']
})
export class MaladierChroniqueComponent implements OnInit{
  submitButtonOption = {
    text: "Modifier",
    type:"default",
    useSubmitBehavior: true
  }
  popupVisible=false
  ModifiermaChron=false

  maChron!:MaladieChronique;
  maChrons!:MaladieChronique[];
  idMaChron!:number;
  getmaChronById!:MaladieChronique;
  constructor(private service:MaladieChroniqueService,private notification:ToastrService) {
    this.resetForm()
  }
  resetForm(){
    this.maChron={
      periodiciteMaladieChroniqueDtos: [{
        periodicite:0,
        idPeriodicite:0,
        controleMedicale:""
      }],
      malladieChronique: "",
      description: "",

      id:0
    }
  }
  changePopupVisible(e: { row: { data: { id: number } } }){
    this.idMaChron = e.row.data.id;
    this.popupVisible=true
  }
  changeModifierMachron(e: { row: { data: { id: number } } }){
    this.idMaChron = e.row.data.id;
    this.getMaladierChroniqueById()
    this.ModifiermaChron=true
  }
  annuler(){
    this.popupVisible=!this.popupVisible
  }
  public delete(){
    this.service.Suprimmer(this.idMaChron).subscribe(response=>{
        this.popupVisible=false
        this.notification.success("Maladier Chronique Suprimmer avec Succès")
        this.getAll()
      },error => {console.log(error)
        this.notification.info("Tu ne peux pas supprimer cette Maladier Chronique.")}
    )
  }
  public getAll(){
    this.service.getAll().subscribe(response=> {
      this.maChrons = response;
    },(error) => {console.log(error)})
  }
  Modifier(e:Event){
    this.service.modifier(this.maChron,this.idMaChron).subscribe(response=>{
      this.maChron=response
      this.notification.success("Maladier Chronique Modifer avec Succès")
      this.getAll()
      this.resetForm()
      this.ModifiermaChron=false
    },error => {console.log(error)
      this.notification.info(" Maladier Chronique  existe.")})
  }
  public getMaladierChroniqueById(){
    this.service.getById(this.idMaChron).subscribe(response=>{
      this.getmaChronById=response
    },error => console.log(error))
  }
  ngOnInit(): void {
    this.getAll();
  }
}
