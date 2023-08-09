import { Component } from '@angular/core';
import { Login, Signup, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true
  authError:undefined|string=''
  constructor(private user:UserService, private product:ProductService){}
signUp(data:Signup){
  if(data.email && data.name && data.password)
this.user.userSignup(data); 
}
Login(data:Login){
  this.authError=''
  if(data.email && data.password)
  this.user.userLogin(data);
this.user.isLoginError.subscribe((isError) => {
  if (isError) {
    this.authError = "Login Faild Check Email or Password"
  }
  else{
   this.localCartToRemoteCart() 
  }
})
setTimeout(()=>
  (this.authError=undefined),1000)
}

ngOnInit(){
  this.user.userAuthReload();
}
openLogin(){
this.showLogin=false
}
openSignup(){
this.showLogin=true
}
localCartToRemoteCart(){
  let data=localStorage.getItem('localCart');
  let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;
  if(data){
    let cartDataList:product[]=JSON.parse(data);
    cartDataList.forEach((product:product,index)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId,
      }
      delete cartData.id;
      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((data)=>{
          if(data)
          console.log("Item stored in db");
        })
        if(cartDataList.length==index+1)
        localStorage.removeItem('localCart')
      }, 500);
      if(cartDataList.length===index+1)
      localStorage.removeItem('localCart')
    })
  }
  setTimeout(()=>{
    this.product.getCartList(userId)
  },2000)
}
}
