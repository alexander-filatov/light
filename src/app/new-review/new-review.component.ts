import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpRequestService } from '../services/http-request.service';



@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss']
})
export class NewReviewComponent implements OnInit {

  stars: any = Array(10);
  authorized: boolean;
  @Input() productId: number;
  url: string = '/api/reviews/';
  error: any;

  constructor(private httpService: HttpRequestService) { }

  ngOnInit() {
     this.authorized = this.httpService.token ? false : true;
    this.httpService.eventEmitt().subscribe(flag => {
      this.authorized = flag;
    })
  }

  sendReviev(form: NgForm) {
    // console.log(this.url + this.productId)
    console.log(form)
    this.httpService.sendUserData(form.value, this.url + this.productId, 'Token ' + this.httpService.token).subscribe(data => {
          // if user is exist should get a 400 series mistake

        },
        error => {
          console.log(error)
        }
    );
  }

}
