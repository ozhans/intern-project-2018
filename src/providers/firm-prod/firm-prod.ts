import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';
 
/*
  Generated class for the FirmProdProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirmProdProvider {
  firmProd:any;
  link : string;
  link2 :string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello FirmProdProvider Provider');
    this.link = 'https://ionicdeneme.localtunnel.me/api/firm-products';
    this.link2 = 'http://localhost:27017/api/firm-products';
  }

  getFirmProducts(){
    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(res => {
          this.firmProd = res;
          resolve(this.firmProd);
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

  async getFirmProduct(id){
    var temp:any;
    var result:any;
    await this.getFirmProducts().then(data => {
      console.log(data);
      temp = data;
      result = temp.find(x => x._id === id);
    })
    return result;
  }

  async getFirmProductsOfF(id){
    var d:any;
    var list =[];
    await this.getFirmProducts().then((data) => {
      d = data;
    });
    for (let i = 0; i < d.length; i++) {
      if(d[i].f_id == id) list.push(d[i]);      
    }
    return list;
  }

  createFirmProduct(firm){
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

  updateFirmProduct(id,product){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.put(this.link +'/' +id, product,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(product);
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

  deleteFirmProduct(id){
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
