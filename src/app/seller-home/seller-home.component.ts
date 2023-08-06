import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productMessage:undefined|string;
  productList:undefined |product[];
  icon=faTrash
  editIcon=faEdit
constructor(private product:ProductService){}
ngOnInit(){
  this.list();
}
deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      console.log("Deleted Id No:", id);
      if(result)
      {
        this.productMessage="Product Removed"
        this.list();
      }
    })
    setTimeout(() => {
      this.productMessage=undefined;
    }, 1000);
}
list(){
  this.product.productList().subscribe((result)=>{
    this.productList=result;
  })
}
}
