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
  cartItems:number=0

  redirectToDetals(arg0: number) {
    throw new Error('Method not implemented.');
  }
  menuType: string = "default"
  sellerName: string = ""
  userName: string = ""
  searchResult: undefined | product[]
  constructor(private route: Router, private product: ProductService) { }
  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller"
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name;
          }
        }
          else if (localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user')
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user'
          }
          else {
            this.menuType = "default"
          }
      }
    });
    let cartData=localStorage.getItem('localCart');
      if(cartData)
      this.cartItems=JSON.parse(cartData).length;
      this.product.cartData.subscribe((item)=>{
        this.cartItems=item.length;
      })
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((data) => {
        if (data.length > 5)
          data.length = 5
        this.searchResult = data;
      })
      
    }
  }
  searchBlur() {
    this.searchResult = undefined
  }
  submitSearch(val: string) {
    if (val)
      this.route.navigate([`search/${val}`])
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }
}
