import {
  Component,
  OnInit,
  Input,
  OnChanges,
  DoCheck,
  AfterContentChecked,
  AfterContentInit,
} from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MenService } from 'src/app/services/genders/men.service';
import { WomenService } from 'src/app/services/genders/women.service';

@Component({
  selector: 'app-carditem',
  templateUrl: './carditem.component.html',
  styleUrls: ['./carditem.component.css'],
})
export class CarditemComponent implements OnInit, AfterContentChecked {
  @Input() genderStatus: string;
  @Input() selectType: string;
  @Input() searchText: any;

  product_id: number;
  products: any;
  productSelect: any;
  productLoad: any;
  favorites: any;

  heart: any;

  check_token: boolean = false;

  constructor(
    private fr: FavoritesService,
    private men: MenService,
    private women: WomenService,
    private local: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.product_id = undefined;
    this.productSelect = '';
    if (this.local.get('user') != undefined || this.local.get('user') != null) {
      this.check_token = true;
    }
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
      if (this.check_token == true) {
        if (this.genderStatus == 'Men') {
          this.men.getMenProduct(this.genderStatus).subscribe(
            (data) => {
              this.productLoad = data;
              this.products = data;
            },
            (err) => {
              console.log(err);
            }
          );
        } else if (this.genderStatus == 'Women') {
          this.women.getWomenProduct(this.genderStatus).subscribe(
            (data) => {
              this.productLoad = data;
              this.products = data;
            },
            (err) => {
              console.log(err);
            }
          );
        }
        this.fr.getFavorites().subscribe(
          (data) => {
            this.favorites = data;
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        if (this.genderStatus == 'Men') {
          this.men.getMenProductNoLogin(this.genderStatus).subscribe(
            (data) => {
              this.productLoad = data;
              this.products = data;
            },
            (err) => {
              console.log(err);
            }
          );
        } else if (this.genderStatus == 'Women') {
          this.women.getWomenProductNoLogin(this.genderStatus).subscribe(
            (data) => {
              this.productLoad = data;
              this.products = data;
            },
            (err) => {
              console.log(err);
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  receiveData(id) {
    if (this.check_token == true) {
      this.products.map((data) => {
        if (data._id === id) {
          data.status_favorite = true;
        }
      });
    }
  }

  selectProduct(id: number) {
    this.productSelect = this.products[id];
    this.product_id = id;
  }

  search() {
    if (this.check_token == true) {
      if (this.searchText.value != '') {
        this.men
          .searchMenProduct(this.genderStatus, this.searchText.value)
          .subscribe(
            (data) => {
              this.productLoad = data;
              this.products = data;
            },
            (err) => {
              console.log(err);
              alert('Cannot Find Product you want');
            }
          );
      } else {
        this.onLoading();
      }
    } else {
      if (this.searchText.value != '') {
        this.men
          .searchMenProductNoLogin(this.genderStatus, this.searchText.value)
          .subscribe(
            (data) => {
              this.productLoad = data;
              this.products = data;
            },
            (err) => {
              console.log(err);
              alert('Cannot Find Product you want');
            }
          );
      } else {
        this.onLoading();
      }
    }
  }
}
