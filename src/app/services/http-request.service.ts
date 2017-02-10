import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Product } from '../common-classes/product';
import { Reviev } from '../common-classes/reviev';
import { regResponse } from '../common-classes/auth-response';

interface RegisterInt {
    username: string;
    password: string;
}

@Injectable()
export class HttpRequestService {

  common: string = 'http://smktesting.herokuapp.com';

  addText: string = 'Lorem ipsum dolor sit amet, ' +
      'consectetur adipisicing elit. Amet aspernatur' +
      ' consectetur deleniti deserunt distinctio dolor' +
      ' error, est, ex exercitationem fugiat impedit in' +
      ' ipsum labore nihil perspiciatis quibusdam quo ' +
      'temporibus voluptatem. Aliquam assumenda cumque,' +
      ' dolor doloribus ducimus ea eum hic non pariatur ' +
      'quibusdam repellendus sed similique, sint ullam ' +
      'velit vitae voluptates! Laudantium ';

  productsChache: any;

  token: string;

  constructor(private http: Http) { }

  getAllProducts (): Observable<Product[]> {

    return !this.productsChache ? this.http.get(this.common + '/api/products/').map((resp: Response) => {
      let prodArray = resp.json();
      for (let i = prodArray.length; i--; prodArray[i].img = this.common + '/static/' + prodArray[i].img){
        prodArray[i].text = prodArray[i].text + this.addText
      }
      this.productsChache = prodArray;
      return prodArray
    }).catch((error: any)=> { return Observable.throw(error);}) : Observable.of(this.productsChache)
  }

  getProductReviev (id: number): Observable<Reviev[]> {

    return this.http.get(this.common + '/api/reviews/' + id).map((resp: Response) => {
      return resp.json()
    }).catch((error: any)=> { return Observable.throw(error);});
  }

  sendUserData (obj: RegisterInt, url: string): Observable<regResponse> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let body = JSON.stringify(obj);
        console.log(obj)
    return this.http.post(this.common + url, body, { headers: headers }).map((resp: Response) => {
      return resp.json()
    }).catch((error: any)=> { return Observable.throw(error);});
  }

  saveToken (token: string): void{
      this.token = token;
  }

  clearToken (): void {
      this.token = null;
  }

}
