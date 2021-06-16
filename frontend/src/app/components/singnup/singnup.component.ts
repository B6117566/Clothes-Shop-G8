import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrls: ['./singnup.component.css'],
})
export class SingnupComponent implements OnInit {
  constructor(private signup: UsersService, private router: Router) {}

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('[^`~!@#$%^&*_;?<>]{8,16}'),
    ]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{8,12}'),
    ]),
    address: new FormControl('', [Validators.required]),
    usertype_id: new FormControl(''),
  });

  ngOnInit(): void {
    this.checkUsertype();
  }

  checkUsertype() {
    this.signup.getUsertype('Customer').subscribe(
      (data) => {
        this.signupForm.value.usertype_id = data[0]._id;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  signupRegister() {
    console.log(this.signupForm.value);
    this.signup.signUp(this.signupForm.value).subscribe(
      (data) => {
        if (data.message) {
          this.router.navigate(['/login']);
        } else {
          alert('Cannot Sign up');
        }
      },
      (err) => {
        console.log(err);
        alert('Cannot Sign up');
      }
    );
  }
  get signupFormMethod() {
    return this.signupForm.controls;
  }
}
