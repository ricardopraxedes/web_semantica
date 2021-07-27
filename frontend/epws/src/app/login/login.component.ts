import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }
  idUser:String='';
  userName:String="";
  ngOnInit(): void {
  }
  recordUser(){
    console.log(this.userName);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:5000/cadastro', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(	`{"name":"${this.userName}"}`);
    this.idUser=(xmlHttp.responseText)
    this._router.navigate(['central',this.idUser]);
  }

  goUser(){
    this._router.navigate(['central',this.idUser]);
  }
}
