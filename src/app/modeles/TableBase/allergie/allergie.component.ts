import {Component, OnInit} from '@angular/core';
import {AllergieService} from "../../../shared/services/allergie.service";
import {ToastrService} from "ngx-toastr";
import {Allergie} from "../../../Classes/FichierMedical/Allergie";
@Component({
  selector: 'app-allergie',
  templateUrl: './allergie.component.html',
  styleUrls: ['./allergie.component.scss']
})
export class AllergieComponent implements OnInit{
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
  allergie!:Allergie;
  getAllergieById!:Allergie;
  idAllergied!:number;
  popupVisible=false
  ModifierAllergie=false
  AjouterAllergie=false
  allergies!:Allergie[];
  constructor(private service:AllergieService,private notification:ToastrService) {
    this.resetForm()
  }
  resetForm(){
    this.allergie={
      description: "",
      allergie:"",
      id:0
    }
  }
  public Ajouter(e:any){
    this.service.AjouterAllergie(this.allergie).subscribe(response=>{
      response=this.allergie;
      this.resetForm()
      this.notification.success("Allergie Ajouter avec Succès.")
      this.AjouterAllergie=false
      this.getAll()
    },error => {console.log(error)
      this.notification.info('Allergie existe.')})
  }
  changePopupVisible(e: { row: { data: { id: number } } }){
    this.idAllergied = e.row.data.id;
    this.popupVisible=true
  }
  changeModifierAllergie(e: { row: { data: { id: number } } }){
    this.idAllergied = e.row.data.id;
    this.getAllergie()
    this.ModifierAllergie=true
  }
  changeAjouterAllergie(){
    this.AjouterAllergie=true
  }
  annuler(){
    this.popupVisible=!this.popupVisible
  }
  public delete(){
    this.service.Suprimmer(this.idAllergied).subscribe(response=>{
        this.popupVisible=false
        this.notification.success("Allergie Suprimmer avec Succès")
        this.getAll()
      },error => {console.log(error)

        this.notification.info('Tu ne peux pas supprimer cette Allergie.')}
    )
  }
  getAll(){
    this.service.getAllAllergie().subscribe(response=> {
      this.allergies = response;
    },(error) => {console.log(error)})
  }
  public getAllergie(){
    this.service.getAllergieById(this.idAllergied).subscribe(response=>{
      this.getAllergieById=response
    },error => console.log(error))
  }
  public Modifier(e:Event){
    this.service.modifier(this.allergie,this.idAllergied).subscribe(response=> {
      response = this.allergie
      this.ModifierAllergie=false
      this.resetForm()
      this.notification.success('Allergie Modifier avec Succès')
      this.getAll()
    },error => {console.log(error)
      this.notification.info('Allergie existe.')})
  }
  ngOnInit(): void {
    this.getAll();
  }
}
