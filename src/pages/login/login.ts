import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  info = {name : '' , email:'' , password : ''};
  
  constructor(private alertCtrl:AlertController, private loadingCtrl:LoadingController, private menuCtrl:MenuController, private auth:AuthenticationProvider, private navCtrl: NavController) {

  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.swipeEnable(false);
    if(localStorage.getItem("token")){
      this.menuCtrl.swipeEnable(true);
      this.navCtrl.setRoot(HomePage);
    }
  }

  createAccount(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Giriş Yapılıyor...',
    })
    this.auth.login(this.info).then((ret) => {
      var temp:any;
      temp = ret;
      localStorage.setItem("token",temp.token);
      loading.dismissAll();
      this.navCtrl.setRoot(HomePage);
      this.menuCtrl.swipeEnable(true);
    }).catch(err => {
      loading.dismissAll();
      if(err.status == 404){
          let alert = this.alertCtrl.create({
          title: 'Giriş Yapılamadı',
          subTitle: 'Kullanıcı bulunamadı',
          buttons:['Ok']
        })
        alert.present();}
      else if (err.status == 401){
        let alert = this.alertCtrl.create({
          title: 'Giriş Yapılamadı',
          subTitle: 'İzin yok',
          buttons:['Ok']
        })
        alert.present();
      }
    })
    loading.present();
  }
}
