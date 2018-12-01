import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirmProductsPage } from '../firm-products/firm-products';
import { FirmPaymentsPage } from '../firm-payments/firm-payments';

/**
 * Generated class for the FirmRecordsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firm-records',
  templateUrl: 'firm-records.html',
})
export class FirmRecordsPage {
  id :any;
  productsTab = FirmProductsPage;
  paymentsTab = FirmPaymentsPage;
  title ="product";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = this.navParams.data.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirmRecordsPage');
  }

  changeToProduct(){
    this.title = "Ürünler";
  }
  changeToPayment(){
    this.title = "Ödemeler";
  }

}
