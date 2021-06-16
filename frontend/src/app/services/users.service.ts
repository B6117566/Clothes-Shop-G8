import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  usertype_id: any;

  constructor(private http: HttpClient, public local: LocalStorageService) {}

  signIn(authData: any) {
    return this.http
      .post<any>('http://localhost:3000/api/users/signin', authData)
      .pipe(
        map((data) => {
          if (data) {
            this.local.set('user', data, 1, 'w');
            console.log(this.local.get('user'));
          }
          return data;
        })
      );
  }

  signUp(signupData: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/signup',
      signupData
    );
  }

  getUsertype(data: string) {
    return this.http.get<any>('http://localhost:3000/api/usertypes/get/' + data).pipe(
      map((data) => {
        if (data) {
          this.usertype_id = data;
          console.log(this.usertype_id);
        }
        return this.usertype_id;
      })
    );
  }
}
