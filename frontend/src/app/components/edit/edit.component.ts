import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  usertype_id: any;

  constructor(
    private signup: UsersService,
    private router: Router,
    private local: LocalStorageService
  ) {}

  signupForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{8,12}'),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.onLoading();
  }

  onLoading() {
    if (this.local.get('user') == undefined || this.local.get('user') == null) {
      this.router.navigate(['/login']);
    }
    this.signup.getUserData().subscribe(
      (data) => {
        this.signupForm.setValue({
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          address: data.address,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update() {
    this.signup.updateUserData(this.signupForm.value).subscribe(
      (data) => {
        if (data.message) {
          alert(data.message);
          this.router.navigate(['/']);
        } else {
          alert('Cannot Update Profile');
        }
      },
      (err) => {
        console.log(err);
        alert('Cannot Update Profile');
      }
    );
  }
  get signupFormMethod() {
    return this.signupForm.controls;
  }
}
