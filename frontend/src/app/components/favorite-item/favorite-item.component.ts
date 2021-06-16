import { AfterContentChecked, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit, AfterContentChecked {

  favorites: any
  productSelect: any;
  favorite_id: Number
  
  constructor(private fr: FavoritesService) { }

  ngOnInit(): void {
    this.onLoading()
    this.productSelect = ""
  }

  onLoading(){
    this.fr.getFavorites().subscribe(
      (data) => {
        this.favorites = data
      },
      (err) => {
        console.log(err)
      }
    )
  }

  ngAfterContentChecked(){
    if(this.favorite_id !== undefined){
      this.fr.delFavorite(this.favorite_id).subscribe(
        (data) => {
          this.onLoading()
        }, (err) => {
          console.log(err)
        }
      )
      this.favorite_id = undefined
    }
  }

  deleteFavorite(id: number){
    this.favorite_id = this.favorites[id]._id
    //this.ngAfterContentChecked()
  }

  selectProduct(id: number) {
    this.productSelect = this.favorites[id].product_id;
  }

}
