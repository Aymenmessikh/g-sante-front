import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.scss']
})
export class DossierMedicalComponent implements OnInit,OnChanges{
  tabs!:string[]
  page!:any;
  isNew!:any
  witdh!:number;

  widgetWrapperClasses = {
    'widget-wrapper': true,
    'widget-wrapper-horizontal': true,
    'widget-wrapper-vertical': false,
    'strict-width': false,
  };

  onTabClick(tabName: string) {
    switch(tabName) {
      case 'Employe':
        this.page="Employe";
        break;
      case 'Fiche Medicale':
        this.page="Fiche Medicale";
        break;
      case 'Visites':
        this.page="Visites";
        break;
      case 'Consultation':
        this.page="Consultation";
        break;
      case 'Ajouter Fiche Medicale':
        this.page='Ajouter Fiche Medicale';
        break;
      case 'Risques':
        this.page='Risques';
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
     this.isNew=localStorage.getItem("ficheMedicale")
    if (this.isNew=="true"){
      this.tabs=["Employe","Fiche Medicale","Risques"]
      this.witdh=600
    }else {
      this.tabs = ["Employe", "Ajouter Fiche Medicale"]
      this.witdh = 400
    }
    this.page=localStorage.getItem("page")
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (localStorage.getItem("page")){
      this.page=localStorage.getItem("page");
    }
  }
}
