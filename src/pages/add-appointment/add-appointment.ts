import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import {DataProvider } from '../../providers/data/data';
import { DoctorProvider } from '../../providers/doctor/doctor';
/**
 * Generated class for the AddAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-appointment',
  templateUrl: 'add-appointment.html',
})
export class AddAppointmentPage {
  appointment = { person: '',doctor:''};
  persons :any;
  doctors: any;
  hours = [];
  minutes = [];
  constructor(public loadingCtrl: LoadingController, public doctorProvider:DoctorProvider, public dataProvider:DataProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.appointment = navParams.data;
    for (let i = 0; i < 24; i++) {
      this.hours[i] = i;
    }
    for (let j = 0; j < 12; j++) {
      this.minutes[j] = j*5
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAppointmentPage');
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.dataProvider.getPersons().then((data) => {
      console.log(data);
      this.persons = data;
    });
    this.doctorProvider.getDoctors().then((doc) => {
      console.log(doc);
      this.doctors = doc;
      loading.dismissAll();
    });
    loading.present();
  }

  save():void{
    this.viewCtrl.dismiss(this.appointment);
  }

  close():void{
    this.viewCtrl.dismiss();
  }
}
