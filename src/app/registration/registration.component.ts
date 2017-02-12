import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Response} from '@angular/http';
import { HttpRequestService } from '../services/http-request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regLogin: string = '';
  regPassword: string = '';
  error: any;
  showNotify: boolean = false;
  messages: any = {
    exist: 'The user is already exist',
    success: 'Registration complite',
    error: 'Something wrong, try again'
  };
  message: string;
  allOk: boolean;
  url: string = '/api/register/';

  constructor(private httpService: HttpRequestService, private router: Router) { }

  ngOnInit() {

  }
  submitForm(form: NgForm): void {
    this.httpService.sendUserData(form.value, this.url).subscribe(data => {
      console.log(data)
      // if user is exist should get a 400 series mistake
          this.showNotify = true;
          if (!data.success){
            this.message = this.messages.exist;
            this.allOk = false
          } else {
            this.message = this.messages.success;
            this.allOk = true;
            let timeout = setTimeout(() => {
              this.router.navigate(['products']);
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

  hideMistake(): void {
    this.showNotify = false;
  }
}
