import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getUserData() {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    return this.http.get<any>(
      'http://localhost:3000/api/users/get/id/' + user_id,
      {
        headers: new HttpHeaders().set('Authorization', token),
      }
    );
  }

  updateUserData(data: any) {
    let token = this.local.get('user').token;
    let user_id = this.local.get('user').result.id;
    let body_send = ([
      { id: user_id },
      {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        address: data.address,
      },
    ]);
    return this.http.put<any>(
      'http://localhost:3000/api/users/put',
      body_send,
      {
        headers: new HttpHeaders().set('Authorization', token),
      }
    );
  }

  signUp(signupData: any) {
    return this.http.post<any>(
      'http://localhost:3000/api/users/signup',
      signupData
    );
  }

  getUsertype(data: string) {
    return this.http
      .get<any>('http://localhost:3000/api/usertypes/get/' + data)
      .pipe(
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
