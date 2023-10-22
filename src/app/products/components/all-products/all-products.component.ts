import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { lastValueFrom } from 'rxjs';
import { product } from '../../models/products';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: product[] = [];
  categoreis: string[] = [];
  loadig: boolean = false;
  cartproduct: any[] = [];

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.getProducts()
    this.getCategoreis()
  }

  getProducts() {
    this.loadig = true;
    this.service.getAllproducts().subscribe((res: any) => {
      this.products = res
      this.loadig = false;
    }, error => {
      this.loadig = false
      alert("Erorr from resurce")
      // console.log(Error)
    })
  }

  getCategoreis() {
    this.loadig = true
    this.service.getAllCategoreis().subscribe((res: any) => {
      this.categoreis = res
      this.loadig = false
      console.log(res)
    }, error => {
      this.loadig = false
      alert("Erorr from resurce")
      // console.log(Error)
    })
  }

  filterCategoreis(event: any) {

    let value = event.target.value;
    (value == "all") ? this.getProducts() : this.getProductsCategory(value)
    // if (value == "all") { 
    //   this.getProducts()
    //  } else {
    //    this.getProductsCategory(value)
    //   }

  }

  getProductsCategory(keyword: string) {
    this.loadig = true
    this.service.getProductsByCategoreis(keyword).subscribe((res: any) => {
      this.loadig = false
      this.products = res

    })
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cartproduct = JSON.parse(localStorage.getItem("cart")!)
      let exist =this.cartproduct.find(item => item.item.id == event.item.id)
      if(exist){
        alert("product is already in your cart")
      }else{
        this.cartproduct.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cartproduct))
      }
   
    } else {
      this.cartproduct.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartproduct))
    }
   
  }
}
