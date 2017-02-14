import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { HttpRequestService } from '../services/http-request.service';

import { Reviev } from '../common-classes/reviev';

@Component({
  selector: 'app-revievs',
  templateUrl: './revievs.component.html',
  styleUrls: ['./revievs.component.scss']
})
export class RevievsComponent implements OnInit, OnDestroy {

  private id: number;
  private query: Subscription;
  error: any;
  revievs: Reviev[];
  commonRating: any;
  counter: number = 0;
  private step: number = 3;
  page: number = 0;
  pagArray: any;

  constructor(private route: ActivatedRoute, private httpService: HttpRequestService) {
    this.query = route.queryParams.subscribe(
        (queryParam: any) => {
          this.id = queryParam['id'];
        })
  }

  ngOnInit() {
    this.getProductRevievs(true)
  }

  getProductRevievs(flag: boolean) {

    flag && this.httpService.getProductReviev(this.id).subscribe(request => {
          let data = request.reverse();
          for (let i = data.length; i--; data[i].rate = Array(data[i].rate)){
            this.counter += data[i].rate
          }
          this.commonRating = Array(Math.round(this.counter/data.length));
          let arr = [];
          while (data.length){
            arr.push(data.splice(0, this.step));
          }
          this.pagArray = arr;
          this.revievs = arr[this.page];
        },
        error => {this.error = error; console.log(error);}
    );
  }

  changePage(page) {
    this.page = page;
    this.revievs = this.pagArray[page];
  }


  ngOnDestroy() {
    this.query.unsubscribe();
  }

  getNewRevievs(event) {
    this.getProductRevievs(event)
  }

}
