import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-carditem',
  templateUrl: './carditem.component.html',
  styleUrls: ['./carditem.component.css'],
})
export class CarditemComponent implements OnInit {
  products: any;
  productSelect: any;
  product_id: any;
  user_id: any;
  favorite: any;
  favorites: any;
  s: any;
  statusCheck: any

  constructor(private ps: ProductsService, private fr: FavoritesService) {
    this.onLoading();
  }

  ngOnInit(): void {
    this.s = false;
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
      this.fr.getFavorites().subscribe(
        (data) => {
          this.favorites = data;
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
    this.product_id = this.products[id];
  }

  addFavorite(id: number) {
    this.product_id = this.products[id]._id;
    this.user_id = '60c609baae3f5fae0699efdc';
    this.favorite = {
      product_id: this.product_id,
      user_id: this.user_id,
    };
    this.fr.addFavorite(this.favorite).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    this.onLoading()
  }

  delFavorite(id: number) {}
}
