import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { AdMobPro } from '@ionic-native/admob-pro';
import { AppRate } from '@ionic-native/app-rate';
import { AppVersion } from '@ionic-native/app-version';

import { L2D3DApp }                                 from './app.component';

import { PagesModule, HomePage, 
          ContentPage, TestPage, 
          TestResultPage, ChecklistPage,
          ChecklistItemInfoPage, AboutPage,
          SettingsPage, MockTestPage,
          MockTestResultPage, IntroductionSlidesPage,
          TestHistoryPage }                         from '../pages';

import { ComponentsModule }                         from '../components';

import { ContentService, QuestionService, 
          ResourceService, TestService, 
          ProgressService, StoreService, 
          StorageService, RateService,
          AdService }                               from '../services';

import { PipesModule }                              from '../pipes';

@NgModule({
  declarations: [
    L2D3DApp
  ],
  imports: [
    PagesModule,
    PipesModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(L2D3DApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    L2D3DApp,
    HomePage,
    ContentPage,
    TestPage,
    TestResultPage,
    ChecklistPage,
    ChecklistItemInfoPage, 
    AboutPage,
    SettingsPage,
    MockTestPage,
    MockTestResultPage,
    IntroductionSlidesPage,
    TestHistoryPage
  ],
  providers: [
    AdMobPro,
    AppRate,
    AppVersion,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContentService,
    QuestionService,
    ResourceService,
    TestService,
    ProgressService,
    RateService,    
    AdService,
    
    StorageService,
    StoreService,
  ]
})
export class AppModule {}
