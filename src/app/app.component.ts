import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpRequestService } from './services/http-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  userlogin: string;
  userpassword: string;
  showNotify: boolean = false;
  message: string;
  mistake: boolean;
  url: string = '/api/login/';
  allOk: boolean;
  messages: any = {
    dataInvalid: 'Wrong login or password',
    noUser: 'No such user',
    error: 'Something wrong, try again',
    ok: 'Log in success'
  };
  error: any;
  startUserName: string;
  showForm: boolean = true;
  showLogOut: boolean = false;

  constructor( private httpService: HttpRequestService ){}

  ngOnInit(){
    this.startUserName = 'Unknown user';
    let token = JSON.parse(localStorage.getItem('token'));
    let name = JSON.parse(localStorage.getItem('name'));

    if (token && name) {
      this.httpService.saveToken(name, token);
      this.startUserName = name;
      this.showNotify = false;
      this.showForm = false;
      this.showLogOut = true;
    }
  }


  logInUser(form: NgForm): void {


    this.httpService.sendUserData(form.value, this.url).subscribe(data => {
          // if user is exist should get a 400 series mistake
          this.showNotify = true;
          if (!data.success){
            this.message = data.message === "Username or password invalid" ?  this.messages.dataInvalid : this.messages.noUser;
            this.allOk = false
          } else {
            this.message = this.messages.ok;
            this.allOk = true;
            this.startUserName = form.value.username;
            this.httpService.saveToken(form.value.username, data.token);
            form.reset();
            let timeout = setTimeout(() => {
              this.showNotify = false;
              this.showForm = false;
              this.showLogOut = true;
            }, 1500)
          }
        },
        error => {
          this.error = error; console.log(error);
          this.message = this.messages.error;
          this.showNotify = true;
          this.allOk = false
        }
    );
  }

  logOut(): void {
    this.httpService.clearToken();
    this.startUserName = 'Unknown user';
    this.showForm = true;
    this.showLogOut = false;
  }

}
