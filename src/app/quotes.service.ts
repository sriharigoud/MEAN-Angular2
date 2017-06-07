import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QuotesService {

  constructor(private http: Http) { }

  // Get all quotes from the API
  getAllQuotes() {
    return this.http.get('/api/quotes')
      .map(res => res.json());
  }
}