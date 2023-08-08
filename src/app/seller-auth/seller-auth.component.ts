import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Signup } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin = true
  authError:undefined| string = ''
  constructor(private seller: SellerService, private router: Router) { }
  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  openLogin() {
    this.showLogin = true
  }
  openSignup() {
    this.showLogin = false
  }

  signUp(data: Signup) {
    let result = this.seller.userSignup(data);
    console.log(data)
  }

  Login(data: Signup) {
    this.authError="";
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Login Faild Check Email or Password"
      }
    })
    setTimeout(()=>
  (this.authError=undefined),1000)
  }
}
