import { ManageCardItemEditComponent } from './manage-card-item-edit/manage-card-item-edit.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-card-item-list',
  templateUrl: './manage-card-item-list.component.html',
  styleUrls: ['./manage-card-item-list.component.css'],
})
export class ManageCardItemListComponent implements OnInit {
  @Input() searchText: any;
  @ViewChild(ManageCardItemEditComponent) mcie: ManageCardItemEditComponent;

  products: any;
  productShow: any;
  idProductSelect: any;
  productSelect: any;

  constructor(private ps: ProductsService) {}

  ngOnInit(): void {
    this.onLoading();
    this.productShow = '';
    this.idProductSelect = '';
    this.productSelect = '';
  }

  onLoading() {
    try {
      this.ps.getProducts().subscribe(
        (data) => {
          this.products = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  showProduct(id: number) {
    this.productShow = this.products[id];
  }

  selectProduct(id: number) {
    this.productSelect = this.products[id];
    this.mcie.onChange(this.products[id]);
  }

  deletSelectProduct(id: number) {
    this.idProductSelect = this.products[id]._id;
  }

  search() {
    if (this.searchText.value != '') {
      this.ps.searchProducts(this.searchText.value).subscribe(
        (data) => {
          this.products = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.onLoading();
    }
  }
}
