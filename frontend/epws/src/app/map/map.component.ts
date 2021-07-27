import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  storesList:String=''
  stores:String[] =[]
  storeLocation="Por favor selecione a loja que voce deseja ir"
  constructor() { }

  ngOnInit(): void {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:5000/filtrar', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send('{"filter":"Ordem Alfabetica"}');
    //console.log((xmlHttp.responseText))
    

      this.storesList = (xmlHttp.responseText);
      this.stores=this.storesList.replace("[","").replace("]","").replace("'","").replace(" ","").split(",")

      this.stores=this.stores.map(x => "../../assets/images/"+x.replace("'","").replace(" ","").replace("'","")+".png")
      console.log(this.stores)
  }
  storeSelected(storeName:String): void{
    let xmlHttp = new XMLHttpRequest();
    storeName=storeName.split('/')[4].replace(".png","");
    console.log(storeName);
    xmlHttp.open( "GET", 'http://127.0.0.1:5000/loja/localizacao/'+storeName, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send()
    this.storeLocation="A loja se encotra no corredor:"+xmlHttp.responseText

  }
}
