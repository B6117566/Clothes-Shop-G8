import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-manage-card-item-list',
  templateUrl: './manage-card-item-list.component.html',
  styleUrls: ['./manage-card-item-list.component.css'],
})
export class ManageCardItemListComponent implements OnInit {
  products: any;
  productSelect: any;

  constructor(private ps: ProductsService) {
    this.onLoading();
  }

  ngOnInit(): void {
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

  selectProduct(id: number) {
    this.productSelect = this.products[id];
  }
}
