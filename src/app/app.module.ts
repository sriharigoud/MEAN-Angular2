import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

// Imports commented out for brevity
import { RouterModule } from '@angular/router';
import { QuotesService } from './quotes.service';
import { UserService } from './user/user.service';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { LoginComponent } from './user/login.component';
import { RegisterComponent } from './user/register.component';

import { AuthGuard } from './_gaurds/auth.guard';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES) // Add routes to the app
  ],
  providers: [QuotesService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }