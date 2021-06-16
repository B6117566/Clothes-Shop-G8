import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favorites: any;

  constructor(private http: HttpClient, public local: LocalStorageService) {}

  getFavorites() {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    return this.http
      .get<any>('http://localhost:3000/api/favorites/get/id/' + user_id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          if (data) {
            this.favorites = data;
          }
          return this.favorites;
        })
      );
  }

  addFavorite(favorite) {
    let token = this.local.get('user').token;
    return this.http
      .post<any>('http://localhost:3000/api/favorites/add', favorite, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  delFavorite(id?: any) {
    let token = this.local.get('user').token;
    return this.http
      .delete<any>('http://localhost:3000/api/favorites/del/' + id, {
        headers: new HttpHeaders().set('Authorization', token),
      })
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
}
