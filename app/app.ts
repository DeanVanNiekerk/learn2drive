import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';

// Services -----------------------------------------------------
import {ContentService} from './services/content.service';
import {ResourceService} from './services/resource.service';
// ---------------------------------------------------------------

// Pipes ---------------------------------------------------------
import {TranslatePipe} from './pipes/translate.pipe.ts';
// ---------------------------------------------------------------


@Component({
  providers: [ContentService, ResourceService],
  pipes: [TranslatePipe],
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
