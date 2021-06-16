import { Component, Input, OnChanges, OnInit , Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() productSelect: any;
  @Output() massageEvent = new EventEmitter<string>()

  user_id: string;

  constructor(private fr: FavoritesService) {}

  ngOnInit(): void {
    this.user_id = '60c8a18b34edae473c637048'; //fake user
  }

  ngOnChanges() {}

  size = new FormControl();

  addCart() {
    console.log(this.size.value);
  }

  addFavorite() {
    if (this.productSelect.status_favorite == false) {
      console.log(this.productSelect);
      const data = {
        user_id: this.user_id,
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
