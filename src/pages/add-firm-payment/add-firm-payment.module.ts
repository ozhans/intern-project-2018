import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFirmPaymentPage } from './add-firm-payment';

@NgModule({
  declarations: [
    AddFirmPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFirmPaymentPage),
  ],
})
export class AddFirmPaymentPageModule {}
