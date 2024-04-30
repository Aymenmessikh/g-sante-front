import {Analyse} from "../RisqueAnalyse/Analyse";
import {Risque} from "../RisqueAnalyse/risque";

export interface Post {
  analyses: Analyse[];
  department: string;
  direction: string;
  codePost:string;
  fonction: string;
  idPost: number;
  risques: Risque[];
}
