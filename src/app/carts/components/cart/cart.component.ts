import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../service/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private service: CartsService) { }

  cartproduct: any[] = [];
  total: any = 0;
  success: boolean = false;
  ngOnInit() {
    this.getCartProduct()
  }


  getCartProduct() {
    if ("cart" in localStorage) {
      this.cartproduct = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }
  minsAmount(index: number) {
    this.cartproduct[index].quantity--;
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproduct))
  }

  addAmount(index: number) {
    this.cartproduct[index].quantity++;
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproduct))
  }

  detectChage() {
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproduct))
  }

  deleteProduct(index: number) {
    this.cartproduct.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproduct))
  }

  clearCart() {
    this.cartproduct = []
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartproduct))

  }


  getCartTotal() {
    this.total = 0
    for (let x in this.cartproduct) {
      this.total += this.cartproduct[x].item.price * this.cartproduct[x].quantity;
    }
  }

  addCart() {
    let products = this.cartproduct.map(item => {
      return { productId: item.item.id, quantity: item.quantity }
    })
    let Model = {
      userId: 5,
      date: new Date(),
      products: products
    }

    this.service.createNewCart(Model).subscribe(res => {
      this.success = true
    })
    console.log(Model)
  }
}