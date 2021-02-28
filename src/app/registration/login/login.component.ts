import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm = () => {
    this.loginForm = new FormGroup({
      username: new FormControl('abc'),
      password: new FormControl('333')
    })
  }

  navigateTo = (value: any) => {
    if(value == 'order'){
      this.router.navigateByUrl("/orders/create-order");
    }
  }
  
  submit = () => {
    if(this.loginForm.valid) {
      this.fireAuth.signInWithEmailAndPassword(this.loginForm.get('username').value, this.loginForm.get('password').value).then(res => {
        console.log(res);
      }).catch(res => {
        console.log(res);
      });
    }
  }
}
