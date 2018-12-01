import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { AddProductPage } from '../add-product/add-product';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  products:any;
  constructor(public loadingCtrl:LoadingController, public productProvider:ProductProvider, public modalCtrl:ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.productProvider.getProducts().then((data) => {
      console.log(data);
      this.products = data;
      loading.dismissAll();
    });
    loading.present();
  }

  addProduct(){
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    let modal = this.modalCtrl.create(AddProductPage);

    modal.onDidDismiss(data => {
      if(data){
        this.productProvider.createProduct(data).then(() => {
          this.productProvider.getProducts().then((data) => {
            console.log(data);
            this.products = data;
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
    this.productProvider.getProducts().then((data) => {
      console.log(data);
      this.products = data;
      
      refresher.complete();
    });
  }

  
  editP(id){
    let loading = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    let loadingSub = this.loadingCtrl.create({
      content:'Yükleniyor...'
    })
    this.productProvider.getProduct(id).then(res => {
      let modal = this.modalCtrl.create(AddProductPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.productProvider.updateProduct(id,data).then(()=> {
            this.productProvider.getProducts().then((data) => {
              this.products = data;
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


  deleteP(data){
    var index = this.products.indexOf(data);

    if(index > -1){
      this.products.splice(index,1);
    }

    this.productProvider.deleteProduct(data._id);
  }
}
