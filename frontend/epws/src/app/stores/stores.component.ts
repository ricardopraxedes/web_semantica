import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})


export class StoresComponent implements OnInit {

  @Output() storeSelected = new EventEmitter<Object>();

  storeClicked(value: String) {
    this.storeSelected.emit(JSON.parse('{"page":"Products","store":"'+value+'"}'));
  }

  constructor( ) {     
  }
  storesList:String=''
  stores:String[] =[]


  refresh(filter:string):void{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:5000/filtrar', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send('{"filter":"'+filter+'"}');
    //console.log((xmlHttp.responseText))
    

      this.storesList = (xmlHttp.responseText);
      this.stores=this.storesList.replace("[","").replace("]","").replace("'","").replace(" ","").split(",")

      this.stores=this.stores.map(x => "../../assets/images/"+x.replace("'","").replace(" ","").replace("'","")+".png")
      console.log(this.stores)
  }
  goProducts(destination:string):void{

    //this.route.navigate(['/', 'products']);
  }
  ngOnInit(): void {
       var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", 'http://127.0.0.1:5000/filtrar', false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send('{"filter":"Ordem Alfabetica"}');
    //console.log((xmlHttp.responseText))
    

      this.storesList = (xmlHttp.responseText);
      this.stores=this.storesList.replace("[","").replace("]","").replace("'","").replace(" ","").split(",")

      this.stores=this.stores.map(x => "../../assets/images/"+x.replace("'","").replace(" ","").replace("'","")+".png".replace(" ",""))
      console.log(this.stores)
  }

}
