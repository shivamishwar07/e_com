import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData:undefined|product
  productMessage:undefined|string
  constructor(private route:ActivatedRoute, private product:ProductService, private routee:Router){
  }
  ngOnInit(): void {
      let productId=this.route.snapshot.paramMap.get('id');
      console.log(productId);
      productId && this.product.getProduct(productId).subscribe((result)=>{
        console.log(result);
        this.productData=result
      })
  }
  submit(data:product){
    if(this.productData)
    data.id=this.productData.id;
    this.product.updateProduct(data).subscribe((result)=>{
      if(result)
      this.productMessage="Product updated successfully"
    setTimeout(() => {
      this.productMessage=undefined
    }, 1000); 
    })
    setTimeout(() => {
      this.routee.navigate(['seller-home']);
    },1000);
    
  }
}

