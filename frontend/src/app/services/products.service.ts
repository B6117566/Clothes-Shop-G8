import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: any;

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
    return this.http
      .post<any>('http://localhost:3000/api/products/add', data, {
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
    const body_send = JSON.stringify([
      { id: data.id },
      {
        name: data.name,
        detail: data.detail,
        price: data.price,
        file: data.file,
        img: data.img,
        datetime: data.datetime,
        gender_id: data.gender_id,
        typeproduct_id: data.typeproduct_id,
        quantity: data.quantity,
        status_favorite: false,
      },
    ]);
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
}
