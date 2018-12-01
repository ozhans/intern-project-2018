import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';
import { AddFirmProductPage } from '../add-firm-product/add-firm-product';
import { FirmProdProvider } from '../../providers/firm-prod/firm-prod';

/**
 * Generated class for the FirmProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firm-products',
  templateUrl: 'firm-products.html',
})
export class FirmProductsPage {
  firm_products:any;
  id:any;
  constructor(public loadingCtrl:LoadingController, public productProvider:FirmProdProvider, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirmProductsPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.productProvider.getFirmProductsOfF(this.id).then((data) => {
      console.log(data);
      this.firm_products = data;
      loading.dismissAll();
    })
    loading.present();
  }

  addFirmProduct(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(AddFirmProductPage);

    modal.onDidDismiss(data => {
      if(data){
        data.f_id = this.id;
        this.productProvider.createFirmProduct(data).then(() => {
          this.productProvider.getFirmProductsOfF(this.id).then((data) => {
            console.log(data);
            this.firm_products = data;
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
    this.productProvider.getFirmProductsOfF(this.id).then((data) => {
      console.log(data);
      this.firm_products = data;
      
      refresher.complete();
    });
  }

  editFirmProduct(id){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let loadingSub = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.productProvider.getFirmProduct(id).then(res => {
      let modal = this.modalCtrl.create(AddFirmProductPage,res);
      loading.dismissAll();

      modal.onDidDismiss(data => {
        if(data){
          this.productProvider.updateFirmProduct(id,data).then(()=> {
            this.productProvider.getFirmProductsOfF(this.id).then((data) => {
              this.firm_products = data;
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

  deleteFirmProduct(data){
    var index = this.firm_products.indexOf(data);

    if(index > -1){
      this.firm_products.splice(index,1);
    }

    this.productProvider.deleteFirmProduct(data._id);
  }
}
