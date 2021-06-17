import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl , Validators} from '@angular/forms';
import { CarditemComponent } from '../carditem/carditem.component';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  @ViewChild(CarditemComponent) cardItem: CarditemComponent

  searchText = new FormControl('', [Validators.required])

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
    if (this.searchText.value.length > 0) {
      this.cardItem.search()
    }
  }

}
