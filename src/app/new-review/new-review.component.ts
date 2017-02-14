import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpRequestService } from '../services/http-request.service';



@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit {

  starQuontity: number = 10;
  stars: any = Array(this.starQuontity);
  authorized: boolean;
  @Input() productId: number;
  url: string = '/api/reviews/';
  error: any;
  showError: boolean = false;
  errorMessage: string;
  messages: any = {
    serverError: "Can't send review, try again"
  };
  @Output() revievAdded = new EventEmitter<boolean>();

  constructor(private httpService: HttpRequestService) { }

  ngOnInit() {
     this.authorized = this.httpService.token ? false : true;
    this.httpService.eventEmitt().subscribe(flag => {
      this.authorized = flag;
    })
  }

  sendReviev(form: NgForm) {
    this.httpService.sendUserData(form.value, this.url + this.productId, 'Token ' + this.httpService.token).subscribe(data => {
          this.showError = false;
          this.revievAdded.emit(data.success ? true : false);
          form.reset()
      let labels = document.getElementById('star_wrapper').children;
          for (let i = labels.length; i--; labels[i].classList.remove('choosen')){}

        },
        error => {
          console.log(error)
          this.showError = true;
          this.errorMessage = this.messages.serverError;
        }
    );
  }

}
