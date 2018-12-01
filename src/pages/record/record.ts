import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { DoctorProvider } from '../../providers/doctor/doctor';

/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {
  record = {type : ''};
  doctors : any;
  constructor(public loadingCtrl:LoadingController, public doctorProvider:DoctorProvider, public viewCtrl:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.record = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecordPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...',
    })
    this.doctorProvider.getDoctors().then((doc) => {
      console.log(doc);
      this.doctors = doc;
      loading.dismissAll();
    })
    loading.present();
  }

  save():void{
    
    this.viewCtrl.dismiss(this.record);
  }

  close():void{
    this.viewCtrl.dismiss();
  }
}
