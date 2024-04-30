import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VacssinService} from "../../../shared/services/vacssin.service";
import {MaladieChroniqueService} from "../../../shared/services/maladie-chronique.service";
import {AllergieService} from "../../../shared/services/allergie.service";
import {AfficherDossierMedical} from "../../../Classes/FichierMedical/AfficherDossierMedical";
import {MaladieChronique} from "../../../Classes/FichierMedical/MaladieChronique";
import {Vacssin} from "../../../Classes/FichierMedical/Vacssin";
import {Allergie} from "../../../Classes/FichierMedical/Allergie";
import {FichierMedical} from "../../../Classes/FichierMedical/FichierMedical";
import {FichierMedicalService} from "../../../shared/services/fichier-medical.service";
import {
  AfficherControleMedicaleByFicheMedicale
} from "../../../Classes/FichierMedical/AfficherControleMedicaleByFicheMedicale";
import {AfficherControleMaladiesChronique} from "../../../Classes/RisqueAnalyse/AfficherControleMaladiesChronique";
@Component({
  selector: 'app-get-fichier-medical',
  templateUrl: './get-fichier-medical.component.html',
  styleUrls: ['./get-fichier-medical.component.scss']
})
export class GetFichierMedicalComponent implements OnInit{
  code:any=localStorage.getItem("code");
  disable:boolean=true;
  dossierMedical!:AfficherDossierMedical;
  maladiechronique!: AfficherControleMaladiesChronique[];
  controleMedicaleByFiche!:AfficherControleMedicaleByFicheMedicale[]
  vaccins!: Vacssin[];
  allergier!: Allergie[];
  submitButtonOptions = {
    text: "Ajouter",
    useSubmitBehavior: true
  }
  AjouterdossierMedical!: FichierMedical;
  constructor(private routes:ActivatedRoute,private service:FichierMedicalService,private route:Router,
              private vacssinService: VacssinService, private mChron: MaladieChroniqueService, private allergieService: AllergieService) {
  }
  getDossierMedical(){
    this.service.getDossier(this.code).subscribe((response)=>{
      this.dossierMedical=response;
      console.log(this.dossierMedical)
      this.maladiechronique=this.dossierMedical.maladie_chroniques;
      this.controleMedicaleByFiche=this.dossierMedical.afficherControleByFicheMedicales
      console.log(this.maladiechronique)
      this.vaccins=this.dossierMedical.vaccins;
      this.allergier=this.dossierMedical.allergier;
    },(errors)=>{
      console.log(errors)
    })
  }

  Modifier() {
    this.route.navigate(["/modifierFichierMedicale"])
  }
  ngOnInit(): void {
    this.getDossierMedical()

  }

}
