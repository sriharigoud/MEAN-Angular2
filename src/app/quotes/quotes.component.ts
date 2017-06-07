import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  // instantiate quotes to an empty array
  quotes: any = [];

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    // Retrieve quotes from the API
    this.quotesService.getAllQuotes().subscribe(quotes => {
      this.quotes = quotes;
    });
  }
}