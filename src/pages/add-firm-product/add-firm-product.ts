import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddFirmProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-firm-product',
  templateUrl: 'add-firm-product.html',
})
export class AddFirmProductPage {
  product = {type :''};
  
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFirmProductPage');
  }

  save(){
    this.viewCtrl.dismiss(this.product);
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
