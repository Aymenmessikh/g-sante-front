import {PeriodiciteFicheMedicale} from "./PeriodiciteFicheMedicale";

export interface FichierMedical{
  id:number;
  idAllergier:number[];
  groupSanguin:string;
  idMaladieCchroniques:number[];
  idVaccins:number[];
  notes:string;
  taille:string;
  poid:string;
  date_Creation:Date;
  periodiciteMaladieChroniqueDtos:PeriodiciteFicheMedicale[]
}
