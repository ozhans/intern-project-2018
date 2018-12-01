import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the FirmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirmProvider {
  firm: any;
  link: string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello FirmProvider Provider');
    this.link = 'https://ionicdeneme.localtunnel.me/api/firms';
    this.link2 = 'http://localhost:27017/api/firms';
  }

  getFirms(){
    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(firm => {
          this.firm = firm;
          resolve(this.firm);
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

  async getFirm(id){
    var temp:any;
    var result:any;
    await this.getFirms().then(data => {
      console.log(data);
      temp = data;
      
      result = temp.find(x => x._id === id);
    })
    return result;
  }

  createFirm(firm){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,firm,{headers : headers})
      .subscribe(res => {
        console.log(res);
        resolve(firm)
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Kayıt oluşturulamadı',
          buttons:['Ok']
        })
        alert.present();
        resolve(err);
      });
    })
    
  }

  updateFirm(id,firm){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.put(this.link +'/' +id, firm,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(firm);
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

  deleteFirm(id){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.delete(this.link + '/' + id,{headers:headers}).subscribe(res => {
        console.log(res);
        resolve(id);
      },
      err => {
        let alert = this.alertCtrl.create({
          title: 'Kayıt silinemedi',
          buttons:['Ok']
        })
        alert.present();
        resolve(err);
      });
    })
  }
}
