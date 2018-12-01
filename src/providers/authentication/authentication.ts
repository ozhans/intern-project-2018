import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {
  currentUser:any;
  users:any;
  link : string;
  link2 : string;
  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationProvider Provider');
    this.link = 'https://ionicdeneme.localtunnel.me/api/auth/';
    this.link2 = 'http://localhost:27017/api/auth/'
  }

  login(info){
    return new Promise((resolve,reject) => {
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      this.http.post(this.link + 'login' ,info,{headers:headers})
        .subscribe(res => {
          this.currentUser = res;
          resolve(res);
        },
        err => {
          reject(err);
        })
    })
  }
  
  register(info){
    let headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return new Promise((resolve,reject) => {
      this.http.post(this.link + 'register',info, {headers:headers})
        .subscribe(res => {
          resolve(res);
        },
        err => {
          reject(err);
        })
    })
  }

  getUser(){
    let temp = this.currentUser;
    
    let headers = new HttpHeaders({
      'x-access-token':temp.token
    });
    return new Promise(resolve => {
      this.http.get(this.link + 'me',{headers:headers}).subscribe(res => {
        var temp:any;
        temp = res;
        console.log(res);
        resolve(temp.name);
      })
    })
  }
  
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
