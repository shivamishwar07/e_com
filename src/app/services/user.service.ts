import { EventEmitter, Injectable } from '@angular/core';
import { Login, Signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignup(user:Signup){
    this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>{
      if(result)
      {
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
    })
  }
  userLogin(data:Login)
  {
    this.http.get<Signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        if(result && result.body && result.body.length){
          localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/'])
        }
        else{
          this.isLoginError.emit(true)
        }
        
        
      })
  }
  userAuthReload(){
    if(localStorage.getItem('user'))
    this.router.navigate(['/'])
  }
}
     
