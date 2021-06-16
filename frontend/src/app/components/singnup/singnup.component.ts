import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrls: ['./singnup.component.css'],
})
export class SingnupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('[^`~!@#$%^&*_;?<>]{8,16}'),
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('\a'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('\a'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('\d{8,12}'),
    ]),
    address: new FormControl('', [Validators.required]),
    postcode_id: new FormControl('', [Validators.required]),
    usertype_id: new FormControl('', [Validators.required]),
  });

  postcode = new FormGroup({
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    subdistrict: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    console.log(this.signupForm.value);
  }
}
