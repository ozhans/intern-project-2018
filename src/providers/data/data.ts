import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  dd : any
  link : string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello DataProvider Provider');
    this.dd = null;
    this.link = 'https://ionicdeneme.localtunnel.me/api/data';
    this.link2 = 'http://localhost:27017/api/data'
  }

  getPersons(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token' : localStorage.getItem("token")
    })

    return new Promise(resolve => {
      this.http.get(this.link,{headers:headers})
        .subscribe(res => {
          this.dd = res;
          resolve(this.dd);
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Kayıt oluşturulamadı',
            buttons:['Ok']
          })
          alert.present();
          resolve([]);
        });
    });
  }

  async getPerson(id){
    var p :any;
    var i :any;
    await this.getPersons().then((data) => {
      console.log(data);
      p = data;
      i = p.find(x => x._id === id);
      console.log(i);
    });
    return i;
  }

  createPerson(person){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,person,{headers: headers})
        .subscribe(res => {
          console.log(res);
          resolve(person);
          console.log("created");
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Kayıt oluşturulamadı',
            buttons:['Ok']
          })
          alert.present();
          resolve();
        });
    })
  }

  updatePerson(id,person){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    console.log(id);
    return new Promise(resolve => {
      console.log("promise")
      this.http.put(this.link +'/' + id,person,{headers: headers})
        .subscribe(res => {
          resolve(person);
          console.log(res);
          console.log("updated");
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Kayıt oluşturulamadı',
            buttons:['Ok']
          })
          alert.present();
          resolve([]);
        })
    }) 
  }

  deletePerson(id){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.delete(this.link+'/' + id,{headers:headers}).subscribe((res) => {
        console.log(res);
        resolve(res);
      })
    })
  }
}
