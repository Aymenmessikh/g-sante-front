import {OrdananceDto} from "./OrdananceDto";
import {MaladieDto} from "./MaladieDto";
import {LieuDto} from "./LieuDto";

export interface AjouterConsultation{
  idConsultation:number;
  description:string;
  resultats:string;
  diagnostic:string;
  typeConsultations:string;
  dateConsultation:Date;
  ordananceDto:OrdananceDto;
  maladierDto:MaladieDto;
  lieuDto:LieuDto ;
}
