import {MedicamentDto} from "./MedicamentDto";

export interface OrdananceDto{
  idOrdanance:number;
  isExiste:Boolean;
  dateCerationOrdanance:Date;
  medicamentDtos:MedicamentDto[];
}
