import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFirmPage } from './add-firm';

@NgModule({
  declarations: [
    AddFirmPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFirmPage),
  ],
})
export class AddFirmPageModule {}
