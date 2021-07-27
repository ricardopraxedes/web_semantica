import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() items = JSON.parse('[{"id": "69bc38ba-a1b6-4d6d-b04d-c9df0d4a6c95", "name": "Hamburger",  "price": 40}]');
  @Input() user:String = "154c7db6-d128-48bc-bcb3-dc38af299459";
  @Output() productRemoved = new EventEmitter<Object[]>();
  @Output() transactionCompleted = new EventEmitter<Object[]>();
  constructor() { }

  totalSum=0;
  
  ngOnInit(): void {
    for (let soma of this.items){
      this.totalSum+=soma.price;
   
    }
    console.log(this.totalSum)
  }
  removeItem(index:Number){
    console.log(index)
   
    this.items.splice(index, 1);

  this.productRemoved.emit(this.items)
  console.log(this.items)
}
  makePurchase():void{

    for (let item of this.items){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "POST", 'http://127.0.0.1:5000/compra', false ); // false for synchronous request
      xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlHttp.send(`{"purchase": {
          "customer": {
            "id": "${this.user}"
          },
          "product": {
            "id": "${item.id}"
          }
        }
      }`)

    }
    this.items=[];
    this.transactionCompleted.emit(this.items)
    
  }
}
