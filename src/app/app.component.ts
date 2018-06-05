import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage, TestPage, MockTestPage } from '../pages';
import { environment } from '../environments/environment';

@Component({
  templateUrl: 'app.html'
})
export class L2D3DApp {

  public rootPage: any;

  constructor(private platform: Platform, 
                private statusBar: StatusBar, 
                private splashScreen: SplashScreen, 
                private app: App) {
    this.initializeApp();
  }

  private initializeApp(): void {

    this.platform.ready().then(() => {

      this.rootPage = HomePage;

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.handlePhysicalBackButton();

      //console.log('production: ' + environment.production);
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
        this.app.navPop();
      } else {
        // Exit from app
        this.platform.exitApp();
      }
    });
  }

}


