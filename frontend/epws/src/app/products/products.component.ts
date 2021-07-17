import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [{  id:"Placeholder",
    name: "Placeholder",
    price: 1000}];
  constructor() { }
  
  ngOnInit(): void {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://127.0.0.1:5000/produtos', false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(JSON.parse(xmlHttp.responseText))
    this.products= JSON.parse(xmlHttp.responseText);
    
  }

  
}
