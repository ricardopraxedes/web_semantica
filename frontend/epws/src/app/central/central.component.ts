import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.css']
})
export class CentralComponent implements OnInit {

  boxChosen ="products";
  constructor() { }
  
  ngOnInit(): void {
    
  }
  boxSelect(selection:string):void{
    this.boxChosen = selection;
  }
}
