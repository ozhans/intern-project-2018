import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { DateProvider } from '../../providers/date/date';
import { AddAppointmentPage } from '../add-appointment/add-appointment';
import { DataProvider } from '../../providers/data/data';
import { DoctorProvider } from '../../providers/doctor/doctor';

/**
 * Generated class for the AppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {

  appointments: any;
  h_name:any;
  d_name:any;
  constructor(public loadingCtrl:LoadingController, public dataProvider:DataProvider, public doctorProvider:DoctorProvider, public modalCtrl: ModalController, public dateProvider:DateProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmentPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.dateProvider.getDates().then((data) => {
      console.log(data);
      this.appointments = data;
      loading.dismissAll();
    })
    loading.present();
  }


  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);
    this.dateProvider.getDates().then((data) => {
      console.log(data);
      this.appointments = data;
      refresher.complete();
    });
  }

  addAppointment(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(AddAppointmentPage);

    modal.onDidDismiss(data => {
      if(data){
        this.dateProvider.createDate(data).then(() => {
          this.dateProvider.getDates().then((data) => {
            console.log(data);
            this.appointments = data;
            loading.dismissAll();
          });
        })
        loading.present();
      }
    });

    modal.present();
  }

  editAppointment(id){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let loadingSub = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.dateProvider.getDate(id).then(res => {
      let modal = this.modalCtrl.create(AddAppointmentPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.dateProvider.updateDate(id,data).then(()=> {
            this.dateProvider.getDates().then((data) => {
              this.appointments = data;
              loadingSub.dismissAll();
            })
          })
          loadingSub.present();
        }
      })

      modal.present();
    })
    loading.present();
  }

  deleteAppointment(data){
    var index = this.appointments.indexOf(data);

    if(index > -1){
      this.appointments.splice(index,1);
    }

    this.dateProvider.deleteDate(data._id);
  }

}
