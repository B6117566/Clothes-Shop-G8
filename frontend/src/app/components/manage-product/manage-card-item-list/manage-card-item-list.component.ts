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
  idProductSelect: any;

  constructor(private ps: ProductsService) {
    this.onLoading();
  }

  ngOnInit(): void {
    this.productSelect = '';
    this.idProductSelect = '';

    const date1 = new Date('2563-01-01T00:00:00.000+00:00');
    const date2 = new Date('2563-01-01T01:00:00.000+00:00');
    console.log(date1,date2)
    console.log(getDifferenceInMonth(date1, date2));
    console.log(getDifferenceInDays(date1, date2));
    console.log(getDifferenceInHours(date1, date2));
    console.log(getDifferenceInMinutes(date1, date2));
    console.log(getDifferenceInSeconds(date1, date2));

    function getDifferenceInMonth(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.floor(diffInMs / (1000 * 60 * 60 * 24 *30));
    }

    function getDifferenceInDays(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    }

    function getDifferenceInHours(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.floor(diffInMs / (1000 * 60 * 60));
    }

    function getDifferenceInMinutes(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.floor(diffInMs / (1000 * 60));
    }

    function getDifferenceInSeconds(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return Math.floor(diffInMs / 1000);
    }
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

  deletSelectProduct(id: number) {
    this.idProductSelect = this.products[id]._id;
  }
}
