import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: any;

  constructor(private http: HttpClient) {}

  getFavorites() {
    return this.http.get<any>('http://localhost:3000/api/favorites/get').pipe(
      map((data) => {
        if (data) {
          this.favorites = data;
          console.log(this.favorites)
        }
        return this.favorites;
      })
    );
  }
}
