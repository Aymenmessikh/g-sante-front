import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {UserDto} from "../../Classes/UserDto";

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent implements OnInit{
  colCountByScreen: object;

  constructor( private service:UserService) {
    this.user = {
      email: "", id: 0, matricule: "", nome: "", prenom: "", role: ""
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 2
    };
  }
  user!:UserDto
  token:any=localStorage.getItem('token')
  getUser(){
    this.service.getUser(this.token).subscribe(response=>{
      this.user=response
    },error => console.log(error))
  }

  ngOnInit(): void {
    this.getUser()
  }
}
