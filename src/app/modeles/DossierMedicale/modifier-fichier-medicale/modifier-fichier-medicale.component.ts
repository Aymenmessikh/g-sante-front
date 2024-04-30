import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VacssinService} from "../../../shared/services/vacssin.service";
import {MaladieChroniqueService} from "../../../shared/services/maladie-chronique.service";
import {AllergieService} from "../../../shared/services/allergie.service";
import {AfficherDossierMedical} from "../../../Classes/FichierMedical/AfficherDossierMedical";
import {MaladieChronique} from "../../../Classes/FichierMedical/MaladieChronique";
import {Vacssin} from "../../../Classes/FichierMedical/Vacssin";
import {Allergie} from "../../../Classes/FichierMedical/Allergie";
import {FichierMedical} from "../../../Classes/FichierMedical/FichierMedical";
import {FichierMedicalService} from "../../../shared/services/fichier-medical.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-modifier-fichier-medicale',
  templateUrl: './modifier-fichier-medicale.component.html',
  styleUrls: ['./modifier-fichier-medicale.component.scss']
})
export class ModifierFichierMedicaleComponent implements OnInit{
  code:any=localStorage.getItem("code");
  disable:boolean=true;
  dossierMedical!:AfficherDossierMedical;
  maladiechronique!:MaladieChronique[];
  groupSanguin= ["A+", "A-", "B+", "B-", "C+", "C-", "O+", "O-", "AB+", "AB-"]
  vaccins!: Vacssin[];
  allergier!: Allergie[];
  fichier!:FichierMedical
  submitButtonOptions = {
    text: "Modifier",
    type:"default",
    useSubmitBehavior: true
  }
  AjouterdossierMedical!:FichierMedical;
  constructor(private routes:ActivatedRoute,private service:FichierMedicalService,
              private vacssinService: VacssinService, private mChron: MaladieChroniqueService,
              private allergieService: AllergieService,private location:Location) {
            this.resetForm()
  }
  resetForm(){
    this.fichier={
      periodiciteMaladieChroniqueDtos: [],
      date_Creation: new Date(),
      groupSanguin: "",
      id: 0,
      idAllergier: [],
      idMaladieCchroniques: [],
      idVaccins: [],
      notes: "",
      poid: "",
      taille: ""

    }
  }
  getDossierMedical(){
    this.service.getDossier(this.code).subscribe((response)=>{
      this.dossierMedical=response;
    },(errors)=>{
      console.log(errors)
    })
  }
  Modifier(e:any){
    console.log(this.fichier)
    this.service.ModifierDossier(this.fichier,this.code).subscribe(response=>{
      this.fichier=response
     this.location.back()
    },error => console.log(error))
  }
  public getAllAllergie(){
    this.allergieService.getAllAllergie().subscribe(response => {
      this.allergier = response;
    }, (error) => {
      console.log(error)
    })
  }
  public getAllMaldierChronique(){
    this.mChron.getAll().subscribe(response=> {
      this.maladiechronique = response;
    },(error) => {console.log(error)})
  }
  public getAllVacssin(){
    this.vacssinService.getAll().subscribe(response=> {
      this.vaccins = response;
    },(error) => {console.log(error)})
  }
  onTreeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
    this.AjouterdossierMedical.idMaladieCchroniques = selectedValues;
  }
  onTreeeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
    this.AjouterdossierMedical.idAllergier = selectedValues;
  }
  onTreeeeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
    this.AjouterdossierMedical.idVaccins = selectedValues;
  }
  ngOnInit(): void {
    this.getDossierMedical()
    this.getAllVacssin()
    this.getAllMaldierChronique()
    this.getAllAllergie()
  }
}
