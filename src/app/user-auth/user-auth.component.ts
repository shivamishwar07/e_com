import { Component } from '@angular/core';
import { Login, Signup } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true
  authError:undefined|string=''
  constructor(private user:UserService){}
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
}
