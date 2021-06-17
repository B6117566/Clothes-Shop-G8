import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl , Validators} from '@angular/forms';
import { ManageCardItemListComponent } from './manage-card-item-list/manage-card-item-list.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  @ViewChild(ManageCardItemListComponent) managecardItem: ManageCardItemListComponent

  searchText = new FormControl('')

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    if (this.searchText.value.length > 0) {
      this.managecardItem.search()
    }
  }

}
