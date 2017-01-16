import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';

// Services
import {StoreService} from '../../services';

@Component({
  providers: [StoreService],
  templateUrl: './settings.html'
})
export class SettingsPage {

  constructor(private alertCtrl: AlertController,
    private storeService: StoreService) {
  }

  clearTestResults() {

    let confirmAlert = this.alertCtrl.create({
      title: 'Warning!',
      message: 'Are you sure you want to clear ALL your test results?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storeService.clearTestResults();
          }
        }
      ]
    });

    confirmAlert.present();
  }

  clearContentRead() {

    let confirmAlert = this.alertCtrl.create({
      title: 'Warning!',
      message: 'Are you sure you want to clear ALL your study history?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storeService.clearContentRead();
          }
        }
      ]
    });

    confirmAlert.present();
  }

  recreateSqliteDb () {

    let confirmAlert = this.alertCtrl.create({
      title: 'Warning!',
      message: 'Are you sure you want to delete ALL user data?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {
            this.storeService.dropTables();
            this.storeService.createTables();
          }
        }
      ]
    });

    confirmAlert.present();

  }

}