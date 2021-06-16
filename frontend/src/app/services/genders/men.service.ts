import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenService {

  product: any

  constructor(private http: HttpClient) {}

  getMenProduct(gender?: any, user_id?: any) {
    return this.http.get<any>("http://localhost:3000/api/genders/get/all/" + gender + "/" + user_id).pipe(
      map((data) => {
        if (data) {
          this.product = data;
        }
        return this.product;
      })
    );
  }

  searchMenProduct(gender?: any, searchText?: any, user_id?: any){
    return this.http.get<any>("http://localhost:3000/api/genders/get/" + gender + "/" + searchText + "/" + user_id).pipe(
      map((data) => {
        if(data) {
          this.product = data
          console.log(this.product)
        }
        return this.product
      })
    )
  }

}
