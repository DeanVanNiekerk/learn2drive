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

      this.handlePhysicalBackButton();

      console.log('production: ' + environment.production);
    });
  }

  private handlePhysicalBackButton(): void {

    // Registration of push in Android and Windows Phone
      this.platform.registerBackButtonAction(() => {
        
        let nav = this.app.getRootNav();
        let view = nav.getActive();

        // Handle back on test page
        if (view.instance instanceof TestPage) {
          let testPage = view.instance as TestPage;
          testPage.navigateBack();
          return;
        }

        // Handle back on mock test page
        if (view.instance instanceof MockTestPage) {
          let testPage = view.instance as MockTestPage;
          testPage.navigateBack();
          return;
        }

        // Default back handler
        if (nav.canGoBack()) { 
          // Go back if we can
          nav.pop();
        } else {
          // Exit from app
          this.platform.exitApp();
        }

        
      });

  }
 
}
