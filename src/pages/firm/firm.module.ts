import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirmPage } from './firm';

@NgModule({
  declarations: [
    FirmPage,
  ],
  imports: [
    IonicPageModule.forChild(FirmPage),
  ],
})
export class FirmPageModule {}
