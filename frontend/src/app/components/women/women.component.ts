import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CarditemComponent } from '../carditem/carditem.component';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  @ViewChild(CarditemComponent) cardItem: CarditemComponent

  searchText = new FormControl('')

  genderStatus: string
  selectType: string
  
  constructor() { }

  ngOnInit(): void {
    this.genderStatus = "Women"
  }

  onClickTop(){
    this.selectType = "Tops"
  }

  onClickBottom(){
    this.selectType = "Bottoms"
  }

  search(){
    this.cardItem.search()
  }

}
