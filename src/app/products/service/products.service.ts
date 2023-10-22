import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http:HttpClient) { }


  getAllproducts(){
    return this.http.get('https://fakestoreapi.com/products')
  }

  getAllCategoreis(){
    return this.http.get('https://fakestoreapi.com/products/categories')
  }

  getProductsByCategoreis(keyword:string){
    return this.http.get('https://fakestoreapi.com/products/category/'+keyword)
  }

  getProductById(id:any){
    return this.http.get('https://fakestoreapi.com/products/'+id)
  }
}
