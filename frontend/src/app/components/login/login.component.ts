import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private signin: UsersService,private router: Router) {}

  ngOnInit(): void {}

  onClick() {
    console.log(this.loginForm.value);
    this.signin.signIn(this.loginForm.value).subscribe(
      (data) => {
        if (data.status == true) {
          this.router.navigate(['']);
        } else {
          alert('Email or Password is incorrect');
        }
      },
      (err) => {
        console.log(err);
        alert('Email or Password is incorrect');
      }
    );
  }

  get loginFromData(){
    return this.loginForm.controls
  }
}
