import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }
  addProduct(data:product){
    console.log("Service Called");
    return this.http.post('http://localhost:3000/Products',data)
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/Products/${id}`)
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/Products/${product.id}`,product);
  }
  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/Products/${id}`)
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/Products');
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=3');
  }
} 
