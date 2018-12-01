import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';

import { SecondPage } from '../pages/second/second';
import { AppointmentPage } from '../pages/appointment/appointment';
import { DoctorsPage } from '../pages/doctors/doctors';
import { ProductPage } from '../pages/product/product';
import { FirmPage } from '../pages/firm/firm';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') navCtrl: NavController;
  @ViewChild('content') nav: NavController;

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  push1(){
    this.nav.push(SecondPage);
  }

  push2(){
    this.nav.push(AppointmentPage);
  }
  push3(){
    this.nav.push(DoctorsPage);
  }
  push4(){
    this.nav.push(ProductPage);
  }
  push5(){
    this.nav.push(FirmPage);
  }
  backToRoot(){
    localStorage.removeItem("token");
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }
}