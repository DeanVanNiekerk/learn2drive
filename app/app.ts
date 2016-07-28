import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

// Components ---------------------------------------------------
import {ContentComponent} from './components/content/content.component';
// --------------------------------------------------------------

// Services -----------------------------------------------------
import {ContentService} from './services/content.service';
import {ResourceService} from './services/resource.service';
import {QuestionService} from './services/question.service';
import {StateService} from './services/state.service';
// ---------------------------------------------------------------

// Pipes ---------------------------------------------------------
import {TranslatePipe} from './pipes/translate.pipe.ts';
// ---------------------------------------------------------------


@Component({
  providers: [ContentService, ResourceService, QuestionService, StateService],
  pipes: [TranslatePipe],
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class L2D3DApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = ContentComponent;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(L2D3DApp);
