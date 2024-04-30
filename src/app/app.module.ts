import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { ResetPasswordFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { ListEmployeComponent } from './modeles/Employe/list-employe/list-employe.component';
import { AjouterEmployeComponent } from './modeles/Employe/ajouter-employe/ajouter-employe.component';
import {FormsModule} from "@angular/forms";
import {DevExtremeModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule} from "devextreme-angular";
import {DxButtonModule} from "devextreme-angular/ui/button";
import { InterceptorService } from './shared/Interceptor/interceptor';
import { AllergieComponent } from './modeles/TableBase/allergie/allergie.component';
import { AnalyseComponent } from './modeles/TableBase/analyse/analyse.component';
import { MaladierChroniqueComponent } from './modeles/TableBase/maladier-chronique/maladier-chronique.component';
import { RisqueComponent } from './modeles/TableBase/risque/risque.component';
import { VacssinComponent } from './modeles/TableBase/vacssin/vacssin.component';
import { PostComponent } from './modeles/TableBase/post/post.component';
import { ModifierEmployeComponent } from './modeles/Employe/modifier-employe/modifier-employe.component';
import { GetEmployeComponent } from './modeles/DossierMedicale/get-employe/get-employe.component';
import { AjouterFichierMedicalComponent } from './modeles/DossierMedicale/ajouter-fichier-medical/ajouter-fichier-medical.component';
import { DossierMedicalComponent } from './modeles/DossierMedicale/dossier-medical/dossier-medical.component';
import { GetFichierMedicalComponent } from './modeles/DossierMedicale/get-fichier-medical/get-fichier-medical.component';
import { CreateAccountComponent } from './shared/components/create-account/create-account.component';
import { ModifierFichierMedicaleComponent } from './modeles/DossierMedicale/modifier-fichier-medicale/modifier-fichier-medicale.component';
import { DashboardComponent } from './modeles/dashboard/dashboard.component';
import {AgChartsAngular} from "ag-charts-angular";
import { AjouterRisqueComponent } from './modeles/TableBase/ajouter-risque/ajouter-risque.component';
import { AjouterMaladieChroniqueComponent } from './modeles/TableBase/ajouter-maladie-chronique/ajouter-maladie-chronique.component';
import { RisquesComponent } from './modeles/DossierMedicale/risques/risques.component';
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeComponent,
    AjouterEmployeComponent,
    AllergieComponent,
    AnalyseComponent,
    MaladierChroniqueComponent,
    RisqueComponent,
    VacssinComponent,
    PostComponent,
    ModifierEmployeComponent,
    GetEmployeComponent,
    AjouterFichierMedicalComponent,
    DossierMedicalComponent,
    GetFichierMedicalComponent,
    CreateAccountComponent,
    ModifierFichierMedicaleComponent,
    DashboardComponent,
    AjouterRisqueComponent,
    AjouterMaladieChroniqueComponent,
    RisquesComponent,
  ],
    imports: [
        BrowserModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        HttpClientModule,
        ResetPasswordFormModule,
        ChangePasswordFormModule,
        LoginFormModule,
        ToastrModule.forRoot(),
        UnauthenticatedContentModule,
        AppRoutingModule, BrowserModule,
        SideNavOuterToolbarModule,
        SideNavInnerToolbarModule,
        SingleCardModule,
        ChangePasswordFormModule,
        LoginFormModule,
        DxTemplateModule,
        DevExtremeModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        UnauthenticatedContentModule,
        DxButtonModule,
        DxSelectBoxModule,
        DxTextBoxModule,
        AppRoutingModule,
        FormsModule, AgChartsAngular
    ],
  providers: [
    AuthService,
    ScreenService,
    provideToastr(),
    provideAnimations(),
    {
          provide:HTTP_INTERCEPTORS,
        useClass:InterceptorService,
        multi:true
        },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
