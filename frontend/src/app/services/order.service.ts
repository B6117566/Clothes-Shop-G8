import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, public local: LocalStorageService) {}

  addOder(oder) {
    let token = this.local.get('user').token;
    return this.http
      .post<any>('http://localhost:3000/api/orderhistorys/add', oder, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getOrder() {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    return this.http
      .get<any>('http://localhost:3000/api/orderhistorys/get/id/' + user_id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            return data
          }
        })
      );
  }




}
