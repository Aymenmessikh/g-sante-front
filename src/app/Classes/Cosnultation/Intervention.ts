import {ListEmploye} from "../Employe/ListEmploye";

export interface Intervention{
  idConsultation:number;
  dateConsultation:Date;
  resultats:string;
  employer:ListEmploye;
  typeConsultations:string;
  ordanance:number;
  maladier:number
  codeEmployer:string;
  lieu:string;
}
