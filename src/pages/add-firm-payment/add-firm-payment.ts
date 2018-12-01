import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddFirmPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-firm-payment',
  templateUrl: 'add-firm-payment.html',
})
export class AddFirmPaymentPage {
  payment = {f_id : ''}
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.payment = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFirmPaymentPage');
  }

  save(){
    this.viewCtrl.dismiss(this.payment);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
