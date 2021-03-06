import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WomenService {
  product: any;

  constructor(private http: HttpClient, public local: LocalStorageService) {}

  getWomenProduct(gender?: any) {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    return this.http
      .get<any>(
        'http://localhost:3000/api/genders/get/all/' + gender + '/' + user_id,
        {
          headers: new HttpHeaders().set('Authorization', token),
        }
      )
      .pipe(
        map((data) => {
          if (data) {
            this.product = data;
          }
          return this.product;
        })
      );
  }
  searchWomenProduct(gender?: any, searchText?: any) {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    return this.http
      .get<any>(
        'http://localhost:3000/api/genders/get/' +
          gender +
          '/' +
          searchText +
          '/' +
          user_id,
        {
          headers: new HttpHeaders().set('Authorization', token),
        }
      )
      .pipe(
        map((data) => {
          if (data) {
            this.product = data;
          }
          return this.product;
        })
      );
  }

  //-----------------------------------------------------------------
  //when no login

  getWomenProductNoLogin(gender?: any) {
    return this.http
      .get<any>('http://localhost:3000/api/genders/get/all/' + gender)
      .pipe(
        map((data) => {
          if (data) {
            this.product = data;
          }
          return this.product;
        })
      );
  }
  searchWomenProductNoLogin(gender?: any, searchText?: any) {
    return this.http
      .get<any>(
        'http://localhost:3000/api/genders/get/' + gender + '/' + searchText)
      .pipe(
        map((data) => {
          if (data) {
            this.product = data;
          }
          return this.product;
        })
      );
  }
}
