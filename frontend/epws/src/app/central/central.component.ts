import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {
  pageDTO = JSON.parse('{"page":"Store","store":"Selected"}');
  cart:Object[] =[{  id:"Placeholder",
  name: "Placeholder",
  price: 1000}];
  userId:String="";
  boxChosen ="products";
  constructor(private _route:ActivatedRoute) { }
  

  ngOnInit(): void {
    this.userId=this._route.snapshot.params['id']
    this.cart.pop();
   
  }
  boxSelect(selection:string):void{
    this.pageDTO.page = selection;
  }
}
