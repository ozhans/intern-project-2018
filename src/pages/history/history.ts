import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, ViewController, LoadingController } from 'ionic-angular';
import { RecordProvider } from '../../providers/record/record';
import { RecordPage } from '../record/record';
import { DoctorProvider } from '../../providers/doctor/doctor';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  records:any;
  id:String;
  doctors : any;
  temp_records:any;
  constructor(public loadingCtrl:LoadingController, public viewCtrl:ViewController, public doctorProvider:DoctorProvider, public modalCtrl:ModalController, public recordProvider:RecordProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(typeof(this.id));
    this.id = navParams.data.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.recordProvider.getRecordsOfH(this.id).then((data) => {
      console.log(data);
      this.records = data;
      loading.dismissAll();
    });
    loading.present();
  }

  
  close(){
    this.viewCtrl.dismiss();
  }

  addRecord(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(RecordPage);

    modal.onDidDismiss(data => {
      if(data){
        data.h_id = this.id;
        this.recordProvider.createRecord(data).then(() => {
          this.recordProvider.getRecordsOfH(this.id).then((data) => {
            this.records = data;
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
    this.recordProvider.getRecordsOfH(this.id).then((data) => {
      console.log(data);
      this.records = data;
      
      refresher.complete();
    });
  }

  editRecord(id){
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    let loadingSub = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.recordProvider.getRecord(id).then(res => {
      let modal = this.modalCtrl.create(RecordPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.recordProvider.updateRecord(id,data).then(()=> {
            this.recordProvider.getRecordsOfH(this.id).then((data) => {
              this.records = data;
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

  doRefresher(refresher: Refresher){
    console.log('DOREFRESH', refresher);
    this.recordProvider.getRecordsOfH(this.id).then((data) => {
      console.log(data);
      this.records = data;
      
      refresher.complete();
    });
  }

  deleteRecord(data){
    var index = this.records.indexOf(data);

    if(index > -1){
      this.records.splice(index,1);
    }

    this.recordProvider.deleteRecord(data._id);
  }
}
