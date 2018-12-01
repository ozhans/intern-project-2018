import { Component } from '@angular/core';
import { NavController,ModalController, LoadingController } from 'ionic-angular';
import { PersonPage } from '../person/person';
import { DataProvider } from '../../providers/data/data';
import { Refresher } from 'ionic-angular'
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-second',
  templateUrl: 'second.html'
})
export class SecondPage {
  persons :any;
  constructor(public loadingCtrl:LoadingController, public dataProvider: DataProvider ,public modalCtrl: ModalController ,public navCtrl: NavController) {
  }
  myFunc() {
    console.log(this.persons);
  }

  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    this.dataProvider.getPersons().then((data) => {
      console.log(data);
      this.persons = data;
      loading.dismissAll();
    });
    loading.present();
  }
  
  addPerson(){
    let loading = this.loadingCtrl.create({
      content : 'Yükleniyor...',
    })
    let modal = this.modalCtrl.create(PersonPage);

    modal.onDidDismiss(data => {
      if(data){
        this.dataProvider.createPerson(data).then(() => {
          this.dataProvider.getPersons().then((data) => {
            console.log(data);
            this.persons = data;
            loading.dismissAll();
          });
        })
        loading.present();
      }
    });
    
    modal.present();
  }
  
  doRefresh(refresher: Refresher) {
    console.log('DOREFRESH', refresher);
    this.dataProvider.getPersons().then((data) => {
      console.log(data);
      this.persons = data;
      
      refresher.complete();
    });
  }


  editP(id){
    let loading = this.loadingCtrl.create({
      content: 'Yükleniyor...',
    })
    let loadingSub = this.loadingCtrl.create({
      content: 'Yükleniyor...',
    })
    this.dataProvider.getPerson(id).then(res=> {
      let modal = this.modalCtrl.create(PersonPage,res);
      loading.dismissAll();
      modal.onDidDismiss(data => {
        if(data){
          this.dataProvider.updatePerson(id,data).then((person) => {
            console.log(person);
            this.dataProvider.getPersons().then((data) => {
              console.log(data);
              this.persons = data;
              loadingSub.dismissAll();
            });
          })
          loadingSub.present();
        }
      });
      
      modal.present();

    })
    loading.present();
  }


  deleteP(data){
    var index = this.persons.indexOf(data);

    if(index > -1){
      this.persons.splice(index,1);
    }

    this.dataProvider.deletePerson(data._id);
  }

  openRecords(id){
    console.log(typeof(id));
    let modal = this.modalCtrl.create(HistoryPage,{id : id});
    
    modal.onDidDismiss(data => {
      if(data){
        console.log(data);
      }
    });

    modal.present();
  }
  
}