import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { HttpRequestService } from '../services/http-request.service';

import { Product } from '../common-classes/product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  error: any;
  private id: number;
  private subscription: Subscription;
  currentProduct: Product;
  showReviews: boolean;

  constructor(private activeRout: ActivatedRoute, private httpService: HttpRequestService) {

    this.subscription = activeRout.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.currentProduct = {
      id: '',
      img: '',
    text: '',
    title: ''
    };
    this.httpService.getAllProducts().subscribe(data => {
          data && this.getCurrentProduct(data);
    },
        error => {this.error = error; console.log(error);}
    );
    this.showReviews = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCurrentProduct(data: Product[]): void {
    this.currentProduct = data[this.id]
  }

  toggleShowReviews(flag) {
    this.showReviews = flag;
  }


}
