import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirmPaymentsPage } from './firm-payments';

@NgModule({
  declarations: [
    FirmPaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(FirmPaymentsPage),
  ],
})
export class FirmPaymentsPageModule {}
