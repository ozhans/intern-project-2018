import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirmRecordsPage } from './firm-records';

@NgModule({
  declarations: [
    FirmRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(FirmRecordsPage),
  ],
})
export class FirmRecordsPageModule {}
