import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productDetails: undefined | product
  productQuantity: number = 1
  removeCart = false
  constructor(private activateRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productDetails = result


      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true
        }
        else
        {
          this.removeCart = false
        }
      }
      let user = localStorage.getItem('user')
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let items = result.filter((item: product) => productId?.toString() === item.productId?.toString());
          if (result.length) {
            this.removeCart = true
          }
          else {
            this.removeCart = false
          }
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity <= 2 && val === 'plus') {
      this.productQuantity += 1
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productDetails);
        this.removeCart = true;
      }
      // else {
      //   let user = localStorage.getItem('user');
      //   let userId = user && JSON.parse(user).id
      //   let cartData: cart = {
      //     ...this.productDetails,
      //     userId,
      //     productId: this.productDetails.id
      //   }
      //   delete cartData.id;
      //   this.product.addToCart(cartData).subscribe((result) => {
      //     if (result) {
      //       alert("Added Sucessfully")
      //       this.product.getCartList(userId)
      //       this.removeCart = true;
      //     }
      //   })
      // }
    }
  }
  removeToCart(productId: number) {
    this.product.removeItemFromCart(productId);
    //this.removeCart = false
  }

}

