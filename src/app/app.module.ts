import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SecondPage } from '../pages/second/second';
import { DataProvider } from '../providers/data/data';
import { HttpClientModule } from '@angular/common/http';
import { PersonPage } from '../pages/person/person';
import { DateProvider } from '../providers/date/date';
import { AppointmentPage } from '../pages/appointment/appointment';
import { DoctorProvider } from '../providers/doctor/doctor';
import { DoctorsPage } from '../pages/doctors/doctors';
import { AddDoctorPage } from '../pages/add-doctor/add-doctor';
import { AddAppointmentPage } from '../pages/add-appointment/add-appointment';
import { RecordProvider } from '../providers/record/record';
import { HistoryPage } from '../pages/history/history';
import { RecordPage } from '../pages/record/record';
import { ProductProvider } from '../providers/product/product';
import { ProductPage } from '../pages/product/product';
import { AddProductPage } from '../pages/add-product/add-product';
import { FirmProvider } from '../providers/firm/firm';
import { FirmProdProvider } from '../providers/firm-prod/firm-prod';
import { FirmPaymProvider } from '../providers/firm-paym/firm-paym';
import { FirmPage } from '../pages/firm/firm';
import { AddFirmPage } from '../pages/add-firm/add-firm';
import { FirmRecordsPage } from '../pages/firm-records/firm-records';
import { FirmPaymentsPage } from '../pages/firm-payments/firm-payments';
import { FirmProductsPage } from '../pages/firm-products/firm-products';
import { AddFirmProductPage } from '../pages/add-firm-product/add-firm-product';
import { AddFirmPaymentPage } from '../pages/add-firm-payment/add-firm-payment';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SecondPage,
    PersonPage,
    AppointmentPage,
    DoctorsPage,
    AddDoctorPage,
    AddAppointmentPage,
    HistoryPage,
    RecordPage,
    ProductPage,
    AddProductPage,
    FirmPage,
    AddFirmPage,
    FirmRecordsPage,
    FirmPaymentsPage,
    FirmProductsPage,
    AddFirmProductPage, 
    AddFirmPaymentPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SecondPage,
    PersonPage,
    AppointmentPage,
    DoctorsPage,
    AddDoctorPage,
    AddAppointmentPage,
    HistoryPage,
    RecordPage,
    ProductPage,
    AddProductPage,
    FirmPage,
    AddFirmPage,
    FirmRecordsPage,
    FirmPaymentsPage,
    FirmProductsPage,
    AddFirmProductPage,
    AddFirmPaymentPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    DateProvider,
    DoctorProvider,
    RecordProvider,
    ProductProvider,
    FirmProvider,
    FirmProdProvider,
    FirmPaymProvider,
    AuthenticationProvider,
  ]
})
export class AppModule {}
