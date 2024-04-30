import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { IUser } from '../../services/auth.service';
import {DxButtonModule} from "devextreme-angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-panel',
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})

export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: IUser | null;
  nom:any=localStorage.getItem("nom")
  prenom:any=localStorage.getItem("prenom")
  logout(){
    this.routes.navigate(['login-form'])
    localStorage.clear()
  }

  constructor(private routes:Router) {}
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule,
    DxButtonModule
  ],
  declarations: [ UserPanelComponent ],
  exports: [ UserPanelComponent ]
})
export class UserPanelModule { }
