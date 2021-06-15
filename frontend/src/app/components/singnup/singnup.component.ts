import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrls: ['./singnup.component.css']
})
export class SingnupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    phone: new  FormControl(''),
    addressForm : new FormGroup({
      address: new FormControl(''),
      province: new FormControl(''),
      district: new FormControl(''),
      subdistrict: new FormControl(''),
      zipcode: new FormControl(''),
    }),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log(this.signupForm.value)
  }

}
