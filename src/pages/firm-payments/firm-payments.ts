import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';
import { FirmPaymProvider } from '../../providers/firm-paym/firm-paym';
import { AddFirmPaymentPage } from '../add-firm-payment/add-firm-payment';

/**
 * Generated class for the FirmPaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firm-payments',
  templateUrl: 'firm-payments.html',
})
export class FirmPaymentsPage {
  firm_payments:any;
  id:any;
  constructor(public loadingCtrl:LoadingController, public modalCtrl:ModalController, public paymentProvider:FirmPaymProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirmPaymentsPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.paymentProvider.getFirmPaymentsOfF(this.id).then((data) => {
      this.firm_payments = data;
      loading.dismissAll();
    })
    loading.present();
  }

  addFirmPayment(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(AddFirmPaymentPage);

    modal.onDidDismiss(data => {
      if(data){
        data.f_id = this.id;
        this.paymentProvider.createFirmPayment(data).then(() => {
          this.paymentProvider.getFirmPaymentsOfF(this.id).then((data) => {
            console.log(data);
            this.firm_payments = data;
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
    this.paymentProvider.getFirmPaymentsOfF(this.id).then((data) => {
      console.log(data);
      this.firm_payments = data;
      
      refresher.complete();
    });
  }

  editFirmPayment(id){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let loadingSub = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.paymentProvider.getFirmPayment(id).then(res => {
      let modal = this.modalCtrl.create(AddFirmPaymentPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.paymentProvider.updatePayment(id,data).then(()=> {
            this.paymentProvider.getFirmPaymentsOfF(this.id).then((data) => {
              this.firm_payments = data;
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

  deleteFirmPayment(data){
    var index = this.firm_payments.indexOf(data);

    if(index > -1){
      this.firm_payments.splice(index,1);
    }

    this.paymentProvider.deleteFirmPayment(data._id);
  }
}
