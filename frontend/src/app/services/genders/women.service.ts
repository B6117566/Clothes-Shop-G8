import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WomenService {

  product: any

  constructor(private http: HttpClient) {}

  getWomenProduct(gender?: any, user_id?: any) {
    return this.http.get<any>("http://localhost:3000/api/genders/get/all/" + gender + "/" + user_id).pipe(
      map((data) => {
        if (data) {
          this.product = data;
        }
        return this.product;
      })
    );
  }
}
