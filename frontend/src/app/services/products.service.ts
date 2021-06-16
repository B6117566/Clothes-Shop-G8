import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  products: any;

  constructor(private http: HttpClient) {}

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

  deleteProduct(id: any) {
    return this.http
      .delete<any>('http://localhost:3000/api/products/del/' + id)
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
