import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit {

  favorites: any
  productSelect: any;

  constructor(private fr: FavoritesService) { }

  ngOnInit(): void {
    this.onLoading()
    this.productSelect = ""
  }

  onLoading(){
    try {
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
    this.productSelect = this.favorites[id].Products;
    console.log(this.productSelect)
  }

}
