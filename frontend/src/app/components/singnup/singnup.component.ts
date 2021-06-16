import { PostcodeService } from './../../services/postcode.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrls: ['./singnup.component.css'],
})
export class SingnupComponent implements OnInit, AfterContentChecked {
  postcode: any;
  status_postcode: boolean;
  constructor(private pc: PostcodeService) {
    this.status_postcode = false;
  }

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
  });

  postcodeFrom = new FormGroup({
    province: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    subdistrict: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required,
      Validators.pattern('[0-9]{5}')]),
  });

  ngOnInit(): void {}

  ngAfterContentChecked() {
    console.log(this.postcodeFrom.value.zipcode);
    if (
      this.postcodeFrom.value.zipcode.length == 5 &&
      this.status_postcode == false
    ) {
      console.log('Work True');
      this.status_postcode = !this.status_postcode;
      this.getPostcodeByID(this.postcodeFrom.value.zipcode);
    } else if (
      this.postcodeFrom.value.zipcode.length < 5 ||
      this.postcodeFrom.value.zipcode.length > 5
    ) {
      this.status_postcode = false;
      console.log('Work False');
    }
  }

  getPostcodeByID(id: any) {
    try {
      this.pc.getPostcodes(id).subscribe(
        (data) => {
          this.postcode = data;
          console.log('POSTCODE WORK 5 => ', data);
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  signupRegister() {
    //postcode_id: new FormControl('', [Validators.required]),
    //usertype_id: new FormControl('', [Validators.required]),
    console.log(this.signupForm.value);
  }
  get signupFormMethod() {
    return this.signupForm.controls;
  }

  get postcodeFromMethod() {
    return this.postcodeFrom.controls;
  }
}
