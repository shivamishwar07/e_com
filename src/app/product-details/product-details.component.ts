import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetails:undefined|product
  productQuantity:number=1
constructor(private activateRoute:ActivatedRoute, private product:ProductService){}
ngOnInit(){
  let productId=this.activateRoute.snapshot.paramMap.get('productId')
  productId&&this.product.getProduct(productId).subscribe((result)=>{
    this.productDetails=result
  })
}
handleQuantity(val:string){
  if(this.productQuantity<=2 && val==='plus')
  {
    this.productQuantity+=1
  }
  else if(this.productQuantity>1 && val==='min')
  {
    this.productQuantity-=1;
  }
  // if(this.productQuantity>20)
  // alert("Maximum Reached")

  // if(this.productQuantity<1)
  // alert("Monimum quantity is 1")
}

}

