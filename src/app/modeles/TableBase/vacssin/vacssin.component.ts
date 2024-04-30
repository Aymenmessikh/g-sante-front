import {Component, OnInit} from '@angular/core';
import {VacssinService} from "../../../shared/services/vacssin.service";
import {ToastrService} from "ngx-toastr";
import {Vacssin} from "../../../Classes/FichierMedical/Vacssin";

@Component({
  selector: 'app-vacssin',
  templateUrl: './vacssin.component.html',
  styleUrls: ['./vacssin.component.scss']
})
export class VacssinComponent implements OnInit{
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
  vacssin!:Vacssin;
  idVaccsin!:number
  vacssins!:Vacssin[];
  popupVisible = false;
  Ajoutervaccin = false;
  Modifiervacssin!:Vacssin;
  ModifierVaccin = false;
  constructor(private service:VacssinService,private notification:ToastrService) {
    this.resetForm()
  }
  resetForm(){
    this.vacssin={
      vaccin: "",
      description: "",
      id:0
    }
  }
  changePopupeVisible(e: { row: { data: { id: number } } }){
    this.idVaccsin = e.row.data.id;
    this.popupVisible=true
  }
  changeAjouterVaccin(){
    this.Ajoutervaccin=true
  }
  changeModifierVaccin(e: { row: { data: { id: number } } }){
    this.idVaccsin = e.row.data.id;
    this.getVaccinById()
    this.ModifierVaccin=true
  }
  annuler(){
    this.popupVisible=!this.popupVisible
  }
  public Ajouter(e:any){
    this.service.Ajouter(this.vacssin).subscribe(response=>{
      response=this.vacssin;
      this.notification.success("Vaccin Ajouter avec Succès")
      this.resetForm()
      this.getAll()
      this.Ajoutervaccin=false
    },error => {console.log(error)
      this.notification.info("Vaccin existe.")
    })
  }
  public  Modifier(e:any){
    this.service.modifier(this.vacssin,this.idVaccsin).subscribe(response=>{
      response=this.vacssin
      this.resetForm()
      this.notification.success("Vaccin Modifier avec Succès")
      this.getAll()
      this.ModifierVaccin=false;
    },error => {console.log(error)
      this.notification.info("Vaccin existe.")})
  }
  public delete(){
    this.service.Suprimmer(this.idVaccsin).subscribe(response=>{
        this.notification.success("Vaccin Suprimmer avec Succès")
        this.getAll()
        this.annuler()
      },error => {console.log(error)
        this.notification.info("Tu ne peux pas supprimer cette Vaccin.")
      }
    )
  }
  public getAll(){
    this.service.getAll().subscribe(response=> {
      this.vacssins = response;
    },(error) => {console.log(error)})
  }
  public getVaccinById(){
    this.service.getVaccinById(this.idVaccsin).subscribe(reponse=>{
      this.Modifiervacssin=reponse
    },error => console.log(error))
  }
  ngOnInit(): void {
    this.getAll();
  }
}
