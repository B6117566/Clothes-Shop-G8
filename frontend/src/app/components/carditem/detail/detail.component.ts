import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  
  @Input() productSelect: any;
  
  constructor() {}

  ngOnInit(): void {}

  size = new FormControl();

  addCart() {
    console.log(this.size.value);
  }
}