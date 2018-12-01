import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';
import { DoctorProvider } from '../../providers/doctor/doctor';
import { AddDoctorPage } from '../add-doctor/add-doctor';
/**
 * Generated class for the DoctorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html',
})
export class DoctorsPage {
  doctors:any;
  constructor(public loadingCtrl:LoadingController, public modalCtrl:ModalController, public doctorProvider:DoctorProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorsPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.doctorProvider.getDoctors().then((data) => {
      console.log(data);
      this.doctors = data;
      loading.dismissAll();
    });
    loading.present();
  }

  addDoctor(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(AddDoctorPage);

    modal.onDidDismiss(data => {
      if(data){
        this.doctorProvider.createDoctor(data).then(() => {
          this.doctorProvider.getDoctors().then((data) => {
            console.log(data);
            this.doctors = data;
            loading.dismissAll();
          });
        })
        loading.present();
      }
    });
    
    modal.present();
  }

  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);
    this.doctorProvider.getDoctors().then((data) => {
      console.log(data);
      this.doctors = data;
      
      refresher.complete();
    });
  }


  editD(id){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let loadingSub = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.doctorProvider.getDoctor(id).then(res => {
      let modal = this.modalCtrl.create(AddDoctorPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.doctorProvider.updateDoctor(id,data).then(() => {
            this.doctorProvider.getDoctors().then((data) => {
              this.doctors = data;
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

  deleteD(data){
    var index = this.doctors.indexOf(data);

    if(index > -1){
      this.doctors.splice(index,1);
    }

    this.doctorProvider.deleteDoctor(data._id);
  }

}
