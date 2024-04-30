import {Component, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EmployeServiceService} from "../../../shared/services/employe-service.service";
import {ListEmploye} from "../../../Classes/Employe/ListEmploye";
@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent implements OnInit{
  employes!:ListEmploye[]
  button!:boolean;
  employerId!:number;
  popupVisible = false;
  disaple!:boolean
  role:any=localStorage.getItem('role');

  constructor(private service: EmployeServiceService,private route:Router,private notification:ToastrService) {
  }
  isdisaple(){
    if (this.role=="Gestionnaire" || this.role=="Informaticien"){
      return this.disaple=false
    }else return this.disaple=true
  }

  public getAllEmployer() {
    this.service.getAllEmploye().subscribe(
      (response) => {
        this.employes = response;
        console.log(this.employes)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public deleteEmployer(e: { row: { data: { id: number } } }){
    this.popupVisible = true;
    this.employerId = e.row.data.id;
  }
  public delete(){
    this.annuler()
    this.service.SuprimmerEmp(this.employerId).subscribe((response)=>{
        this.notification.success("Employé Supprimé avec Succès.")
        this.getAllEmployer()
      },error => {
        console.log(error)
        this.notification.info("Tu ne peux pas supprimer cet employé.")
      }
    )
  }
  annuler(){
    this.popupVisible = false;
  }
  sendId(e: { row: { data: { matricule: string } } },event: { row: { data: { fichierMedical: boolean } }} ){
    const code = e.row.data.matricule;
    const isnew = event.row.data.fichierMedical ? event.row.data.fichierMedical.toString() : '';
    localStorage.setItem("code", code);
    localStorage.setItem("ficheMedicale",isnew);
    this.route.navigate(['/dossierMed']);
  }
  getDossierMedical(e: { row: { data: { matricule: string } } }, event: { row: { data: { fichierMedical: boolean } } }) {
    const code = e.row.data.matricule;
    const isnew = event.row.data.fichierMedical ? event.row.data.fichierMedical.toString() : '';
    localStorage.setItem("code", code);
    localStorage.setItem("ficheMedicale", isnew);
    this.route.navigate(['/dossierMed']);
  }
  getDossierMedicale(e:any) {
    const code = e.data.matricule;
    const isnew = e.data.fichierMedical.toString()
     localStorage.setItem("code", code);
     localStorage.setItem("ficheMedicale", isnew);
     this.route.navigate(['/dossierMed']);
  }

  ngOnInit(): void {
    this.getAllEmployer();
    this.isdisaple()
  }
  public modifier(e: { row: { data: { matricule: string } } }){
    const code = e.row.data.matricule;
    this.route.navigate(['/modifierEmploye',code]);
  }
  canAdd(e: any) {
    return e.row?.data?.fichierMedical
  }
}
