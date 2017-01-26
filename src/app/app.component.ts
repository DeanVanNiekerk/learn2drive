import { Component, ViewChild } from '@angular/core';
import { App, Platform, AlertController, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage, TestPage, MockTestPage } from '../pages';
import { environment } from '../environments/environment';

@Component({
  templateUrl: './app.html',
})
export class L2D3DApp {

  public rootPage: any;

  constructor(private platform: Platform, private app: App) {
    this.initializeApp();
  }

  private initializeApp(): void {

    this.platform.ready().then(() => {

      this.rootPage = HomePage;

      StatusBar.styleDefault();
      Splashscreen.hide();

      // Registration of push in Android and Windows Phone
      this.platform.registerBackButtonAction(() => {
        
        let nav = this.app.getRootNav();
        let view = nav.getActive();

        if (view.instance instanceof TestPage) {
          let testPage = view.instance as TestPage;
          testPage.navigateBack();
        }

        if (view.instance instanceof MockTestPage) {
          let testPage = view.instance as MockTestPage;
          testPage.navigateBack();
        }
        
      });

      console.log('production: ' + environment.production);
    });
  }
 
}
