import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData=new EventEmitter<product[] | []>();
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
  trandyProducts(){
    return this.http.get<product[]>('http://localhost:3000/Products?_limit=8');
  }
  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/Products?q=${query}`);
  }
  localAddToCart(data:product){
    let cartData=[];
    let localCart=localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data])
    }
      
    else{
      cartData=JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData)
  }
  removeItemFromCart(productId:number)
  {
    let cartData=localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData)
      items=items.filter((item:product)=>productId!==item.id);
      console.log(items);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items)
    }
  }
  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
    //alert(cartData)
  }
  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'}).subscribe((result)=>{
      //console.log(result);
      if(result && result.body)
      this.cartData.emit(result.body)
    })
  }
} 
