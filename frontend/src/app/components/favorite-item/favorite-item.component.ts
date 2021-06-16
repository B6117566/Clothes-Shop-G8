import { AfterContentChecked, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements OnInit, AfterContentChecked {

  user_id: string 
  favorites: any
  productSelect: any;
  favorite_id: Number
  
  constructor(private fr: FavoritesService) { }

  ngOnInit(): void {
    this.user_id = "60c8a18b34edae473c637048" //fake user
    this.onLoading()
    this.productSelect = ""
  }

  onLoading(){
    this.fr.getFavorites(this.user_id).subscribe(
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
