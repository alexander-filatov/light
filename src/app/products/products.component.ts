import { Component, OnInit } from '@angular/core';
import { Response} from '@angular/http';
import { HttpRequestService } from '../services/http-request.service';
import { Router } from '@angular/router';

import { Product } from '../common-classes/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  error: any;
  constructor(private httpService: HttpRequestService) { }

  ngOnInit() {
    this.httpService.getAllProducts().subscribe(data => {
      this.products = data},
        error => {this.error = error; console.log(error);}
    );




  }

}
