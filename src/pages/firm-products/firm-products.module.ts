import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirmProductsPage } from './firm-products';

@NgModule({
  declarations: [
    FirmProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(FirmProductsPage),
  ],
})
export class FirmProductsPageModule {}
