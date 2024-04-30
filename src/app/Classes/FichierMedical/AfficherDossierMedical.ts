import {Allergie} from "./Allergie";
import {MaladieChronique} from "./MaladieChronique";
import {Vacssin} from "./Vacssin";
import {AfficherControleMaladiesChronique} from "../RisqueAnalyse/AfficherControleMaladiesChronique";
import {AfficherControleMedicaleByFicheMedicale} from "./AfficherControleMedicaleByFicheMedicale";

export interface AfficherDossierMedical{
  //dateProchaineVisit:Date;
  //datederniereVisit:Date;
  //ajouterVisit:Boolean;
  id:number;
  allergier:Allergie[];
  groupSanguin:string;
  maladie_chroniques:AfficherControleMaladiesChronique[];
  afficherControleByFicheMedicales:AfficherControleMedicaleByFicheMedicale[]
  vaccins:Vacssin[];
  notes:string;
  taille:string;
  poid:string;
  date_Creation:Date;
}
