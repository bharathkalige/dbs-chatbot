import { Component, OnInit, Inject, InjectionToken, ElementRef } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../responseMessage';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { RegisterService } from '../register.service';
import { LocalStorage1Service } from '../local-storage1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public id01;
  public id02;
  public id03;
  public user: User;
  public message1;
  public val="password";
  public val2='fa fa-eye icon';

  constructor(private el: ElementRef, private _sessionStorageService: LocalStorage1Service, private router: Router, private _registerService: RegisterService, private _loginService: LoginService) {

  }

  ngOnInit() {
    this.message1 = new ResponseMessage(null, null);
    this.user = new User(null, null, null, null, null);
    this.id01 = 'block';
  }
  onClickGone() {
    this.id01 = 'none';
    this.id02 = 'none';
    this.router.navigate(['/home']);
  }
  onSubmitRegister() {

    let resp = this._registerService.saveUser(this.user).subscribe(data => {
      this.message1.message = data.message;
      this.message1.userId = data.userId;
      console.log(data);
      this._sessionStorageService.saveInSession('user_id', this.message1.userId);
    });
  }
  onRegister() {
    this.id01 = 'none';
    this.id02 = 'block';
  }
  onSubmitLogin() {

    let resp = this._loginService.findUser(this.user).subscribe(data => {
      this.message1.message = data.message;
      this.message1.userId = data.userId;
      console.log(data);
      this._sessionStorageService.saveInSession('user_id', this.message1.userId);
    });
  }

  viewPassword()
{
 if (this.val == 'password')
 {
   this.val='text';
   this.val2='fa fa-eye-slash icon';
 }
 else
 {
   this.val='password';
   this.val2='fa fa-eye icon';
 }
}
}