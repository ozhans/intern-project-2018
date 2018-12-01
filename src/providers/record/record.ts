import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the RecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecordProvider {

  record:any;

  link : string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello RecordProvider Provider');
    this.record = null;
    this.link = 'https://ionicdeneme.localtunnel.me/api/records';
    this.link2 = 'http://localhost:27017/api/records';
  }

  getRecords(){
    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(record => {
          this.record = record;
          resolve(this.record);
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Hata oluştu',
            buttons:['Ok']
          })
          alert.present();
          resolve(err);
        });
    });
  }

  async getRecord(id){
    var d:any;
    var i:any;
    await this.getRecords().then((data) => {
      d = data;
      i = d.find(x => x._id === id);
    });
    return i;
  }

  async getRecordsOfH(id){
    var d:any;
    var list = [];
    await this.getRecords().then((data) => {
      d = data;
    });
    for (let j = 0; j < d.length; j++) {
      if(d[j].h_id == id) list.push(d[j]);
    }
    return list;
  }

  createRecord(record){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,record,{headers: headers})
      .subscribe(res => {
        console.log(res);
        resolve(record);
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Kayıt oluşturulamadı',
          buttons:['Ok']
        })
        alert.present();
        resolve(err);
      })
    })
    
  }

  updateRecord(id,record){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.put(this.link +'/' +id, record,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(record);
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Kayıt oluşturulamadı',
            buttons:['Ok']
          })
          alert.present();
          resolve(err);
        })
    })
  }

  deleteRecord(id){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.delete(this.link + '/' + id,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(res);
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Kayıt silinemedi',
            buttons:['Ok']
          })
          alert.present();
          resolve(err);
        })
    })
  }

}
