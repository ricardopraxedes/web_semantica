import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() item:String = ' ';
  products = [{  id:"Placeholder",
    name: "Placeholder",
    price: 1000}];
    
    
  @Output() productSelected = new EventEmitter<Object>();

  productClicked(id:String,name:String,value: Number) {
    this.productSelected.emit(JSON.parse('{"id":"'+id+'","name":"'+name+'","price":'+value+'}'));
  }

  constructor() { }
  
  ngOnInit(): void {
    console.log(this.item)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://127.0.0.1:5000/produtos', false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText)
    if(this.item=='Selected'){
        this.products= JSON.parse(xmlHttp.responseText);}
    if(this.item=="../../assets/images/FastShop.png"){
        this.products= JSON.parse('[{"id":"87bb6c4c-86ec-46ee-a1cb-f6d4db613f22","name":"TV","price":3000},{"id":"55a399c2-6fc5-459c-9d44-d5997e07ac0b","name":"Cellphone","price":1500}]');}
    if(this.item=="../../assets/images/KFC.png"){
      this.products= JSON.parse('[{"id": "6dc46822-64f8-46a5-b813-e2f186da0e58", "name": "Chicken", "price": 40}]');}
    if(this.item=="../../assets/images/McDonalds.png"){
      this.products= JSON.parse('[{"id": "69bc38ba-a1b6-4d6d-b04d-c9df0d4a6c95", "name": "Hamburger",  "price": 40}]');}  
    if(this.item=="../../assets/images/WorldTennis.png"){
        this.products= JSON.parse('[{"id": "cddece45-eb8b-45c0-ad40-00ef8df049f1", "name": "Boots", "price": 120},{"id": "c3c7e7fe-d122-48eb-8718-0739b746897d", "name": "Shoes", "price": 200}]');}    
   
  }

  
}
