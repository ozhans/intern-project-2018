import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SecondPage } from '../second/second';
import { AppointmentPage } from '../appointment/appointment';
import { DoctorsPage } from '../doctors/doctors';
import { ProductPage } from '../product/product';
import { FirmPage } from '../firm/firm';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth:AuthenticationProvider, public alertCtrl:AlertController) {

  }

  push1(){
    this.navCtrl.push(SecondPage);
  }

  push2(){
    this.navCtrl.push(AppointmentPage);
  }
  push3(){
    this.navCtrl.push(DoctorsPage);
  }
  push4(){
    this.navCtrl.push(ProductPage);
  }
  push5(){
    this.navCtrl.push(FirmPage);
  }

  userAlert(){
    var temp:any;
    this.auth.getUser().then(data => {
      temp = data;
      let alert = this.alertCtrl.create({
        title: 'Kullanıcı Adı',
        subTitle: temp,
        buttons:['Ok']
      })
      alert.present();
    })
  }

}
