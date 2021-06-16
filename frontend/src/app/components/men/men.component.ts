import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

  genderStatus: string
  selectType: string

  constructor() { }

  ngOnInit(): void {
    this.genderStatus = "Men"
  }

  onClickTop(){
    this.selectType = "Tops"
  }

  onClickBottom(){
    this.selectType = "Bottoms"
  }

}
