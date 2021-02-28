import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.signupForm= new FormGroup({
      fistName: new FormControl(''),
      lastName:  new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  submit = () =>{
    console.log(this.signupForm.value)
    if(this.signupForm.valid) {
      this.fireAuth.createUserWithEmailAndPassword(this.signupForm.get('email').value, this.signupForm.get('password').value);
    }
  }

}
