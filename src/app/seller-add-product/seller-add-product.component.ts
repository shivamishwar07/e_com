import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  addProductMessage:string|undefined
  constructor(private procuct:ProductService ){}
 submit(data:product){
  if(data.category && data.color && data.desc && data.image && data.name && data.price){
  this.procuct.addProduct(data).subscribe((result)=>{
    if(result){
      this.addProductMessage="Sucessfull"
    }
    else
    {
      this.addProductMessage="Something went wrong"
    }
    setTimeout(()=>
      (this.addProductMessage=undefined),1000)
  });
}
else{
  alert("Check Input Field")
}
 }
}
