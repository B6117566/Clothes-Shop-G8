import { Component, Input, OnChanges, OnInit , Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavoritesService } from 'src/app/services/favorites.service';
import { LocalStorageService } from 'angular-web-storage';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() productSelect: any;
  @Output() massageEvent = new EventEmitter<string>()

  amout = new FormControl(1,[Validators.required, Validators.min(1)])

  constructor(private fr: FavoritesService, public local: LocalStorageService, private cart: CartsService) {}

  ngOnInit(): void {
  }

  ngOnChanges() {}

  addCart() {
    console.log(this.amout.value);
    this.cart.addCart(this.productSelect._id, this.amout.value).subscribe(
      (data) => {
        alert(data.message)
      }, (err) => {
        alert("Cannot add product cart")
      }
    )
  }

  addFavorite() {
    if (this.productSelect.status_favorite == false) {
      console.log(this.productSelect);
      const data = {
        user_id: this.local.get('user').result.id,
        product_id: this.productSelect._id,
      };
      this.fr.addFavorite(data).subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
      this.massageEvent.emit(this.productSelect._id)
    }
  }
}
