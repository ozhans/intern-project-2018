import { browser, by, element } from 'protractor';
import { getNavByIdOrName } from 'ionic-angular/umd/components/app/app';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getPageOneTitleText() {
    return element(by.id('menu1')).element(by.tagName('ion-header')).element(by.tagName('ion-toolbar')).element(by.tagName('ion-title')).getAttribute('textContent');
  }

  clearAndReturnStorage(){
    browser.actions().click(element(by.id("menu1")).element(by.tagName('ion-content')).element(by.tagName('ion-list')).element(by.id('logout')));
    return browser.executeScript('return localStorage.getItem("token")')
  }

  test(){
    console.log(browser.getCurrentUrl())
  }
}
