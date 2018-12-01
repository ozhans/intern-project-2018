import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  info = {name :'' ,email:'', password :''};
  constructor(private alertCtrl:AlertController, private loadingCtrl:LoadingController, private auth:AuthenticationProvider, private navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    let loading = this.loadingCtrl.create({
      content:'Hesap oluşturuluyor...',
    })
    this.auth.register(this.info).then((ret) => {
      loading.dismissAll();
      this.navCtrl.popToRoot();
    }).catch(err => {
      loading.dismissAll();
      if(err.status == 409){
        let alert = this.alertCtrl.create({
          title: 'Başarısız',
          subTitle: 'Kullanıcı adı mevcut',
          buttons:['Ok']
        })
        alert.present();
      }
    })
    loading.present();
  }
}
