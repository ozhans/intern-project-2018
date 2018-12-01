import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddFirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-firm',
  templateUrl: 'add-firm.html',
})
export class AddFirmPage {
  firm = {name: ''}
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.firm = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFirmPage');
  }

  save(){
    this.viewCtrl.dismiss(this.firm);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
