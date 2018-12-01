import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the DoctorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DoctorProvider {

  doctor: any;
  link : string;
  link2 : string;
  constructor(public http: HttpClient, public alertCtrl:AlertController) {
    console.log('Hello DoctorProvider Provider');
    this.link = 'https://ionicdeneme.localtunnel.me/api/doctors'
    this.link2 = 'http://localhost:27017/api/doctors'
  }

  getDoctors(){

    return new Promise(resolve => {
      this.http.get(this.link)
        .subscribe(doctor => {
          this.doctor = doctor;
          resolve(this.doctor);
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

  async getDoctor(id){
    var p :any;
    var i :any;
    await this.getDoctors().then((data) => {
      console.log(data);
      p = data;
      i = p.find(x => x._id === id);
      console.log(i);
    });
    return i;
  }

  createDoctor(doctor){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.post(this.link,doctor,{headers: headers})
      .subscribe(res => {
        console.log(res);
        resolve(doctor);
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

  updateDoctor(id,doctor){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.put(this.link +'/' + id, doctor,{headers:headers})
        .subscribe(res => {
          console.log(res);
          resolve(doctor);
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

  deleteDoctor(id){
    let headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'x-access-token' : localStorage.getItem("token")
    });
    return new Promise(resolve => {
      this.http.delete(this.link + '/' + id,{headers:headers}).subscribe((res) => {
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
