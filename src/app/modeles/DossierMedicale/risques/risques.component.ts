import {Component, OnInit} from '@angular/core';
import {AfficherPeriodicteRisque} from "../../../Classes/RisqueAnalyse/AfficherPeriodicteRisque";
import {AnalyseService} from "../../../shared/services/analyse.service";

@Component({
  selector: 'app-risques',
  templateUrl: './risques.component.html',
  styleUrls: ['./risques.component.scss']
})
export class RisquesComponent implements OnInit{
  periodiciteControleMedicale!:AfficherPeriodicteRisque[]
  code!:any
  constructor(private service:AnalyseService) {
  }
  getControlebyRisque(): void {
    this.service.getAllAnalyseByRisque(this.code).subscribe(
      (response) => {
        this.periodiciteControleMedicale = response;
        console.log(this.periodiciteControleMedicale)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  ngOnInit(): void {
    this.code=localStorage.getItem("code")
    this.getControlebyRisque()
  }
}
