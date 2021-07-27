import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-shophistory',
  templateUrl: './shophistory.component.html',
  styleUrls: ['./shophistory.component.css']
})
export class ShophistoryComponent implements OnInit {
  @Input() user:String = "154c7db6-d128-48bc-bcb3-dc38af299459";
  constructor() { }
  transactions:any[]=[]
  ngOnInit(): void {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://127.0.0.1:5000/minhas-compras/'+this.user, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText)
     this.transactions= JSON.parse(xmlHttp.responseText);}
  }

