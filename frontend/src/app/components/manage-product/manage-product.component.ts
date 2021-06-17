import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ManageCardItemListComponent } from './manage-card-item-list/manage-card-item-list.component';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  @ViewChild(ManageCardItemListComponent)
  managecardItem: ManageCardItemListComponent;

  searchText = new FormControl('');

  constructor(private local: LocalStorageService,private router: Router) {
    if (this.local.get('user').value.usertype_id.name != 'Customer') {
      this.router.navigate(['']);
    }else if(this.local.get('user') == undefined || this.local.get('user') == null){
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    
  }

  search() {
    if (this.searchText.value.length > 0) {
      this.managecardItem.search();
    }
  }
}
