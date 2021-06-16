import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostcodeService {
  postcode: any;

  constructor(private http: HttpClient) {}

  getPostcodes(id: any) {
    return this.http
      .get<any>('http://localhost:3000/api/postcodes/get/' + id)
      .pipe(
        map((data) => {
          if (data) {
            this.postcode = data;
            console.log(this.postcode);
          }
          return this.postcode;
        })
      );
  }
}
