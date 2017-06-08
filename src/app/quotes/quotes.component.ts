import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { QuotesService } from '../quotes.service';
import { Quote } from './quote';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quoteForm: FormGroup; // <--- heroForm is of type FormGroup
  errorMessage: string;
  // instantiate quotes to an empty array
  quotes: Array<Quote> = [];

  constructor(private quotesService: QuotesService, private fb: FormBuilder) {
  }

  onSubmit({ value, valid }: { value: Quote, valid: boolean }) {
    this.quotesService.addQuote(value).subscribe((msg) => {
      this.getQuotes();
      this.createForm();
    },  error => this.errorMessage = <any>error);
  }

  ngOnInit() {
    this.createForm();
    this.getQuotes();
  }

  createForm(){
    this.quoteForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      quote: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  getQuotes(){
    // Retrieve quotes from the API
    this.quotesService.getAllQuotes().subscribe((quotes: Array<Quote>) => {
      this.quotes = quotes;
    },  error => this.errorMessage = <any>error);
  }
}
