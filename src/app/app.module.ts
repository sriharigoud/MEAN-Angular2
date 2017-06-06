import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports commented out for brevity
import { RouterModule } from '@angular/router';
import { QuotesService } from './quotes.service';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'quotes',
    pathMatch: 'full'
  },
  {
    path: 'quotes',
    component: QuotesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [QuotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }