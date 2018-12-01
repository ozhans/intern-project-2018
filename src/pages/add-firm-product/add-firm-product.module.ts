import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFirmProductPage } from './add-firm-product';

@NgModule({
  declarations: [
    AddFirmProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFirmProductPage),
  ],
})
export class AddFirmProductPageModule {}
