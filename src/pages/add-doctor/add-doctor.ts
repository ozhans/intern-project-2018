import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddDoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-doctor',
  templateUrl: 'add-doctor.html',
})
export class AddDoctorPage {
  doctor = {name:''}
  constructor(public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.doctor = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDoctorPage');
  }

  save():void{
    this.viewCtrl.dismiss(this.doctor);
  }

  close():void{
    this.viewCtrl.dismiss();
  }
}
