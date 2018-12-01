import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';
import { AddFirmPage } from '../add-firm/add-firm';
import { FirmProvider } from '../../providers/firm/firm';
import { FirmRecordsPage } from '../firm-records/firm-records';

/**
 * Generated class for the FirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firm',
  templateUrl: 'firm.html',
})
export class FirmPage {
  firms:any;
  constructor(public loadingCtrl:LoadingController, public firmProvider:FirmProvider, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirmPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.firmProvider.getFirms().then((data) => {
      console.log(data);
      this.firms = data;
      loading.dismissAll();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);
    this.firmProvider.getFirms().then((data) => {
      console.log(data);
      this.firms = data;
      
      refresher.complete();
    });
  }

  addFirm(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(AddFirmPage);

    modal.onDidDismiss(data => {
      if(data){
        this.firmProvider.createFirm(data).then(() => {
          this.firmProvider.getFirms().then((data) => {
            console.log(data);
            this.firms = data;
            loading.dismissAll();
          });
        })
        loading.present();
      }
    });
    
    modal.present();
  }

  editFirm(id){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let loadingSub = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.firmProvider.getFirm(id).then(res => {
      let modal = this.modalCtrl.create(AddFirmPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.firmProvider.updateFirm(id,data).then(()=> {
            this.firmProvider.getFirms().then((data) => {
              this.firms = data;
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

  deleteFirm(data){
    var index = this.firms.indexOf(data);

    if(index > -1){
      this.firms.splice(index,1);
    }

    this.firmProvider.deleteFirm(data._id);
  }

  openFirmRecords(id){
    this.navCtrl.push(FirmRecordsPage,{id : id})
  }

}
