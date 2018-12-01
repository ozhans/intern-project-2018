import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform, Navbar, NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  NavMock
} from '../../test-config/mocks-ionic';
import { LoginPage } from '../pages/login/login';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: NavController, useClass: NavMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });
  

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('should have login page as root', () => {
    expect(component.rootPage).toBe(LoginPage);
  });

});