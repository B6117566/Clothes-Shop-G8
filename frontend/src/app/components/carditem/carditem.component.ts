import {
  Component,
  OnInit,
  Input,
  OnChanges,
  DoCheck,
  AfterContentChecked,
  AfterContentInit,
} from '@angular/core';

import { ProductsService } from 'src/app/services/products.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MenService } from 'src/app/services/genders/men.service';
import { WomenService } from 'src/app/services/genders/women.service';

@Component({
  selector: 'app-carditem',
  templateUrl: './carditem.component.html',
  styleUrls: ['./carditem.component.css'],
})
export class CarditemComponent implements OnInit, AfterContentChecked{

  @Input() genderStatus: string;
  @Input() selectType: string;

  user_id: string
  product_id: number
  products: any;
  productSelect: any;
  productLoad: any;
  favorites: any

  heart: any;

  constructor(
    private fr: FavoritesService,
    private men: MenService,
    private women: WomenService
  ) {}

  ngOnInit(): void {
    this.product_id = undefined
    this.productSelect = '';
    this.user_id = "60c8a18b34edae473c637048" //fake user
    this.onLoading();
  }

  ngAfterContentChecked() {
    if (this.selectType != undefined) {
      this.products = this.productLoad.filter((data) => {
        if (data.typeproduct_id.name === this.selectType) {
          return data;
        }
      });
    }
  }

  onLoading() {
    try {
      if (this.genderStatus == 'Men') {
        this.men.getMenProduct(this.genderStatus, this.user_id).subscribe(
          (data) => {
            this.productLoad = data;
            this.products = data;
          },
          (err) => {
            console.log(err);
          }
        );
      } else if (this.genderStatus == 'Women') {
        this.women.getWomenProduct(this.genderStatus, this.user_id).subscribe(
          (data) => {
            this.productLoad = data;
            this.products = data;
          },
          (err) => {
            console.log(err);
          }
        );
      }
      this.fr.getFavorites(this.user_id).subscribe(
        (data) => {
          this.favorites = data
        }, (err) => {
          console.log(err)
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  receiveData(id) {
    this.products.map(data => {
      if(data._id === id){
        data.status_favorite = true
      }
    })
  }

  selectProduct(id: number) {
    this.productSelect = this.products[id];
    this.product_id = id
  }

  delFavorite(id: number) {}
}
