import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: any;
  genders: any;
  typeproduct: any;

  constructor(private http: HttpClient, public local: LocalStorageService) {}

  getProducts() {
    return this.http.get<any>('http://localhost:3000/api/products/get').pipe(
      map((data) => {
        if (data) {
          this.products = data;
        }
        return this.products;
      })
    );
  }

  findProducts(id: any) {
    return this.http
      .get<any>('http://localhost:3000/api/products/get/id/' + id)
      .pipe(
        map((data) => {
          if (data) {
            this.products = data;
          }
          return this.products;
        })
      );
  }

  searchProducts(search: any) {
    return this.http
      .get<any>('http://localhost:3000/api/products/get/' + search)
      .pipe(
        map((data) => {
          if (data) {
            this.products = data;
          }
          return this.products;
        })
      );
  }

  addProduct(data: any) {
    let token = this.local.get('user').token;
    const body_send = {
      name: data.name,
      detail: data.detail,
      price: Number(data.price),
      file: data.file,
      img: data.img,
      quantity: Number(data.quantity),
      status_favorite: data.status_favorite,
      gender_id: data.gender_id,
      typeproduct_id: data.typeproduct_id,
    };
    return this.http
      .post<any>('http://localhost:3000/api/products/add', body_send, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteProduct(id: any) {
    let token = this.local.get('user').token;
    return this.http
      .delete<any>('http://localhost:3000/api/products/del/' + id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  updateProduct(data: any) {
    var token = this.local.get('user').token;
    const body_send = [
      { id: data.id },
      {
        name: data.name,
        detail: data.detail,
        price: data.price,
        file: data.file,
        img: data.img,
        quantity: data.quantity,
        gender_id: data.gender_id,
        typeproduct_id: data.typeproduct_id,
        status_favorite: false,
      },
    ];
    console.log('body', body_send);
    return this.http
      .put<any>('http://localhost:3000/api/products/put', body_send, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getGenderlist() {
    return this.http.get<any>('http://localhost:3000/api/genders/get').pipe(
      map((data) => {
        if (data) {
          this.genders = data;
        }
        return this.genders;
      })
    );
  }

  getTypeProduct() {
    return this.http
      .get<any>('http://localhost:3000/api/typeproducts/get')
      .pipe(
        map((data) => {
          if (data) {
            this.typeproduct = data;
          }
          return this.typeproduct;
        })
      );
  }
}
