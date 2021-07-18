import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  constructor() { }
  storesList:String=''
  stores:String[] =[]

  ngOnInit(): void {
       var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:5000/filtrar', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send('{"filter":"Ordem Alfabetica"}');
    //console.log((xmlHttp.responseText))
    
    const response =  fetch('http://127.0.0.1:5000/filtrar', {
      method: 'POST',
      body: '{"filter":"Ordem Alfabetica"}',
      headers: {'Content-Type': 'application/json; charset=UTF-8'} });
      this.storesList = (xmlHttp.responseText);
      this.stores=this.storesList.replace("[","").replace("]","").replace("'","").replace(" ","").split(",")

      this.stores=this.stores.map(x => "../../assets/images/"+x.replace("'","").replace(" ","").replace("'","")+".png")
      console.log(this.stores)
  }

}
