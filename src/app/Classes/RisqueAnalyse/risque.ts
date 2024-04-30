import {PeriodiciteRisqueDto} from "./PeriodiciteRisqueDto";

export interface Risque{
  id:number;
  risque:string;
  description:string;
  periodiciteRisqueDtos:PeriodiciteRisqueDto[];
}
