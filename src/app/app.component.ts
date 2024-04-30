import {Component, HostBinding, OnInit} from '@angular/core';
import { AuthService, ScreenService} from './shared/services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService,private rout:Router) {
  }


  isAuthenticated() {
    return this.authService.isLogin();
  }

  ngOnInit(): void {
    if (!this.isAuthenticated()){
      this.rout.navigate(["/login-form"])
    }
  }
}
