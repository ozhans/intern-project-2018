import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  date : any;
  link : string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello DateProvider Provider');
    this.date = null;
    this.link = 'https://ionicdeneme.localtunnel.me/api/appointments'
    this.link2 = 'http://localhost:27017/api/appointments'
  }

  getDates(){
    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(date=> {
          this.date = date;
          resolve(this.date);
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

  async getDate(id){
    var d:any;
    var i:any;
    await this.getDates().then((data) => {
      console.log(data);
      console.log(id);
      d = data;
      i = d.find(x => x._id === id);
      console.log(i); 
    });
    return i;
  }

  createDate(date){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,date,{headers: headers})
        .subscribe(res => {
          console.log(res);
          resolve(date);   
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Kayıt oluşturulamadı',
            buttons:['Ok']
          })
          alert.present();
          resolve(err);
        }); 
    });
  }

  updateDate(id,appointment){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.put(this.link +'/' +id, appointment,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(appointment);
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

  deleteDate(id){
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
