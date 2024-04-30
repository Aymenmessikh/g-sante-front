import {ListEmploye} from "../Employe/ListEmploye";

export interface Consultation{
  idConsultation:number;
  dateConsultation:Date;
  resultats:string;
  employer:ListEmploye;
  typeConsultations:string;
  ordanance:number;
  maladier:number
  codeEmployer:string;
}
