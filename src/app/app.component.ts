import { Component, ViewChild } from '@angular/core';
import { App, Platform, AlertController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages';
import { environment } from '../environments/environment';

@Component({
  templateUrl: './app.html',
})
export class L2D3DApp {

  public rootPage: any;

  constructor(private platform: Platform,
    private app: App,
    private alertCtrl: AlertController) {

    this.platform = platform;
    this.initializeApp();
  }

  private initializeApp(): void {

    this.platform.ready().then(() => {

      this.rootPage = HomePage;

      StatusBar.styleDefault();
      Splashscreen.hide();

      // Registration of push in Android and Windows Phone
      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getActiveNav();
        this.showCancelTestConfirmation(nav);
      });

      console.log('production: ' + environment.production);
    });
  }

  showCancelTestConfirmation(nav: NavController) {

    let confirmAlert = this.alertCtrl.create({
      title: 'Hold up!',
      message: 'Are you sure you want to quit writing this test?',
      buttons: [
        {
          text: 'No',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {

            if (nav.canGoBack()) { // Can we go back? ...always returning false..
              nav.pop();
            } else {
              this.platform.exitApp(); // Exit from app
            }

          }
        }
      ]
    });

    confirmAlert.present();
  }
}
