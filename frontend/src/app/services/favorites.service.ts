import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: any;

  constructor(private http: HttpClient) {}

  getFavorites(id?: string) {
    return this.http.get<any>("http://localhost:3000/api/favorites/get/id/" + id).pipe(
      map((data) => {
        if (data) {
          this.favorites = data;
        }
        return this.favorites;
      })
    );
  }

  addFavorite(favorite){
    return this.http.post<any>('http://localhost:3000/api/favorites/add', favorite).pipe(
      map((data) => {
        return data
      })
    )
  }

  delFavorite(id?: any){
    return this.http.delete<any>('http://localhost:3000/api/favorites/del/' + id).pipe(
      map((data) => {
        return data
      })
      
    )
  }
}
