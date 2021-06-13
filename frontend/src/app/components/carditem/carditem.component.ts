import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-carditem',
  templateUrl: './carditem.component.html',
  styleUrls: ['./carditem.component.css'],
})
export class CarditemComponent implements OnInit {
  products: any;

  constructor(private ps: ProductsService) {
    this.onLoading();
  }

  s = true;

  ngOnInit(): void {
    this.s = true;
  }

  clickFav() {
    this.s = !this.s;
    console.log(this.s);
    return this.s;
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
}
