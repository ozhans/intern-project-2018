import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the FirmPaymProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirmPaymProvider {
  firmPaym:any;
  link : string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello FirmPaymProvider Provider');
    this.link = 'https://ionicdeneme.localtunnel.me/api/firm-payments';
    this.link2 = 'http://localhost:27017/api/firm-payments';
  }

  getFirmPayments(){
    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(res => {
          this.firmPaym = res;
          resolve(this.firmPaym);
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Hata oluştu',
            buttons:['Ok']
          })
          alert.present();
          resolve(err);
        });
    })
  }

  async getFirmPayment(id){
    var temp:any;
    var result:any;
    await this.getFirmPayments().then(data => {
      console.log(data);
      temp = data;
      result = temp.find(x => x._id === id);
    })
    return result;
  }

  async getFirmPaymentsOfF(id){
    var d: any;
    var list = [];
    await this.getFirmPayments().then((data) => {
      d = data;
    });
    for (let i = 0; i < d.length; i++) {
      if(d[i].f_id == id) list.push(d[i]);      
    }
    return list;
  }

  createFirmPayment(firm){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,firm,{headers : headers})
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
      });
    })
  }

  updatePayment(id,payment){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.put(this.link +'/' +id, payment,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(payment);
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

  deleteFirmPayment(id){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.delete(this.link + '/' + id,{headers:headers}).subscribe(res => {
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
      });
    })
  }

}
