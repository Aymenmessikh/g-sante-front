import {Component, OnInit} from '@angular/core';
import {FichierMedicalService} from "../../../shared/services/fichier-medical.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MaladieChroniqueService} from "../../../shared/services/maladie-chronique.service";
import {VacssinService} from "../../../shared/services/vacssin.service";
import {AllergieService} from "../../../shared/services/allergie.service";
import {ToastrService} from "ngx-toastr";
import {FichierMedical} from "../../../Classes/FichierMedical/FichierMedical";
import {MaladieChronique} from "../../../Classes/FichierMedical/MaladieChronique";
import {Vacssin} from "../../../Classes/FichierMedical/Vacssin";
import {Allergie} from "../../../Classes/FichierMedical/Allergie";
import {AfficherPeriodicteRisque} from "../../../Classes/RisqueAnalyse/AfficherPeriodicteRisque";
import {AnalyseService} from "../../../shared/services/analyse.service";
import {AfficherControleMaladiesChronique} from "../../../Classes/RisqueAnalyse/AfficherControleMaladiesChronique";
import {PeriodiciteFicheMedicale} from "../../../Classes/FichierMedical/PeriodiciteFicheMedicale";
import {Analyse} from "../../../Classes/RisqueAnalyse/Analyse";

@Component({
  selector: 'app-ajouter-fichier-medical',
  templateUrl: './ajouter-fichier-medical.component.html',
  styleUrls: ['./ajouter-fichier-medical.component.scss']
})
export class AjouterFichierMedicalComponent implements OnInit{
  periodiciteControleMedicale!:AfficherPeriodicteRisque[]
  periodiciteMaladiesChronique!:AfficherControleMaladiesChronique[]
  code!:any
  idMladiesChronique!:number[]
  afficherControleByMaladiesChronique!:AfficherControleMaladiesChronique[]
  lignPeriode!:PeriodiciteFicheMedicale
  ajouterControleMedicale=false
  ajouterMaladiesChronique=false
  analyse!:Analyse[];
  periodicite=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
  constructor(private service: FichierMedicalService, private routes: ActivatedRoute,
              private vacssinService: VacssinService, private mChron: MaladieChroniqueService,
              private allergieService: AllergieService,

              private notification:ToastrService,private rout:Router,private analyseService:AnalyseService) {

    this.resetPriodiciteRisque()
    this.resetForm()
  }
  resetForm(){
    this.dossierMedical = {
      periodiciteMaladieChroniqueDtos: [{
        periodicite:0,
        idPeriodicite:0,
        controleMedicale:"",
        number:0
      }],
      idAllergier: [],
      idMaladieCchroniques: [],
      idVaccins: [],
      date_Creation: new Date(),
      id: 0,
      taille: "",
      poid: "",
      groupSanguin: "",
      notes: ""
    };

  }
  resetPriodiciteRisque(){
    this.lignPeriode={
      number: 0,
      controleMedicale: "", idPeriodicite: 0, periodicite: 0

    }
  }
  number=0;
  addControleMedicale(){
    this.lignPeriode.number=this.number
    this.number=this.number+1
    this.dossierMedical.periodiciteMaladieChroniqueDtos.push(this.lignPeriode);
    this.resetPriodiciteRisque()
    this.changeAjouterControleMedicale()
  }
  suprimmer(e: { row: { data: { number: number } } }){
    this.dossierMedical.periodiciteMaladieChroniqueDtos.splice(e.row.data.number,1);
  }
  addMaladiesChronique(): void {
    this.idMladiesChronique=this.dossierMedical.idMaladieCchroniques
    this.getControleMedicalesByMaladiesChronique()
    this.changeAjouterMaladiesChronique()
  }
  getControleMedicalesByMaladiesChronique(){
    this.analyseService.getAllAnalyseByMaladiesChronique(this.idMladiesChronique).subscribe(response=>{
      this.afficherControleByMaladiesChronique=response
      console.log(this.afficherControleByMaladiesChronique)
    },error => console.log(error))
  }
  changeAjouterControleMedicale(){
    this.getAnalyse()
    this.ajouterControleMedicale=!this.ajouterControleMedicale
  }
  changeAjouterMaladiesChronique(){
    this.ajouterMaladiesChronique=!this.ajouterMaladiesChronique
  }

  id!: number;
  dossierMedical!: FichierMedical;
  maladiechronique!: MaladieChronique[];
  groupSanguin = ["A+", "A-", "B+", "B-", "C+", "C-", "O+", "O-", "AB+", "AB-"]
  vaccins!: Vacssin[];
  allergier!: Allergie[];
  submitButtonOptions = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  submitButtonOption = {
    text: "Ajouter",
    type:"default",
    useSubmitBehavior: true
  }
  public Ajouter(e: Event) {
    e.preventDefault()
    this.AjouterFichierMedical()
    // this.changePopupeVisible()
  }
  AjouterFichierMedical(){
      console.log(this.dossierMedical)
    this.service.AjouterDossier(this.dossierMedical, this.code).subscribe((response) => {
      this.dossierMedical = response;
      this.notification.success("Fichier Medical Ajouter avec Succès.")
      this.afficherControleByMaladiesChronique=[]
    }, (errors) => {
      this.notification.error('Erreur')
      console.log(errors)
    })
  }
  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      this.id = params['id'];
    });
    this.code=localStorage.getItem("code")
    this.getAllAllergie()
    this.getAllMaldierChronique()
    this.getAllVacssin()
    this.getControlebyRisque()
    this.dossierMedical.periodiciteMaladieChroniqueDtos.splice(0,1)
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
    this.dossierMedical.idMaladieCchroniques = selectedValues;
  }
  onTreeeeViewSelectionChanged(e:any) {
    const selectedValues = e.component.getSelectedNodeKeys();
    this.dossierMedical.idVaccins = selectedValues;
  }
  getControlebyRisque(): void {
    this.analyseService.getAllAnalyseByRisque(this.code).subscribe(
      (response) => {
        this.periodiciteControleMedicale = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  public getAnalyse(){
    this.analyseService.getAllAnalyse().subscribe(reponse=>{
      this.analyse=reponse
    },(errors)=>{
      console.log(errors)
    })
  }
}
