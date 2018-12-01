import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  product:any;
  link : string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello ProductProvider Provider');
    this.link = 'https://ionicdeneme.localtunnel.me/api/products';
    this.link2 = 'http://localhost:27017/api/proucts';
  }

  getProducts(){
    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(product => {
          this.product = product;
          resolve(this.product);
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

  async getProduct(id){
    var p :any;
    var i :any;
    await this.getProducts().then((data) => {
      console.log(data);
      p = data;
      i = p.find(x => x._id === id);
      console.log(i);
    });
    return i;
  }


  createProduct(product){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,product,{headers: headers})
        .subscribe(res => {
          console.log(res);
          resolve(product)
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

  updateProduct(id,product){
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

  deleteProduct(id){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.delete(this.link + '/' +id,{headers:headers}).subscribe((res) => {
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
