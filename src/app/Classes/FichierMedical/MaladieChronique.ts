import {PeriodiciteMaladieChroniqueDto} from "./PeriodiciteMaladieChroniqueDto";

export interface MaladieChronique{
  malladieChronique:string;
  id:number;
  description:string;
  periodiciteMaladieChroniqueDtos:PeriodiciteMaladieChroniqueDto[]
}
