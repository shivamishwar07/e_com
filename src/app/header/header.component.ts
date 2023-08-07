import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
redirectToDetals(arg0: number) {
throw new Error('Method not implemented.');
}
  menuType:string="default"
  sellerName:string=""
  searchResult:undefined|product[]
  constructor(private route:Router , private product:ProductService){}
  ngOnInit():void{
    this.route.events.subscribe((val:any)=>{
      if(val.url)
      {
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType="seller"
          if(localStorage.getItem('seller'))
          {
            let sellerStore=localStorage.getItem('seller');
            let sellerData=sellerStore&&JSON.parse(sellerStore)[0]
            this.sellerName=sellerData.name;
          }
        }
        else
        {
          this.menuType="default"
        }
      }
    })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']); 
  }
  searchProducts(query:KeyboardEvent){
    if(query)
    {
      const element=query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((data)=>{  
        if(data.length>5)
        data.length=5
        this.searchResult=data;
      })
    }
  }
  searchBlur(){
    this.searchResult=undefined
  }
  submitSearch(val:string){
    if(val)
    this.route.navigate([`search/${val}`])
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]); 
  }
}
