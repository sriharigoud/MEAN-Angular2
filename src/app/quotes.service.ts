import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Quote } from './quotes/quote';

@Injectable()
export class QuotesService {

  constructor(private http: Http) { }

  // Get all quotes from the API
  getAllQuotes() {
    return this.http.get('/api/quotes')
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  addQuote(quote: Quote) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/addQuote', quote, options)
      .map(res => res.json())
      .catch(this.handleErrorObservable);
  }

  private handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
  }
}
