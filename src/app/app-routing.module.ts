import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { ProfileComponent } from './pages/profile/profile.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import {AuthGuard} from "./shared/guard/auth.guard";
import {AjouterEmployeComponent} from "./modeles/Employe/ajouter-employe/ajouter-employe.component";
import {ListEmployeComponent} from "./modeles/Employe/list-employe/list-employe.component";
import {RisqueComponent} from "./modeles/TableBase/risque/risque.component";
import {MaladierChroniqueComponent} from "./modeles/TableBase/maladier-chronique/maladier-chronique.component";
import {AllergieComponent} from "./modeles/TableBase/allergie/allergie.component";
import {VacssinComponent} from "./modeles/TableBase/vacssin/vacssin.component";
import {AnalyseComponent} from "./modeles/TableBase/analyse/analyse.component";
import {PostComponent} from "./modeles/TableBase/post/post.component";
import {ModifierEmployeComponent} from "./modeles/Employe/modifier-employe/modifier-employe.component";
import { GetEmployeComponent } from './modeles/DossierMedicale/get-employe/get-employe.component';
import {DossierMedicalComponent} from "./modeles/DossierMedicale/dossier-medical/dossier-medical.component";
import {
  AjouterFichierMedicalComponent
} from "./modeles/DossierMedicale/ajouter-fichier-medical/ajouter-fichier-medical.component";
import {GestionnaireGuard} from "./shared/guard/gestionnaire.guard";
import {MedecinChefGuard} from "./shared/guard/medecin-chef.guard";
import {MedecinGuard} from "./shared/guard/medecin.guard";
import {CreateAccountComponent} from "./shared/components/create-account/create-account.component";
import {
  ModifierFichierMedicaleComponent
} from "./modeles/DossierMedicale/modifier-fichier-medicale/modifier-fichier-medicale.component";
import {DashboardComponent} from "./modeles/dashboard/dashboard.component";
import {AjouterRisqueComponent} from "./modeles/TableBase/ajouter-risque/ajouter-risque.component";
import {
  AjouterMaladieChroniqueComponent
} from "./modeles/TableBase/ajouter-maladie-chronique/ajouter-maladie-chronique.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'dasboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ,MedecinChefGuard]
  },
  {
    path: 'home',
    component: ListEmployeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'ajouterRisque',
    component: AjouterRisqueComponent,
    canActivate: [ AuthGuardService,MedecinChefGuard ]
  },
  {
    path: 'ajouterMchron',
    component: AjouterMaladieChroniqueComponent,
    canActivate: [ AuthGuardService,MedecinChefGuard  ]
  },
  {
    path: 'dossierMed',
    component: DossierMedicalComponent,
    canActivate: [ AuthGuardService ,MedecinGuard ]
  },
  {
    path: 'nvDossier/:id',
    component: AjouterFichierMedicalComponent,
    canActivate: [ AuthGuardService ,MedecinGuard ]
  },
  {
    path: 'modifierFichierMedicale',
    component: ModifierFichierMedicaleComponent,
    canActivate: [ AuthGuardService,MedecinGuard ]
  },
  {
    path: 'listEmployer',
    component: ListEmployeComponent,
    canActivate: [ AuthGuardService ,MedecinGuard ]
  },
  {
    path: 'nvEmployer',
    component: AjouterEmployeComponent,
    canActivate: [ GestionnaireGuard ,AuthGuardService]
  },
  {
    path: 'modifierEmploye/:code',
    component: ModifierEmployeComponent,
    canActivate: [ GestionnaireGuard ,AuthGuardService ]
  },
  {
    path: 'employe/:code',
    component: GetEmployeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'listRisque',
    component: RisqueComponent,
    canActivate: [ GestionnaireGuard ,AuthGuardService]
  },
  {
    path: 'allergie',
    component: AllergieComponent,
    canActivate: [ AuthGuardService,MedecinChefGuard ]
  },
  {
    path: 'mchron',
    component: MaladierChroniqueComponent,
    canActivate: [ AuthGuardService,MedecinChefGuard ]
  },
  {
    path: 'post',
    component: PostComponent,
    canActivate: [ GestionnaireGuard,AuthGuardService ]
  },
  {
    path: 'listAnalyse',
    component: AnalyseComponent,
    canActivate: [ AuthGuardService ,MedecinChefGuard]
  },
  {
    path: 'vacssin',
    component: VacssinComponent,
    canActivate: [ AuthGuardService ,MedecinChefGuard]
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-accounte',
    component: CreateAccountComponent,
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    ProfileComponent,
  ]
})
export class AppRoutingModule { }
