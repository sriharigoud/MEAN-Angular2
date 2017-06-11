import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
  selector: 'app-register',
  template:
  `<div class="wrapper">
            <div class="alert alert-danger" *ngIf="errorMessage">{{errorMessage}}</div>
            
            <form class="form-signin" (ngSubmit)="onSubmit(registerForm)" [formGroup]="registerForm" novalidate>       
                <h2 class="form-signin-heading">{{title}}</h2>
                 <span
          class="error"
          *ngIf="registerForm.invalid">
          Check all fields
        </span>
                <input type="text" formControlName="first_name" 
                class="form-control" name="first_name" placeholder="First name" autofocus="" />
                <input type="text" formControlName="last_name" 
                class="form-control" name="last_name" placeholder="Last name" />
                <div >
    <label class="md-check">
      <input type="radio" value="female" name="gender" formControlName="gender">
      Female
    </label>

    <label class="md-check">
      <input type="radio" value="male" name="gender" formControlName="gender">     
      Male
    </label>
  </div>
                <input type="text" formControlName="email" class="form-control" name="username" placeholder="Email Address" />
                <input type="password" 
                formControlName="password" class="form-control" name="password" placeholder="Password" required=""/>      
                <button [disabled]="registerForm.invalid"class="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
                <a href="#" routerLink="/login">Already own an account? Login</a>
            </form>
            
        </div>`
  ,
  styleUrls: ['./login.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup; // <--- heroForm is of type FormGroup
  errorMessage: string;
  title = 'Please Register';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit({ value, valid }) {
    this.userService.register(value).subscribe((msg) => {
      this.createForm();
      if (msg.status) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = msg.msg;
      }
    }, error => this.errorMessage = <any>error);
  }

  createForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
   // ,Validators.pattern("/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i")
      ]),
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }
}
