import { Component,EventEmitter,  Input,Output, OnInit } from '@angular/core';
import { product } from '../../models/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
@Input() data!:product
@Output() item = new EventEmitter()
addButton:boolean=false;
amount:number=0;

ngOnInit(){

}

add(){
this.item.emit({item:this.data , quantity:this.amount})
}
}
