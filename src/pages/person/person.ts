import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html',
})
export class PersonPage {
  person = {name:''}
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.person = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }
  myFunc() {
    console.log(this.person);
  }

  save():void {
    this.viewCtrl.dismiss(this.person);
  }

  close():void{
    this.viewCtrl.dismiss();
  }
}
