import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  carts: any;

  constructor(private http: HttpClient, public local: LocalStorageService) {}

  addCart(product_id?: any, amout?: any) {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    let body_send = {
      quantity: amout,
      user_id: user_id,
      product_id: product_id,
    };
    return this.http
      .post<any>('http://localhost:3000/api/carts/add', body_send, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getCart() {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    return this.http
      .get<any>('http://localhost:3000/api/carts/get/id/' + user_id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            this.carts = data;
          }
          return this.carts;
        })
      );
  }

  delCart(product_id?: any) {
    let token = this.local.get('user').token;
    return this.http
      .delete<any>('http://localhost:3000/api/carts/del/' + product_id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
