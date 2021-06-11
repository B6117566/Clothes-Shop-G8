import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carditem',
  templateUrl: './carditem.component.html',
  styleUrls: ['./carditem.component.css']
})
export class CarditemComponent implements OnInit {

  s = true;

  constructor() { }

  ngOnInit(): void {
    this.s = true;
  }

  clickFav(){
    this.s = !this.s
    console.log(this.s)
    return this.s
  }

}
