import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
    selector: 'app-login',
    template:
    `<div class="wrapper">
            <div class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</div>
            
            <form class="form-signin" (ngSubmit)="onSubmit(loginForm)" [formGroup]="loginForm" novalidate>       
                <h2 class="form-signin-heading">{{title}}</h2>
                <span
          class="error"
          *ngIf="loginForm.invalid">
          Check all fields
        </span>
                <input type="text" formControlName="email" class="form-control" name="username" placeholder="Email Address" autofocus="" />
                <input type="password" 
                formControlName="password" class="form-control" name="password" placeholder="Password" required=""/>      
                <button [disabled]="loginForm.invalid"class="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
                 <a href="#" routerLink="/register">Need an account? Register</a>
            </form>
           
        </div>`
    ,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup; // <--- heroForm is of type FormGroup
    errorMessage: string;
    title = 'Please login';

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.createForm();
    }

    onSubmit({ value, valid }) {
        this.userService.authenticate(value).subscribe((msg) => {
            this.createForm();
            if (msg.status){
                localStorage.setItem('currentUser', JSON.stringify(msg.user));
                this.router.navigate(['/quotes']);
            }else {
                this.errorMessage = msg.msg;
            }
        }, error => this.errorMessage = <any>error);
    }

    createForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            password: new FormControl('', [Validators.required, Validators.minLength(4)])
        });
    }
}
